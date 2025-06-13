import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';

// Notificações
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Estilo padrão

const app = createApp(App);

// Cria instância global de notificação
const notyf = new Notyf({
  duration: 3000,
  position: { x: 'right', y: 'top' },
  types: [
    { type: 'success', background: '#4CAF50', icon: true },
    { type: 'error', background: '#F44336', icon: true }
  ]
});

// Adiciona no prototype do Vue para acessar facilmente
app.config.globalProperties.$notyf = notyf;

app.mount('#app');