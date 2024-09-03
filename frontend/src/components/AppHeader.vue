<template>
    <header class="app-header">
      <div class="header-content">
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/sitter-search">Search</router-link>
          <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
          <button v-if="isAuthenticated" @click="logout" class="logout-button">Logout</button>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader',
    data() {
      return {
        isAuthenticated: false,
      };
    },
    created() {
      this.checkAuthentication();
    },
    methods: {
      checkAuthentication() {
        const token = localStorage.getItem('token');
        this.isAuthenticated = !!token; // トークンがあればログイン状態と判断
      },
      logout() {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.username = '';
        this.$router.push('/login');
      }
    },
    watch: {
      '$route'() {
        this.checkAuthentication(); // ルートが変更されたときに認証状態を再チェック
      }
    }
  };
  </script>
  
  <style scoped>
  .app-header {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .site-title {
    margin: 0;
  }
  
  nav {
    display: flex;
    gap: 15px;
    margin-left: auto;
  }
  
  router-link {
    color: white;
    text-decoration: none;
    margin-left: auto;
  }
  
  router-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
  
  .logout-button {
    background-color: white;
    color: #42b983;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin-left: auto; 
  }
  
  .logout-button:hover {
    background-color: #357a38;
    color: white;
  }

  
  </style>
  