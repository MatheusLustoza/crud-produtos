<template>
  <div class="menu">
    <!-- Logotipo -->
    <img src="/logo.png" alt="Logotipo" class="logo" />

    <!-- Conteúdo atual -->
    <h1>Bem-vindo ao Menu</h1>
    <button @click="$emit('mudarTela', 'produtos')">Ir para Produtos</button>
    <button class="logout-button" @click="logout">Sair</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['mudarTela', 'logout'])

function logout() {
  localStorage.removeItem('token')
  emit('logout') // Emite evento que o App.vue vai escutar
}
</script>

<style scoped>
.menu {
  text-align: center;
  margin-top: 40px;
}

.logo {
  display: block;
  margin: 0 auto 20px auto; /* Centraliza */
  max-width: 200px;
  height: auto;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.logout-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}

.logout-button:hover {
  background-color: darkred;
}
</style>