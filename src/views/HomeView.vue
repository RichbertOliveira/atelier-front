<template>
  <div>
    <b-container>
      <div class="carrousel-div">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          controls
          indicators
          img-width="1024"
          img-height="300"
          class="shadow"
        >
          <b-carousel-slide
            :img-src="require('../assets/carousel/4.jpeg')"
          ></b-carousel-slide>

          <b-carousel-slide
            :img-src="require('../assets/carousel/5.jpeg')"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </b-container>

    <b-container class="rustic-font">
      <div class="mt-4 mb-5">
        <h1 class="text-left primary-color">Produtos:</h1>

        <b-row
          class="mt-4 border-col"
          no-gutters
          v-for="product in items"
          :key="product.id"
        >
          <b-col md="6">
            <BaseImage :src="product.img" alt="img" />
          </b-col>
          <b-col md="6">
            <b-card-body class="primary-color" :title="product.title">
              <b-card-text>
                <div>
                  <p>{{ product.description }}</p>
                </div>
                <dir>
                  <b-button
                    class="background-primary-color button-whats align-content-center p-3 mt-3"
                  >
                    <a
                      :href="`https://wa.me/+5531992169436?text=Olá! Gostaria de um orçamento de um produto inspirado em um(a) ${product.title}.`"
                      class="text-light"
                      target="_blank"
                    >
                      <font-awesome-icon icon="fa-brands fa-whatsapp" />
                      <span class="ml-1">Orçamento pelo Whatsapp</span>
                    </a>
                  </b-button>
                </dir>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>

        <!--   <b-row class="mt-4" no-gutters>
          <b-col md="6">
            <b-card-img
              src="https://img.elo7.com.br/product/main/287B49C/cachorrinhos-mesclados-artemadeira.jpg"
              alt="Image"
              class="rounded-0"
            >
            </b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body class="primary-color" title="Horizontal Card">
              <b-card-text>
                This is a wider card with supporting text as a natural lead-in
                to additional content. This content is a little bit longer.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>

        <b-row class="mt-4" no-gutters>
          <b-col md="6">
            <b-card-body class="primary-color" title="Horizontal Card">
              <b-card-text>
                This is a wider card with supporting text as a natural lead-in
                to additional content. This content is a little bit longer.
              </b-card-text>
            </b-card-body>
          </b-col>
          <b-col md="6">
            <b-card-img
              src="https://img.elo7.com.br/product/original/287E2EE/maca-decorativa-artemadeira.jpg"
              alt="Image"
              class="rounded-0"
            >
            </b-card-img>
          </b-col>
        </b-row>

        <b-row class="mt-4" no-gutters>
          <b-col md="6">
            <b-card-img
              src="https://img.elo7.com.br/product/original/2870202/pinguins-mesclados-artemadeira.jpg"
              alt="Image"
              class="rounded-0"
            >
            </b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body class="primary-color" title="Horizontal Card">
              <b-card-text>
                This is a wider card with supporting text as a natural lead-in
                to additional content. This content is a little bit longer.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import BaseImage from '@/components/BaseImage.vue'
import products from '@/mocks/products.json'
export default {
  name: 'HomeView',
  components: { BaseImage },
  data() {
    return {
      slide: 0,
      items: [],
    }
  },
  created() {
    if (localStorage.getItem('products')) {
      this.items = JSON.parse(localStorage.getItem('products'))
    } else this.items = this.products
  },
  methods: {},
  computed: {
    products() {
      return products
    },
  },
}
</script>

<style>
.container-max {
  max-width: 1500px;
}

.button-whats {
  border: 0 !important;
  width: 80%;
}
</style>
