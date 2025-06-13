<template>
  <div class="content">
        <img src="/logo.png" alt="Logo" class="logo" />
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
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      username: this.username,
      password: this.password
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('username', this.username);
    alert('Login bem-sucedido');

    // 👉 Aqui está a correção
    this.$emit('logado');
    this.$emit('mudarTela', 'menu');
  } catch (err) {
    alert('Erro ao fazer login');
    console.error(err);
  }
}
}
}
</script>