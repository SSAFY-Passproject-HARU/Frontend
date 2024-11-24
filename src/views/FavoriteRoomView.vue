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
                    <input type="text" id="title" v-model="RoomDto.title" required />
                </div>
                <div>
                    <label for="description">내용:</label>
                    <textarea id="description" v-model="RoomDto.description" required></textarea>
                </div>
                <div>
                    <label for="price">가격:</label>
                    <input type="number"  id="price" v-model="RoomDto.price" required />
                </div>
                <div>
                    <label for="upfile" class="form-label">파일:</label>
                    <input type="file" class="form-control border" id="upfile" @change="handleFileUpload" multiple />
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
  import NavBar from "@/components/common/NavBar.vue";
  import TopBar from "@/components/common/TopBar.vue";
  export default {
    name: "HouseRegisterView",
    components: { NavBar, TopBar },
    data() {
        return {
        root: 'http://localhost:8080', // 프로토콜 + 도메인 + 포트
        RoomDto: {
            userId: '',
            title: '',
            description: '',
            price: '',
            aptSeq: '',
            favorite: 0,
            fileInfos: [],
        },
        files: [], // 업로드할 파일들
        }
    },
    mounted() {
        this.aptSeq = this.$route.params.aptSeq;
        console.log(this.aptSeq);
    },

  }
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
  </style>