<template>
    <div class="container">
      <button class="logout-button" @click="logout">Sair</button>
      <center><h2>Gerenciamento de Produtos:</h2></center>
  
      <!-- Formulário de criação/edição -->
      <center><div class="form">
        <input v-model="product.name" placeholder="Nome do produto" />
        <input v-model.number="product.price" type="number" placeholder="Preço" />
        <input v-model="product.description" placeholder="Descrição" />
        <button v-if="!editing" @click="createProduct">Adicionar</button>
        <button v-else @click="updateProduct">Atualizar</button>
        <button v-if="editing" @click="cancelEdit">Cancelar</button>
      </div></center>
  
      <!-- Tabela de produtos -->
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.description }}</td>
            <td>
              <button @click="editProduct(item)">Editar</button>
              <button @click="deleteProduct(item.id)">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductList',
    data() {
      return {
        products: [],
        product: { name: '', price: 0, description: '' },
        editing: false,
        editingId: null
      };
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
  async fetchProducts() {
    try {
      const res = await axios.get('http://localhost:3000/api/products');
      this.products = res.data;
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  },
  async createProduct() {
    try {
      await axios.post('http://localhost:3000/api/products', this.product);
      this.resetForm();
      this.fetchProducts();
    } catch (err) {
      console.error('Erro ao criar produto:', err);
    }
  },
  async updateProduct() {
    try {
      await axios.put(
        `http://localhost:3000/api/products/${this.editingId}`,
        this.product
      );
      this.resetForm();
      this.fetchProducts();
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
    }
  },
  async deleteProduct(id) {
    if (!confirm('Deletar este produto?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      this.fetchProducts();
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
    }
  },
  editProduct(item) {
    this.product = { ...item };
    this.editing = true;
    this.editingId = item.id;
  },
  cancelEdit() {
    this.resetForm();
  },
  resetForm() {
    this.product = { name: '', price: 0, description: '' };
    this.editing = false;
    this.editingId = null;
  },
  logout() {
  this.$emit('logout');
  }
}
  };
  </script>
  
  <style scoped>
  .container { max-width: 800px; margin: 0 auto; padding: 20px;}
  .form input { margin: 5px; padding: 5px;}
  button { margin: 5px; padding: 5px 10px;}
  table { width: 100%; border-collapse: collapse; margin-top: 20px;}
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left;}
   </style>