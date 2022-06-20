<template>
  <b-container>
    <div class="title-about text-center p-1">
      <h1 class="rustic-font">Meus Pedidos</h1>
    </div>
    <div class="card-box mt-3 p-2">
      <b-table
        striped
        :items="items"
        show-empty
        stacked="md"
        :empty-text="tableEmpty"
        :fields="fields"
        class="text-center primary-color font-weight-bold"
      >
        <template v-slot:cell(productStatus)="row">
          <span v-if="row.item.productStatus == 0">Aguardando Pagamento</span>
          <span v-if="row.item.productStatus == 1">Pagamento Confirmado</span>
          <span v-if="row.item.productStatus == 2">Em Fabricação</span>
          <span v-if="row.item.productStatus == 3">Pedido Pronto</span>
          <span v-if="row.item.productStatus == 4">Pedido Enviado</span>
          <span v-if="row.item.productStatus == 5">Entregue</span>
        </template>
        <template v-slot:cell(descriptionProduct)="row">
          {{ limitString(row.item.description) }}
        </template>
        <template v-slot:cell(action)="row">
          <b-button
            class="background-primary-color border-0"
            @click="viewItem(row.item)"
            >Ver mais</b-button
          >
        </template>
      </b-table>
    </div>
    <b-modal
      cancel-disabled
      id="modal-Request"
      centered
      title="Meu Pedido"
      size="xl"
      ok-variant="success"
    >
      <div>
        <h4><b>Número do Pedido:</b> {{ itemModal.id }}</h4>
      </div>
      <div class="mt-2">
        <p><b> Descrição: </b>{{ itemModal.description }}</p>
      </div>
      <div class="mt-2">
        <b>Status:</b>
        <div>
          <step-progress
            :steps="mySteps"
            :current-step="itemModal.productStatus"
            icon-class="fa fa-check"
            active-color="brown"
          ></step-progress>
        </div>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { getDemandByClient } from '@/api/endpoints'
import StepProgress from 'vue-step-progress'
import 'vue-step-progress/dist/main.css'
export default {
  components: {
    'step-progress': StepProgress,
  },
  data() {
    return {
      clientId: JSON.parse(localStorage.getItem('user')).mail,
      items: [],
      tableEmpty: 'Não há pedidos registrados',
      fields: [
        { key: 'productStatus', label: 'Status do Pedido' },
        { key: 'descriptionProduct', label: 'Descrição' },
        { key: 'action', label: 'Ação' },
      ],
      itemModal: {},
      mySteps: [
        'Ag. Pagamento',
        'Pag. Confirmado',
        'Em Fabricação',
        'Ped. Pronto',
        'Ped.Enviado',
        'Entregue',
      ],
    }
  },
  async created() {
    const resp = await getDemandByClient(this.clientId)
    this.items = [
      {
        id: 1,
        description: 'Madeira esculpida coração',
        productStatus: 1,
      },
      {
        id: 2,
        description: 'Madeira esculpida cachorro',
        productStatus: 2,
      },
      {
        id: 3,
        description: 'Madeira quadro esculpida leão',
        productStatus: 3,
      },
      {
        id: 4,
        description: 'Madeira quadro esculpida leão',
        productStatus: 4,
      },
    ]

    this.items = resp.data
  },
  methods: {
    viewItem(item) {
      this.itemModal = item
      this.$bvModal.show('modal-Request')
    },
    limitString(item) {
      return item.substr(0, 25)
    },
  },
}
</script>

<style>
.step-progress__wrapper {
  width: 90% !important;
}
.btn-secondary.disabled {
  display: none !important;
}
</style>
