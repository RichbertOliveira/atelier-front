import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faMoneyBill1,
  faMoneyBill,
  faPalette,
  faVanShuttle,
  faHouseCircleCheck,
  faCheck,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

library.add(
  faInstagram,
  faMoneyBill1,
  faMoneyBill,
  faPalette,
  faVanShuttle,
  faHouseCircleCheck,
  faCheck,
  faWhatsapp,
  faTrash,
  faPlus
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
