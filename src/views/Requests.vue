<template>
  <b-container>
    <div class="title-about text-center p-1">
      <h1 class="rustic-font">Pedidos</h1>
    </div>
    <div class="mt-3">
      <b-button
        class="background-primary-color border-0 float-right mb-3"
        v-b-modal.modal-request-adm
      >
        Adicionar Pedido
        <font-awesome-icon icon="fa-solid fa-plus" class="ml-2" />
      </b-button>
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
        <template v-slot:cell(descriptionProduct)="row">
          {{ limitString(row.item.description) }}
        </template>
        <template v-slot:cell(productStatus)="row">
          <span v-if="row.item.productStatus == 0">Aguardando Pagamento</span>
          <span v-if="row.item.productStatus == 1">Pagamento Confirmado</span>
          <span v-if="row.item.productStatus == 2">Em Fabricação</span>
          <span v-if="row.item.productStatus == 3">Pedido Pronto</span>
          <span v-if="row.item.productStatus == 4">Pedido Enviado</span>
          <span v-if="row.item.productStatus == 5">Entregue</span>
        </template>
        <template v-slot:cell(action)="row">
          <b-button
            class="background-primary-color border-0"
            @click="editItem(row.item)"
            >Editar</b-button
          >
        </template>
      </b-table>
    </div>
    <b-modal
      id="modal-request-adm"
      centered
      :title="titleModal"
      @hidden="resetModal"
      @ok="handleOk"
      size="xl"
      ok-variant="success"
      cancel-variant="danger"
    >
      <div>
        <b-form-group label="Cliente:">
          <b-form-select
            v-model="itemModal.clientId"
            :options="options"
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Descrição:">
          <b-form-input
            placeholder="Descrição..."
            type="text"
            v-model="itemModal.description"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Status do Produto:">
          <b-form-select
            v-model="itemModal.productStatus"
            :options="optionsProductStatus"
          ></b-form-select>
        </b-form-group>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { getAllDemands, editDemand, create, getAllUsers } from '@/api/endpoints'
export default {
  data() {
    return {
      items: [],
      tableEmpty: 'Não há pedidos registrados',
      fields: [
        { key: 'clientId', label: 'Email Cliente' },
        { key: 'productStatus', label: 'Status do Pedido' },
        { key: 'descriptionProduct', label: 'Descrição' },
        { key: 'action', label: 'Ação' },
      ],
      product: {
        id: 4,
        title: '',
        description: '',
        file: [],
      },
      itemModal: {},
      edit: false,
      options: [],
      optionsProductStatus: [
        { value: 0, text: 'Aguardando Pagamento' },
        { value: 1, text: 'Pagamento Confirmado' },
        { value: 2, text: 'Em Fabricação' },
        { value: 3, text: 'Pedido Pronto' },
        { value: 4, text: 'Pedido Enviado' },
        { value: 5, text: 'Entregue' },
      ],
    }
  },
  created() {
    this.getRequests()
    this.getUsers()
  },
  methods: {
    async getRequests() {
      const resp = await getAllDemands()
      if (resp.status == 200) {
        this.items = resp.data
      } else this.$toast.error('Erro ao carregar pedidos')
    },
    async getUsers() {
      const resp = await getAllUsers()
      for (const item of resp.data) {
        if (item.mail) {
          this.options.push({ value: item.mail, text: item.mail })
        }
      }
    },
    limitString(item) {
      return item.substr(0, 25)
    },
    editItem(item) {
      this.edit = true
      this.itemModal = item
      this.$bvModal.show('modal-request-adm')
    },
    resetModal() {
      this.itemModal = {}
      if (this.edit) this.edit = false
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (
        !this.itemModal.clientId ||
        this.itemModal.productStatus == null ||
        !this.itemModal.description
      ) {
        this.$toast.warning('Preencha todos os campos')
        return
      } else {
        if (this.edit) {
          this.editRequest()
        } else {
          this.addRequest()
        }
      }
    },
    async editRequest() {
      const resp = await editDemand(this.itemModal)
      if (resp.status == 200) {
        this.$toast.success('Demanda Editada!')
        this.$nextTick(() => {
          this.$bvModal.hide('modal-request-adm')
        })
        this.getRequests()
      } else this.$toast.error('Ocorreu um erro ao editar o pedido')
    },
    async addRequest() {
      const resp = await create(this.itemModal)
      if (resp.status == 201) {
        this.$toast.success('Demanda Inserida')
        this.$nextTick(() => {
          this.$bvModal.hide('modal-request-adm')
        })
        this.getRequests()
      } else {
        this.$toast.error(resp.data.message)
      }
    },
  },
  computed: {
    titleModal() {
      if (this.edit) {
        return 'Editar Pedido'
      }
      return 'Novo Pedido'
    },
  },
}
</script>
