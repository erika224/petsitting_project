<template>
  <div class="sitter-search-container">
    <h1>シッター検索</h1>
    <form @submit.prevent="searchSitters">
      <div class="input-group">
        <label for="prefecture">都道府県</label>
        <select id="prefecture" v-model="selectedPrefecture" @change="updateCities">
          <option v-for="prefecture in prefectures" :key="prefecture.name" :value="prefecture.name">
            {{ prefecture.name }}
          </option>
        </select>
      
        <label for="city">市区町村</label>
        <select id="city" v-model="selectedCity">
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label for="startDate">開始日</label>
        <input type="date" id="startDate" v-model="startDate" />
      </div>
      <div class="input-group">
        <label for="startTime">開始時間</label>
        <input type="time" id="startTime" v-model="startTime" />
      </div>
      <div class="input-group">
        <label for="endDate">終了日</label>
        <input type="date" id="endDate" v-model="endDate" />
      </div>      
      <div class="input-group">
        <label for="endTime">終了時間</label>
        <input type="time" id="endTime" v-model="endTime" />
      </div>
      <button type="submit">検索する</button>
    </form>

    <div v-if="results.length > 0" class="results">
      <h2>検索結果</h2>
      <ul>
        <li v-for="sitter in results" :key="sitter.id">
          {{ sitter.name }} - {{ sitter.location }} - {{ sitter.price }}円/時
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  name: 'SitterSearch',
  data() {
    return {
      prefectures: [], // 都道府県リスト
      selectedPrefecture: '', // 選択された都道府県の名前
      cities: [], // 選択された都道府県の市区町村リスト
      selectedCity: '', // 選択された市区町村の名前
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      results: []
    };
  },
  async mounted() {
    await this.fetchPrefectures();
  },
  methods: {
    async fetchPrefectures() {
      try {
        const response = await axios.get('/proxy_geolonia/');
        const rawData = response.data;

        this.prefectures = Object.keys(rawData).map(prefectureName => ({
          name: prefectureName,
          cities: rawData[prefectureName]
        }));
        console.log("Processed Prefectures Data:", this.prefectures);
      } catch (error) {
        console.error('都道府県データの取得に失敗しました:', error);
      }
    },
    updateCities() {
      const selectedPrefectureData = this.prefectures.find(
        prefecture => prefecture.name === this.selectedPrefecture
      );
      this.cities = selectedPrefectureData ? selectedPrefectureData.cities : [];
      this.selectedCity = '';
    },
    async searchSitters() {
      const token = localStorage.getItem('token'); // ここを確認
      try {
        const response = await axios.get('sitters/', {
        headers: {
          'Authorization': `Token ${token}` // ここでトークンをヘッダーに追加
        },
          params: {
            location: this.selectedCity,
            start_date: this.startDate,
            end_date: this.endDate,
            start_time: this.startTime,
            end_time: this.endTime
          }
        });
        this.results = response.data;
      } catch (error) {
        console.error('検索に失敗しました:', error);
        alert('検索に失敗しました。再度お試しください。');
      }
    }
  }
};
</script>

<style scoped>
.sitter-search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
select {
  background-color: #ffffff; /* プルダウンの背景色 */
  color: #333333; /* プルダウンの文字色 */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 100%;  /* 幅の最大値を設定 */
  box-sizing: border-box; /* パディングを含めて幅を計算 */
  height: auto; /* 高さを自動に */
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

.results {
  margin-top: 20px;
}

.results ul {
  list-style: none;
  padding: 0;
}

.results li {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
