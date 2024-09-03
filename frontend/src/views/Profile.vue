<template>
  <div class="profile-container">
    <h1>プロフィール</h1>
    <form @submit.prevent="updateProfile">
      <label for="email">メールアドレス:</label>
      <input type="email" v-model="email" required />
      <label for="name">名前:</label>
      <input type="text" v-model="name" required />
      <button type="submit">更新</button>
      <p v-if="successMessage">{{ successMessage }}</p>
  </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserProfile',
  data() {
      return {
          isLoggedIn: false,
          name: '',
          email: '',
          successMessage: '',
      };
  },
  async mounted() {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('http://localhost:8000/api/user/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    this.email = response.data.email;
    this.name = response.data.name;
  } catch (error) {
    console.error('プロフィール情報の取得に失敗しました:', error);
  }
},
methods: {
  async updateProfile() {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:8000/api/user/', {
        email: this.email,
        name: this.name,
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      this.successMessage = 'プロフィールが更新されました';
    } catch (error) {
      console.error('プロフィールの更新に失敗しました:', error);
    }
  },
  },
};
</script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #ff6f61;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 14px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ff6f61;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #ff857a;
  }
  
  button[type="button"] {
    background-color: #ccc;
    margin-left: 10px;
  }
  
  button[type="button"]:hover {
    background-color: #bbb;
  }
  </style>
  