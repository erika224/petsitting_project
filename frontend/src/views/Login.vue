<template>
  <div>
    <div class="login-container">
      <h1>ログイン</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">メールアドレス</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">パスワード</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button">ログイン</button>
      </form>
      <p class="register-link">
        <router-link to="/register">新規登録の方はこちら</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
  async login() {
    try {
      const response = await axios.post('/login/', {
        email: this.email,
        password: this.password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      this.$router.push('/');
    } catch (error) {
      console.error('ログインに失敗しました:', error);
      alert('ログインに失敗しました。再度お試しください。');
      } 
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}

h1 {
  font-family: 'Cute Font', sans-serif;
  color: #ff6f61;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
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
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #ff857a;
}

@media (max-width: 600px) {
  .login-container {
    padding: 10px;
    max-width: 90%;
  }

  h1 {
    font-size: 2em;
  }

  .login-button {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
