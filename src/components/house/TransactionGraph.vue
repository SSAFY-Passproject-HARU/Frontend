<template>
  <div class="main">
    <canvas ref="dealChart"></canvas>
    <!-- 그래프를 그릴 Canvas 요소 -->
  </div>
</template>
  
  <script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables); // Chart.js 모듈 등록

export default {
  name: "TransactionGraph",
  props: {
    aptSeq: { type: String, required: true },
  },
  data() {
    return {
      deals: [], // 거래 데이터를 저장할 배열
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          `http://localhost:8080/homeDetail/list?aptSeq=${this.aptSeq}`
        );
        const data = await response.json();
        this.deals = data;
        this.renderChart(); // 데이터 로드 후 그래프 생성
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    renderChart() {
      const ctx = this.$refs.dealChart.getContext("2d");
      new Chart(ctx, {
        type: "line", // 그래프 유형 (line, bar 등 선택 가능)
        data: {
          labels: this.deals.map(
            (deal) => `${deal.dealYear}-${deal.dealMonth}`
          ), // X축 레이블
          datasets: [
            {
              label: "거래 금액 (만원)",
              data: this.deals.map((deal) =>
                parseInt(deal.dealAmount.replace(",", ""))
              ), // Y축 데이터
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "거래 금액 (만원)",
              },
            },
            x: {
              title: {
                display: true,
                text: "거래 시기",
              },
            },
          },
        },
      });
    },
  },
};
</script>
  
  <style scoped>
.main {
  position: relative;
  height: 400px; /* 그래프 높이 설정 */
  width: 100%;
}
</style>
  