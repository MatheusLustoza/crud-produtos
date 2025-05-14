<template>
  <div class="container">
    <Register v-if="!logado && tela === 'cadastro'" @mudarTela="tela = $event" />
    <Login v-if="!logado && tela === 'login'" @logado="logado = true" @mudarTela="tela = $event" />
    <ProductList v-if="logado" />
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ProductList from './components/ProductList.vue';

export default {
  components: { Login, Register, ProductList },
  data() {
    return {
      logado: false,
      tela: 'login'
    };
  }
};
</script>


<style>
/* Estilo global para o app */
html, body, #app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  font-family: 'Arial', sans-serif;
}


.content {
  text-align: center;
  width: 100%;
  max-width: 400px; /* Limita a largura */
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para o box */
}

.toggle-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-button:hover {
  background-color: #0056b3;
}
</style>