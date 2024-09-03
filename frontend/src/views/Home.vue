<template>
  <div>
    <div ref="map" class="map"></div> 
    <button type="button" @click="getCurrentLocation" class="btn-location">現在地から検索する</button>

    <button @click="searchArea" class="btn-area-search">このエリアで検索</button>

    <h1>シッター検索</h1>
    <form @submit.prevent="searchSitters">
      <div class="input-group">
        <label for="prefecture">都道府県</label>
        <select id="prefecture" v-model="selectedPrefecture" @change="updateCities">
          <option v-for="prefecture in prefectures" :key="prefecture.name" :value="prefecture.name">
            {{ prefecture.name }}
          </option>
        </select>
      </div>
      
        <div class="input-group">
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
/* global google */
import axios from '@/axios.js';

export default {
  name: 'HomePage',
  data() {
    return {
      map: null, 
      marker: null, 
      circle: null,
      isLoggedIn: false,
      prefectures: [], 
      selectedPrefecture: '', 
      cities: [], 
      selectedCity: '', 
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      latitude: null, 
      longitude: null, 
      results: []
    };
  },
  async mounted() {
    await this.checkAuthentication();
    await this.fetchPrefectures();
    this.initMap(); 
  },
  methods: {
    async checkAuthentication() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('user/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log('API Response:', response.data); 
        this.isLoggedIn = true;
        this.name = response.data.name || 'Guest'; // ここでusernameを取得
      } catch (error) {
        console.error('Failed to fetch user information', error);
        localStorage.removeItem('token');
        this.isLoggedIn = false;
      }
    },
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
    initMap() {
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 35.6895, lng: 139.6917 }, // 初期表示位置（東京）
        zoom: 12
      });

      this.map.addListener('center_changed', () => {
        const center = this.map.getCenter();
        this.latitude = center.lat();
        this.longitude = center.lng();
      });
    },

    async getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          
          // マップを現在地に移動
          this.map.setCenter({ lat: this.latitude, lng: this.longitude });

          // マーカーを現在地に置く
          if (this.marker) this.marker.setMap(null); // 既存のマーカーを削除
          this.marker = new google.maps.Marker({
            position: { lat: this.latitude, lng: this.longitude },
            map: this.map,
            title: '現在地'
          });

          // 検索範囲を示す円を描画
          if (this.circle) this.circle.setMap(null); // 既存の円を削除
          this.circle = new google.maps.Circle({
            map: this.map,
            radius: 5000, // 5km
            fillColor: '#AA0000'
          });
          this.circle.bindTo('center', this.marker, 'position');

          this.searchSitters(); 
        }, error => {
          console.error('現在地の取得に失敗しました:', error);
          alert('現在地の取得に失敗しました。位置情報を許可してください。');
        });
      } else {
        alert('このブラウザは位置情報取得をサポートしていません。');
      }
    },
    async searchSitters() {
      try {
        const response = await axios.get('sitters/', {
          params: {
            location: this.selectedCity,
            start_date: this.startDate,
            end_date: this.endDate,
            start_time: this.startTime,
            end_time: this.endTime,
            latitude: this.latitude, 
            longitude: this.longitude,
          }
        });
        this.results = response.data;
      } catch (error) {
        console.error('検索に失敗しました:', error);
        alert('検索に失敗しました。再度お試しください。');
      }
    },
    async searchArea() {
      // マップの中心位置でシッターを検索
      const center = this.map.getCenter();
      this.latitude = center.lat();
      this.longitude = center.lng();
      this.searchSitters();
    }
  }
};
</script>



<style scoped>
.map {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}

h1 {
  color: #5cc87b; 
}

p {
  font-size: 1.5em; 
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
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
}
.btn-location {
  background-color: #5cb85c; /* 緑色 */
  color: #fff;
}

.btn-location:hover {
  background-color: #4cae4c; /* 緑色のホバー時 */
}

.btn-area-search {
  background-color: #f0ad4e; /* オレンジ色 */
  color: #fff;
}

.btn-area-search:hover {
  background-color: #ec971f; /* オレンジ色のホバー時 */
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
