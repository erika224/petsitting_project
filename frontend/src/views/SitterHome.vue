<template>
    <div>
      <h1>予約一覧</h1>
      <ul>
        <li v-for="booking in bookings" :key="booking.id">
          {{ booking.pet.name }} - {{ booking.start_date }} から {{ booking.end_date }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from '@/axios.js';
  import { useRouter } from 'vue-router'; // Vue Routerの使用を想定しています
  
  export default {
    data() {
      return {
        bookings: [],
      };
    },
    async mounted() {
      const token = localStorage.getItem('token');
      const router = useRouter();
      if (!token) {
        alert("ログインが必要です");
        router.push('/login'); // ログインページにリダイレクト
        return;
      }
  
      try {
        const response = await axios.get('bookings/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.bookings = response.data;
      } catch (error) {
        console.error('予約データの取得に失敗しました:', error);
        if (error.response && error.response.status === 401) {
          alert("認証エラーが発生しました。再度ログインしてください。");
          localStorage.removeItem('token'); // トークンをクリア
          router.push('/login'); // ログインページにリダイレクト
        }
      }
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #5cc87b; 
    font-size: 3em; 
  }
  </style>
  