<template>
  <div class="content">
    <h2>Cadastro</h2>
    <!-- v-model="username" e v-model="password": ligam os campos de entrada aos dados do componente -->
    <input v-model="username" placeholder="Usuário" class="input-field" />
    <input v-model="password" type="password" placeholder="Senha" class="input-field" />
    <!--Fica desabilitado se username ou password estiverem vazios-->
    <button :disabled="!username || !password":class="['btn-login', { 'btn-disabled': !username || !password, 'btn-active': username && password }]"@click="register">Cadastrar Usuário</button>
    <!--O segundo botão emite um evento para trocar a tela-->
    <button @click="$emit('mudarTela', 'login')" class="btn-cadastrar">Voltar para o login</button>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '', // Armazena o nome de usuário digitado
      password: ''  // Armazena a senha digitada
    };
  },
  methods: {
    // Função chamada ao clicar no botão "Cadastrar Usuário"
    async register() {
      try {
        // Envia os dados para o backend
        await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          password: this.password
        });

        alert('Usuário cadastrado com sucesso!');
        this.$emit('mudarTela', 'login'); // Troca para a tela de login
      } catch (err) {
        alert('Erro no cadastro');
        console.error(err); // Mostra o erro
      }
    }
  }
};
</script>


