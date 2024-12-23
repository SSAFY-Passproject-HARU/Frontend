<template>
  <div class="page">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="content">
        <h1>매물 등록</h1>
        <div class="view">
          <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div>
              <label for="title">제목:</label>
              <input
                type="text"
                id="title"
                v-model="RoomDto.title"
                required
                placeholder="제목을 입력하세요"
              />
            </div>
            <div>
              <label for="description">내용:</label>
              <textarea
                id="description"
                v-model="RoomDto.description"
                required
                placeholder="내용을 입력하세요"
              ></textarea>
            </div>
            <div>
              <label for="price">가격:</label>
              <input
                type="number"
                id="price"
                v-model="RoomDto.price"
                required
                placeholder="가격을 입력하세요"
              />
            </div>
            <div>
              <label for="area">면적:</label>
              <input
                type="number"
                id="area"
                v-model="RoomDto.area"
                required
                placeholder="면적을 입력하세요"
              />
            </div>
            <div>
              <label for="roomCount">방 개수:</label>
              <input
                type="number"
                id="roomCount"
                v-model="RoomDto.roomCount"
                required
                placeholder="방 개수를 입력하세요"
              />
            </div>
            <div>
              <label for="bathroomCount">욕실 개수:</label>
              <input
                type="number"
                id="bathroomCount"
                v-model="RoomDto.bathroomCount"
                required
                placeholder="욕실 개수를 입력하세요"
              />
            </div>
            <div>
              <label for="roomType">매물 종류:</label>
              <input
                type="text"
                id="roomType"
                v-model="RoomDto.roomType"
                required
                placeholder="매물 종류를 입력하세요"
              />
            </div>
            <div>
              <label for="roomFloor">매물 층:</label>
              <input
                type="number"
                id="roomFloor"
                v-model="RoomDto.roomFloor"
                required
                placeholder="매물 층을 입력하세요"
              />
            </div>
            <div>
              <label for="totalFloors">건물 전체 층:</label>
              <input
                type="number"
                id="totalFloors"
                v-model="RoomDto.totalFloors"
                required
                placeholder="건물 전체 층을 입력하세요"
              />
            </div>

            <div>
              <label for="upfile" class="form-label">파일:</label>
              <input
                type="file"
                class="form-control border"
                id="upfile"
                @change="handleFileUpload"
                multiple
              />
            </div>
            <div>
              <button type="submit">작성하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import axios from "axios";
import NavBar from "@/components/common/NavBar.vue";
import TopBar from "@/components/common/TopBar.vue";

export default {
  name: "RoomRegisterView",
  components: { NavBar, TopBar },
  data() {
    return {
      root: "http://localhost:8080", // 서버 주소
      RoomDto: {
        userId: "", // 실제 사용자 ID 필요
        title: "",
        description: "",
        price: "",
        aptSeq: "",
        favorite: 0,
        area: "", // 새 필드
        roomCount: "", // 새 필드
        bathroomCount: "", // 새 필드
        roomType: "", // 새 필드
        roomFloor: "", // 새 필드
        totalFloors: "", // 새 필드
      },
      files: [], // 업로드할 파일
    };
  },
  mounted() {
    // URL의 파라미터에서 aptSeq 값을 받아오기
    this.RoomDto.aptSeq = this.$route.params.aptSeq || "";
    console.log("aptSeq:", this.RoomDto.aptSeq);
    const userStore = useUserStore();
    this.RoomDto.userId = userStore.user.id;
    console.log(userStore.user.id);
    
  },
  methods: {
    // 파일 업로드 처리
    handleFileUpload(event) {
      this.files = Array.from(event.target.files);
      console.log("Uploaded files:", this.files);
    },

    // 폼 유효성 검사
    validateForm() {
      if (
        !this.RoomDto.title ||
        !this.RoomDto.description ||
        !this.RoomDto.price
      ) {
        alert("모든 필드를 입력해주세요.");
        return false;
      }
      if (isNaN(this.RoomDto.price) || this.RoomDto.price <= 0) {
        alert("유효한 가격을 입력하세요.");
        return false;
      }
      return true;
    },

    // 폼 제출
    async submitForm() {
      // 유효성 검사
      if (!this.validateForm()) return;
      const formData = new FormData();


      formData.append(
        "roomDto",
        new Blob([JSON.stringify(this.RoomDto)], { type: "application/json" })
      );
      this.files.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await axios.post(
          `${this.root}/room/register`,
          formData,
          this.files,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        console.log("Response:", response);

        if (response.data.success) {
          alert("게시글이 작성되었습니다.");
          this.$router.push("/house/detail/" + this.RoomDto.aptSeq); // 작성 후 페이지 이동
        } else {
          alert("게시글 작성에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error submitting form:", error.response || error);
        alert("서버 오류로 게시글 작성에 실패했습니다.");
      }
    },
  },
};
</script>

<style scoped>
.page {
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
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
}

.content::-webkit-scrollbar {
  display: none;
}

.view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid var(--secondary-border);
  padding: 20px;
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

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input,
textarea,
button {
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid var(--secondary-border);
  border-radius: 4px;
}

button {
  background-color: var(--primary);
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--primary-dark);
}
</style>
