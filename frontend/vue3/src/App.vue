<template>
  <div class="container">
    <Register v-if="!logado && tela === 'cadastro'" @mudarTela="tela = $event" />
    <Login v-if="!logado && tela === 'login'" @logado="logado = true" @mudarTela="tela = $event" />
    <Menu v-if="logado && tela === 'menu'" @mudarTela="tela = $event" @logout="logado = false; tela = 'login'" ></Menu>
    <ProductList v-if="logado && tela === 'produtos'" :nomeUsuario="nomeUsuario" @logout="handleLogout" @mudarTela="tela = $event" />
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Menu from './components/Menu.vue';
import ProductList from './components/ProductList.vue';

export default {
  components: {
    Login,
    Register,
    Menu,
    ProductList
  },
  data() {
    return {
      logado: false,
      tela: 'login',
      nomeUsuario: '',
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token');
      this.logado = false;
      this.tela = 'login';
    }
  }
};
</script>
