<template>
  <div class="content">
    <h2>Login</h2>
    <input v-model="username" placeholder="Usuário" class="input-field" />
    <input v-model="password" type="password" placeholder="Senha" class="input-field" />
    <button :disabled="!username || !password":class="['btn-login', { 'btn-disabled': !username || !password, 'btn-active': username && password }]"@click="login">Entrar</button>
    <button @click="$emit('mudarTela', 'cadastro')" class="btn-cadastrar">Cadastrar</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // Dados reativos que armazenam o nome de usuário e a senha
  data() {
    return { username: '', password: '' };
  },
  methods: {
    async login() {
      try {
        // Envia os dados para o backend via POST para autenticar o usuário
        const res = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password
        });
        alert('Login bem-sucedido');
        this.$emit('logado');
      } catch (err) {
        alert('Erro ao fazer login');
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Estilo dos campos de input */
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fafafa;
}

.input-field:focus {
  border-color: #007bff;
  background-color: #fff;
  outline: none;
}

.btn-login {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #188ae1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;
}
.btn-login:hover {
  background-color: #007bff;
}
.btn-disabled {
  background-color: #a0c4ff; /* Azul claro */
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-active {
  background-color: #007bff; /* Azul normal */
  cursor: pointer;
  opacity: 1;
}


.btn-cadastrar {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.btn-cadastrar:hover {
  background-color: #218838;
}
</style>