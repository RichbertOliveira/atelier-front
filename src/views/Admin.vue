<template>
  <b-container>
    <div class="title-about text-center p-1">
      <h1 class="rustic-font">Produtos</h1>
    </div>
    <div class="mt-3">
      <b-button
        class="background-primary-color border-0 float-right mb-3"
        v-b-modal.modal-product
      >
        Adicionar Produto
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
        class="text-center"
      >
        <template v-slot:cell(img)="row">
          <BaseImage :src="row.item.img" alt="img" class="img-list" />
        </template>
        <template v-slot:cell(action)="row">
          <font-awesome-icon
            class="primary-color fa-lg pointer"
            icon="fa-solid fa-trash 2x"
            @click="remove(row.item.id)"
          />
        </template>
      </b-table>
    </div>

    <b-modal
      id="modal-product"
      centered
      title="Produto"
      size="xl"
      @ok="handleOk"
    >
      <form ref="form">
        <b-form-group label="Título" label-for="name-input">
          <b-form-input
            id="name-input"
            v-model="product.title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Descrição">
          <b-form-input
            id="description-input"
            v-model="product.description"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Imagem">
          <b-form-file
            v-model="product.file"
            ref="file"
            accept=".jpg, .png"
            placeholder="Escolha uma imagem ou arraste aqui..."
            browse-text="Buscar"
            drop-placeholder="Solte a imagem aqui..."
          ></b-form-file>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import products from '@/mocks/products.json'
import BaseImage from '@/components/BaseImage.vue'
export default {
  components: {
    BaseImage,
  },
  data() {
    return {
      items: [],
      tableEmpty: 'Não há pedidos registrados',
      fields: [
        { key: 'img', label: 'Imagem' },
        { key: 'title', label: 'Nome' },
        { key: 'action', label: 'Ação' },
      ],
      product: {
        id: 4,
        title: '',
        description: '',
        file: [],
      },
    }
  },
  created() {
    if (localStorage.getItem('products')) {
      this.items = JSON.parse(localStorage.getItem('products'))
    } else this.items = this.products
  },
  methods: {
    remove(id) {
      this.items = this.items.filter((item) => item.id != id)
      localStorage.setItem('products', JSON.stringify(this.items))
      this.$toast.success('Produto Removido')
    },
    handleOk() {
      this.product.img = '../assets/products/product4.png'
      this.items.push(this.product)
      localStorage.setItem('products', JSON.stringify(this.items))
      this.$toast.success('Produto Adicionado com Sucesso!')
    },
  },
  computed: {
    products() {
      return products
    },
  },
}
</script>

<style>
.img-list {
  width: 40px;
}
</style>
