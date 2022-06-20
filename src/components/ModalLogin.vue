<template>
  <b-modal
    size="lg"
    class="primary-color"
    id="modal-login"
    centered
    ok-variant="success"
    cancel-variant="danger"
    title="Login"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <div>
      <b-form-group label="Email:" :invalid-feedback="invalidFeedbackEmail">
        <b-form-input
          placeholder="example@gmail.com"
          type="email"
          v-model="email"
          :state="emailStateInput"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Senha:" :invalid-feedback="invalidFeedbackPassword">
        <b-form-input
          type="password"
          placeholder="*******"
          v-model="password"
          :state="passwordStateInput"
          @keyup.enter="handleOk"
        >
        </b-form-input>
      </b-form-group>
    </div>
  </b-modal>
</template>

<script>
import { login } from '@/api/endpoints'
const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default {
  data() {
    return {
      emailState: null,
      passwordState: null,
      email: '',
      password: '',
    }
  },
  methods: {
    resetModal() {
      this.email = ''
      this.password = ''
      this.emailState = null
      this.passwordState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.validLogin()) {
        this.getUser()
      }
    },
    validLogin() {
      if (re.test(String(this.email).toLowerCase())) {
        if (this.password.length >= 6) {
          return true
        } else {
          this.$toast.warning(
            'Você não digitou uma senha com no minímo 6 caracteres'
          )
          return false
        }
      } else {
        this.$toast.warning('Você não digitou um email válido')
        return false
      }
    },
    async getUser() {
      const body = {
        mail: this.email,
        password: this.password,
      }
      let resp = await login(body)
      if (resp.status == 201) {
        this.$toast.success('Login efeutado com Sucesso!')
        localStorage.setItem('user', JSON.stringify(resp.data.user))
        this.$emit('login', resp.data.user)
        this.$nextTick(() => {
          this.$bvModal.hide('modal-login')
        })
      } else this.$toast.error('Usuário ou senha inválidos')
    },
  },
  computed: {
    invalidFeedbackEmail() {
      if (!this.email) {
        return null
      } else return 'Digite um Email válido'
    },
    emailStateInput() {
      if (this.email) {
        return re.test(String(this.email).toLowerCase())
      }
      return null
    },
    invalidFeedbackPassword() {
      if (this.password.length < 6) {
        return 'Digite uma senha com no mínimo 6 caracteres'
      } else return null
    },
    passwordStateInput() {
      if (this.password) {
        return this.password.length >= 6
      }
      return null
    },
  },
}
</script>
