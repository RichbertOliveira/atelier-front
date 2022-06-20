<template>
  <b-modal
    size="lg"
    class="primary-color"
    id="modal-register"
    centered
    ok-variant="success"
    cancel-variant="danger"
    title="Login"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <div>
      <b-form-group label="Nome:" :invalid-feedback="invalidFeedbackEmail">
        <b-form-input placeholder="Name..." type="text" v-model="name">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Email:" :invalid-feedback="invalidFeedbackEmail">
        <b-form-input
          placeholder="example@gmail.com"
          type="email"
          v-model="email"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Senha:" :invalid-feedback="invalidFeedbackPassword">
        <b-form-input type="password" placeholder="senha..." v-model="password">
        </b-form-input>
      </b-form-group>
      <b-form-group
        label="Confirmação da Senha:"
        :invalid-feedback="invalidFeedbackPassword"
      >
        <b-form-input
          type="password"
          placeholder="senha..."
          v-model="confirmPassword"
        >
        </b-form-input>
      </b-form-group>
    </div>
  </b-modal>
</template>

<script>
import { register } from '@/api/endpoints'
const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  mounted() {
    console.log(re)
  },
  methods: {
    resetModal() {},
    handleOk() {
      let body = {
        name: this.name,
        password: this.password,
        mail: this.email,
        admin: false,
      }
      this.setUser(body)
    },
    async setUser(body) {
      let user = await register(body)
      if (user.status == 201) {
        this.$toast.success('Cadastro realizado com sucesso!')
      } else this.$toast.error(user.message)
    },
  },

  computed: {
    invalidFeedbackEmail() {
      if (!this.email) {
        return null
      } else return 'Digite um Email válido'
    },
    invalidFeedbackPassword() {
      if (this.password.length < 6) {
        return 'Digite uma senha com no mínimo 6 caracteres'
      } else return null
    },
  },
}
</script>
