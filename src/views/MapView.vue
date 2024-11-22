<template>
  <div class="map">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="map-view content">
        <h1>지도로 보기</h1>
        <div class="view">
          <div class="view-header">
            <select v-model="selectedSido" @change="onSidoChange">
              <option value="">시/도 선택</option>
              <option v-for="sido in sidoOptions" :key="sido.code" :value="sido">{{ sido.name }}</option>
            </select>
            <select v-model="selectedGugun" @change="onGugunChange">
              <option value="">구/군 선택</option>
              <option v-for="gugun in gugunOptions" :key="gugun.code" :value="gugun">{{ gugun.name }}</option>
            </select>
            <select v-model="selectedDong" @change="onDongChange">
              <option value="">동 선택</option>
              <option v-for="dong in dongOptions" :key="dong.code" :value="dong">{{ dong.name }}</option>
            </select>
          </div>
          <div class="main-content">
            <aside class="list">
              <ul v-if="houses.length > 0">
                <li v-for="house in houses" :key="house.id">
                  <HouseCard :house="house" />
                </li>
              </ul>
              <div v-else class="no-data">데이터가 없습니다.</div>
            </aside>
            <kakaoMap class="map" :houses="houses" />
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import HouseCard from "@/components/house/HouseCard.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";
import axios from "axios";

export default {
  components: { HouseCard, KakaoMap, NavBar, TopBar },
  data() {
    return {
      sidoOptions: [],
      gugunOptions: [],
      dongOptions: [],
      selectedSido: "", // { code, name } 구조
      selectedGugun: "", // { code, name } 구조
      selectedDong: "", // { code, name } 구조
      houses: [],
    };
  },
  mounted() {
    this.fetchSidoData();
  },
  methods: {
    fetchSidoData() {
      this.sendRequest("sido", "*00000000");
    },
    fetchGugunData(regcode) {
      this.sendRequest("gugun", regcode);
    },
    fetchDongData(regcode) {
      this.sendRequest("dong", regcode);
    },
    onSidoChange() {
      if (this.selectedSido) {
        const regcode = this.selectedSido.code.substr(0, 2) + "*00000";
        this.fetchGugunData(regcode);
        this.resetDong();
      } else {
        this.resetGugunAndDong();
      }
    },
    onGugunChange() {
      if (this.selectedGugun) {
        const regcode = this.selectedGugun.code.substr(0, 5) + "*";
        this.fetchDongData(regcode);
      } else {
        this.resetDong();
      }
    },
    onDongChange() {
      if (this.selectedSido && this.selectedGugun && this.selectedDong) {
        this.fetchHouses();
      }
    },
    resetGugunAndDong() {
      this.gugunOptions = [];
      this.dongOptions = [];
    },
    resetDong() {
      this.dongOptions = [];
    },
    fetchHouses() {
      // 선택된 옵션의 name만 전송
      const params = {
        sido: this.selectedSido.name,
        gugun: this.selectedGugun.name,
        dong: this.selectedDong.name,
      };
      console.log(params);
      axios
        .get("http://localhost:8080/home/list", { params })
        .then((response) => {
          console.log(response.data);
          this.houses = response.data;
        })
        .catch((error) => {
          console.error("Error fetching house data:", error);
        });
    },
    sendRequest(selid, regcode) {
      const url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
      const params = new URLSearchParams({
        regcode_pattern: regcode,
        is_ignore_zero: true,
      }).toString();

      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((data) => this.addOption(selid, data));
    },
    addOption(selid, data) {
      switch (selid) {
        case "sido":
          this.sidoOptions = data.regcodes.map((regcode) => ({
            code: regcode.code,
            name: regcode.name,
          }));
          break;
        case "gugun":
          this.gugunOptions = data.regcodes.map((regcode) => {
            const nameParts = regcode.name.split(" ");
            const name = nameParts.slice(1).join(" ");
            return { code: regcode.code, name };
          });
          break;
        case "dong":
          this.dongOptions = data.regcodes.map((regcode) => {
            const nameParts = regcode.name.split(" ");
            const name = nameParts.slice(-1).join(" ");
            return { code: regcode.code, name };
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  display: flex;
}

.main {
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 240px);
}

.content {
  flex-grow: 1;
  padding: 36px;
  background-color: var(--secondary);
  border-radius: 10px 0 0 0;
  overflow: auto;
  position: relative;
}

.content::-webkit-scrollbar {
  display: none;
}

* {
  font-family: var(--font-family-primary);
}
h1 {
  margin: 0;
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 36px;
}
select {
  margin: 20px;
  border: solid 1px var(--gray8);
  border-radius: 5px;
  background-color: var(--white);
  padding: 10px;
  font-size: 16px;
  width: 180px;
}
ul, li {
  list-style: none; 
  margin: 0; 
  padding: 0; 
}
li {
  margin: 0 10px;
  border-bottom: 1px solid var(--gray8);
}
li:last-child {
  border-bottom: none;
}
.map-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
}
.view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid var(--secondary-border);
}
.view-header {
  display: flex;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid var(--gray8);
}
.main-content {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
.list {
  width: 340px;
  min-width: 340px;
  overflow-y: auto;
}
.list::-webkit-scrollbar {
  display: none;
}
.map {
  flex-grow: 1;
}
.no-data {
  text-align: center;
  color: var(--gray8);
  font-size: 16px;
  margin-top: 20px;
}
</style>