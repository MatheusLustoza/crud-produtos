<template>
  <div class="content">
    <h2>Cadastro</h2>
    <!-- v-model="username" e v-model="password": ligam os campos de entrada aos dados do componente -->
    <input v-model="username" placeholder="Usuário" class="input-field" />
    <input v-model="password" type="password" placeholder="Senha" class="input-field" />
    <!--Fica desabilitado se username ou password estiverem vazios-->
    <button :disabled="!username || !password":class="['btn-cadastrar', { 'btn-disabled': !username || !password, 'btn-active': username && password }]"@click="register">Cadastrar Usuário</button>
    <!--O segundo botão emite um evento para trocar a tela-->
    <button @click="$emit('mudarTela', 'login')" class="btn-login">Voltar para o login</button>
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

/* Estilo do botão de cadastro */
.btn-cadastrar {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.btn-cadastrar:hover {
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

.btn-login {
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

.btn-login:hover {
  background-color: #218838;
}
</style>