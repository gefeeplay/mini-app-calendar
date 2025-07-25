import './assets/main.css'
import './assets/toast-icons-style.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification'

const app = createApp(App)
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 5000,
  hideProgressBar: false,
  toastClassName: 'custom-toast', 
})

app.mount('#app')
