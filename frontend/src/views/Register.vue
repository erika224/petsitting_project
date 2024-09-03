<template>
  <div class="register-container">
    <h1>新規登録</h1>
    <form @submit.prevent="register">
      <div class="input-group">
        <label for="email">メールアドレス:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="name">名前:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="input-group">
        <label for="password">パスワード:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">登録する</button>
    </form>
  </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('register/', {
          name: this.name, 
          email: this.email,
          password: this.password
        });
        alert('登録が成功しました！');  
        this.$router.push('/login');
    } catch (error) {
        if (error.response) {
            if (error.response.data.email) {
                console.error('Registration failed: This email is already registered.');
                alert('このメールアドレスは既に登録されています。別のメールアドレスを使用してください。');
            } else {
                console.error('Registration failed:', error.response.data);
                alert('登録に失敗しました。再度お試しください。');
            }
        } else {
            console.error('Registration failed:', error.message);
            alert('登録に失敗しました。再度お試しください。');
        }
    }
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-family: 'Cute Font', sans-serif;
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
  width: 100%;
  padding: 10px;
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
</style>
