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


