<template>
  <div>
    <b-navbar class="mb-3 shadow" toggleable="sm" type="light">
      <b-container class="container-max">
        <b-navbar-brand to="/" class="ml-4" href="#">
          <img src="@/assets/logo-atelier.png" height="40" alt="logo" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto align-items-center">
            <b-nav-item v-if="user.auth">
              <b-avatar
                class="avatar background-primary-color"
                :text="userLetter"
              ></b-avatar>
            </b-nav-item>
            <b-nav-item to="/about">
              <span class="primary-color">Quem Sou Eu</span>
            </b-nav-item>
            <b-nav-item v-if="user.auth && !user.admin" to="/Meus_Pedidos">
              <span class="primary-color">Meus Pedidos</span>
            </b-nav-item>
            <b-nav-item v-else-if="user.auth && user.admin" to="/Pedidos">
              <span class="primary-color">Pedidos</span>
            </b-nav-item>
            <b-nav-item v-if="user.admin" to="/Admin">
              <span class="primary-color">Produtos</span>
            </b-nav-item>
            <b-nav-item v-b-modal.modal-login v-if="!user.auth" href="#"
              ><span class="primary-color">Login</span></b-nav-item
            >
            <b-nav-item v-b-modal.modal-register v-if="!user.auth" href="#">
              <span class="primary-color">Cadastre-se</span></b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <slot />
    <ModalLogin @login="login" />
    <ModalRegister />
    <footer class="mt-4 fixed-bottom">
      <b-container
        fluid
        class="background-primary-color d-flex justify-content-around"
      >
        <div class="align-content-center d-flex flex-wrap footer">
          <div target="_blank" style="cursor: pointer" @click="goInstagram">
            <font-awesome-icon icon="fa-brands fa-instagram" />
            <span class="ml-1">Instagram</span>
          </div>
        </div>

        <div class="align-content-center d-flex flex-wrap footer">
          <div target="_blank" style="cursor: pointer" @click="goWhatsApp">
            <a
              href="https://wa.me/+5531992169436"
              class="text-light"
              target="_blank"
            >
              <font-awesome-icon icon="fa-brands fa-whatsapp" />
              <span class="ml-1">Whatsapp</span>
            </a>
          </div>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
import ModalLogin from '@/components/ModalLogin.vue'
import ModalRegister from '@/components/ModalRegister'
export default {
  components: {
    ModalLogin,
    ModalRegister,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || [],
      userLetter: '',
    }
  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.userLetter = this.user.mail.substring(0, 1) || ''
    }
  },
  methods: {
    goInstagram() {
      window.open('https://www.instagram.com/atelierbelmadeira/', '_blank')
    },
    goWhatsApp() {},
    login(user) {
      this.user = user
      this.userLetter = this.user.mail.substring(0, 1) || ''
    },
  },
}
</script>

<style>
.footer {
  height: 50px;
  max-width: 1500px;
  color: #ffff;
}
</style>
