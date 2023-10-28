import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000';

export default {
  async getTodoList() {
    const response = await axios.get(`${API_BASE_URL}/api/Todo`);
    return response.data;
  },
  async addTask(taskData) {
    const response = await axios.post(`${API_BASE_URL}/api/Todo`, taskData);
    return response.data;
  },
  async deleteTask(taskId) {
    const response = await axios.delete(`${API_BASE_URL}/api/Todo/${taskId}`);
    return response.data;
  },
  async updateTask(taskId, updatedData) {
    const response = await axios.patch(`${API_BASE_URL}/api/Todo/${taskId}`, updatedData);
    return response.data;
  },
  // Tambahkan fungsi untuk berinteraksi dengan kategori
  async getCategoryList() {
    const response = await axios.get(`${API_BASE_URL}/api/Category`);
    return response.data;
  },
  // Anda dapat menambahkan fungsi lain sesuai kebutuhan untuk berinteraksi dengan kategori
};
