  <template>
    <div class="layout">
      <!-- Sidebar -->
      <div class="sidebar">
            <img src="/logo.png" alt="Logotipo" class="logo" />

        <h3>Opções</h3>
        <!-- Dentro do template -->
        <button @click="$emit('mudarTela', 'menu')">Menu</button>

        <div class="filtro">
          <label><strong>Filtrar por categoria:</strong></label>
          <select v-model="categoriaSelecionada" @change="fetchProducts">
            <option value="">Todas</option>
            <option value="Roupas">Roupas</option>
            <option value="Eletrônicos">Eletrônicos</option>
          </select>
        </div>
      </div>

      <!-- Conteúdo principal -->
      <div class="container">
        <div class="header">
          <p class="username">Olá, {{ username }}! 😃</p>
          <div class="actions">
          <button @click="exportToCSV" class="csv-button">Exportar CSV</button>
          <button class="logout-button" @click="logout">Sair</button>
        </div>
      </div>

        <center><h2>Gerenciamento de Produtos:</h2></center>

        <!-- Formulário de Cadastro/Edição -->
        <center>
          <div class="form">
            <input v-model="product.name" placeholder="Nome do produto" required />
            <input v-model.number="product.price" type="number" placeholder="Preço" required />
            <input v-model="product.description" placeholder="Descrição" />

          <select v-model="product.categoria" required>
            <option value="" disabled selected>Selecione a Categoria</option>
            <option value="Roupas">Roupas</option>
            <option value="Eletrônicos">Eletrônicos</option>
          </select>

            <button v-if="!editing" @click="createProduct">Adicionar</button>
            <button v-else @click="updateProduct">Atualizar</button>
            <button v-if="editing" @click="cancelEdit">Cancelar</button>
          </div>
        </center>

        <!-- Tabela de Produtos -->
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.name }}</td>
              <td>R$ {{ item.price.toFixed(2) }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.categoria }}</td>
              <td>
                <button @click="editProduct(item)">Editar</button>
                <button @click="deleteProduct(item.id)">Deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';
  

  export default {
    name: 'ProductList',
    data() {
      return {
        username: '',
        products: [],
        product: { name: '', price: 0, description: '', categoria: '' },
        editing: false,
        editingId: null,
        categoriaSelecionada: ''
      };
    },
    mounted() {
      this.username = localStorage.getItem('username') || '';
      this.fetchProducts();
      
    },
    methods: {
      async fetchProducts() {
  try {
    const token = localStorage.getItem('token');
    console.log('Token usado:', token); // Verifique se existe

    let url = 'http://localhost:3000/api/products';
    if (this.categoriaSelecionada) {
      url += `?categoria=${encodeURIComponent(this.categoriaSelecionada)}`;
    }

    console.log('URL da requisição:', url); // Confira se está certa

    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    this.products = res.data;
  } catch (err) {
    console.error('Erro ao buscar produtos:', err.response?.data || err.message);
    if (err.response?.status === 401) {
      this.$notyf.error('Sua sessão expirou!');
    } else {
      this.$notyf.error('Erro ao carregar os produtos.');
    }
  }
},

    async createProduct() {
    console.log('Dados sendo enviados:', this.product); // Adicione esta linha
    if (!this.product.name || !this.product.price || !this.product.categoria) {
      this.$notyf.error('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$notyf.error('Você precisa estar logado.');
        return;
      }

      await axios.post('http://localhost:3000/api/products', this.product, {
        headers: { Authorization: `Bearer ${token}` }
      });

      this.$notyf.success('Produto adicionado com sucesso!');
      this.resetForm();
      this.fetchProducts();
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      this.$notyf.error('Erro ao adicionar produto.');
    }
  },

      async updateProduct() {
        if (!this.product.name || !this.product.price || !this.product.categoria) {
          this.$notyf.error('Preencha todos os campos obrigatórios!');
          return;
        }

        try {
          const token = localStorage.getItem('token');
          if (!token) {
            this.$notyf.error('Você precisa estar logado.');
            return;
          }

          await axios.put(`http://localhost:3000/api/products/${this.editingId}`, this.product, {
            headers: { Authorization: `Bearer ${token}` }
          });

          this.$notyf.success('Produto atualizado com sucesso!');
          this.resetForm();
          this.fetchProducts();
        } catch (err) {
          console.error('Erro ao atualizar produto:', err);
          this.$notyf.error('Erro ao atualizar produto.');
        }
      },

      async deleteProduct(id) {
        if (!confirm('Tem certeza que deseja deletar este produto?')) return;

        try {
          const token = localStorage.getItem('token');
          if (!token) {
            this.$notyf.error('Você precisa estar logado.');
            return;
          }

          await axios.delete(`http://localhost:3000/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          this.$notyf.success('Produto excluído com sucesso!');
          this.fetchProducts();
        } catch (err) {
          console.error('Erro ao deletar produto:', err);
          this.$notyf.error('Erro ao excluir produto.');
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
        this.product = { name: '', price: 0, description: '', categoria: '' };
        this.editing = false;
        this.editingId = null;
      },

      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.$emit('logout');
      },
      /*produto csv*/
       exportToCSV() {
      const headers = ['Nome', 'Preço', 'Descrição', 'Categoria', 'Data de Cadastro'];
      const rows = this.products.map(p => [
        p.name,
        p.price.toFixed(2),
        p.description || '',
        p.categoria,
        new Date(p.createdAt).toLocaleDateString()
      ]);

      const csvContent = [headers, ...rows]
        .map(e => e.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
      link.download = 'produtos.csv';
      link.click();
      }
    }
  };
    
  </script>

  <style scoped>
  /*botao csv!!! */
  .csv-button {
  background-color: #2ecc71;
  color: white;
  padding: 6px 12px;  
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.csv-button:hover {
  background-color: #27ae60;
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
  .logo {
  display: block;
  margin: 0 auto;
  max-width: 200px; 
}
  .layout {
    display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
  }

  .sidebar {
    width: 220px;
    background-color: #f5f7fa;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    overflow-y: auto;
  }
  .sidebar h3 {
    margin-bottom: 15px;
  }
  .sidebar button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .sidebar button:hover {
    background-color: #2980b9;
  }

  .container {
    margin-left: 220px;
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    margin-bottom: 20px;
  }
  .form input,
  .form select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-top: 5px;
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.9;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  .username {
    font-weight: bold;
    color: #333;
  }
  .logout-button {
    background-color: red;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .logout-button:hover {
    background-color: darkred;
  }
  </style>