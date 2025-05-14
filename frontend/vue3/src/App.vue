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