<template>
  <div class="sidebar">
    <h3>Menu</h3>
    <label for="categoriaFiltro"><strong>Filtrar por categoria:</strong></label>
    <select v-model="categoriaSelecionada" @change="enviarFiltro" class="form-control">
      <option value="">Todas</option>
      <option value="Roupas">Roupas</option>
      <option value="Eletrônicos">Eletrônicos</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoriaSelecionada: ""
    };
  },
  methods: {
    enviarFiltro() {
      this.$emit("filtroSelecionado", this.categoriaSelecionada);
    }
  }
};
</script>

<style>
.sidebar {
  background-color: #f5f5f5;
  padding: 20px;
}
</style>