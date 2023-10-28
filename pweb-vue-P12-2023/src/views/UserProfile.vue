<!-- UserProfile.vue -->
<template>
    <div class="todo-app">
      <h1 class="py-2 px-0">Todo App </h1>
      <!-- Daftar nama pengguna horizontal dipisahkan dengan simbol "|" -->

    <!-- Input untuk todo baru -->
    <input
      class="todo-input w-80"
      v-model="newTodo"
      @keydown.enter.prevent="addTodo"
      placeholder="Add Tasks"
    />

    <!-- Input untuk memilih kategori -->
    <select class="category-select" v-model="selectedCategory" @change="onCategoryChange">
      <option value="" disabled selected>Select Category</option>
      <option v-for="category in categories" :key="category.id" :value="category.name">
                {{ category.name }}
      </option>
    </select>

    <!-- Input untuk memasukkan tenggat waktu -->
    <input
      class="deadline-input"
      v-model="newTodoDeadline"
      type="date"
      @keydown.enter.prevent="addTodo"
      placeholder="Deadline"
/>

    <!-- Kategori todolist -->
    <div class="flex justify-center items-center">
      <button @click="setCategory('all')" class="category-button">All Tasks</button>
      <button @click="setCategory('pending')" class="category-button">In Progress</button>
      <button @click="setCategory('completed')" class="category-button">Completed</button>
    </div>

    <!-- Daftar todo sesuai kategori -->
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
        <input
          type="checkbox"
          :checked="todo.completed"
          class="todo-checkbox"
          @change="toggleTodoStatus(todo.id)"
        />
        <span @click="editTodo(todo.id)">{{ todo.text }}</span>
        <span class="deadline">_{{ formatDeadline(todo.deadline) }}</span>
        <button @click="deleteTodo(todo.id)" class="delete-button ml-3">Hapus</button>
      </li>
    </ul>

    <!-- Modal Edit Tugas -->

    <div class="modal" v-if="showEditModal">
      <div class="modal-content">
        <h2>Edit Tugas</h2>
        <textarea v-model="editedTodoText"></textarea>
        <div class="modal-buttons">
          <button @click="saveEditedTodo">Simpan</button>
          <button @click="cancelEdit">Batal</button>
        </div>
      </div>
    </div>
    <button @click="goToAboutPage" class="back-button">Back</button>
  </div>
</template>

<script>
import todoService from '../views/todoService.js'
export default {
  data() {
    return {
      newTodo: "",
      newTodoDeadline: "",
      todos: [],
      categories: [],
      selectedCategory: "",
      category: "all",
      showEditModal: false,
      editedTodoId: null,
      editedTodoText: "",
    };
  },
  computed: {
    filteredTodos() {
      if (this.category === "pending") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.category === "completed") {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos;
      }
    },
  },
  methods: {
    async loadTodos() {
      this.todos = await todoService.getTodoList();
    },

    async loadCategories() {
      this.categories = await todoService.getCategoryList();
    },

    onCategoryChange() {
      this.filterByCategory();
    },

    filterByCategory() {
    // Menyaring tugas berdasarkan kategori yang dipilih
      if (this.selectedCategory === "") {
        this.todos = []; // Reset daftar tugas jika kategori tidak dipilih
      } else {
        this.todos = this.todos.filter(todo => todo.category === this.selectedCategory);
      }
    },

    // Metode untuk menambahkan tugas baru
    async addTodo() {
      if (this.newTodo.trim() !== "") {
        await todoService.addTask({ 
        text: this.newTodo, 
        completed: false, 
        category: this.selectedCategory,
        deadline: this.newTodoDeadline
         }); 
        this.newTodo = ""; 
        this.newTodoDeadline = "";
        await this.loadTodos(); 
  }
},

    formatDeadline(deadline) {
    if (!deadline) {
      return ""; // Tidak ada tenggat waktu
    }
    return `${todo.category}_${todo.text}_${this.formatDate(todo.deadline)}`;
},

    formatDate(deadline) {
    const today = new Date();
    const todoDeadline = new Date(deadline);

    // Bandingkan tahun tenggat waktu dengan tahun saat ini
    if (todoDeadline.getFullYear() === today.getFullYear()) {
      // Jika tahun sama, tampilkan hanya bulan dan tanggal (MM-DD)
      const month = String(todoDeadline.getMonth() + 1).padStart(2, "0");
      const day = String(todoDeadline.getDate()).padStart(2, "0");
      return `${month}-${day}`;
    } else {
      // Jika tahun berbeda, tampilkan lengkap (YYYY-MM-DD)
      const year = todoDeadline.getFullYear();
      const month = String(todoDeadline.getMonth() + 1).padStart(2, "0");
      const day = String(todoDeadline.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  },
    // Metode untuk menghapus tugas
    async deleteTodo(id) {
      await todoService.deleteTask(id);
      await this.loadTodos();
    },

    // Metode untuk mengubah status tugas (completed atau tidak)
    async toggleTodoStatus(id) {
      await todoService.updateTask(id, { completed: !this.todos.find(todo => todo.id === id).completed });
      await this.loadTodos(); 
},


    created() {
      this.loadTodos();
      this.loadCategories();
    },
  },
};
</script>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 15px;
  background-color: #0e2c20;
  border-radius: 8px;
  color: #a5a5a5;
}

.todo-input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #0D9488;
  width: 100%;
}

.category-select {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  color: #a5a5a5;
}
.deadline-input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%; /* Lebar 100% agar mengisi seluruh kolom input */
}

.category-button {
  margin-right: 10px;
  padding: 8px 12px;
  background-color: #0D9488;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.category-button:hover {
  background-color: #34495E; /* Warna latar belakang yang berbeda saat hover */
}
.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item .task-name {
  margin-bottom: 5px;
}

.todo-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-checkbox {
  margin-right: 10px;
}

.delete-button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  width: 60px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #34495E;/* Warna latar belakang yang berbeda saat hover */
}

.back-button {
  margin: 20px auto; /* Memberikan jarak di atas dan di bawah tombol */
  display: block; /* Mengubah tombol menjadi elemen block agar bisa di-center */
  background-color: #0D9488;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #34495E;
}

/* Style untuk modal edit tugas */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-top: 0;
}

.modal textarea {
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 10px;
}

.modal-buttons {
  text-align: right;
}

.modal-buttons button {
  margin-left: 10px;
  background-color: #48FFC2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

</style>
