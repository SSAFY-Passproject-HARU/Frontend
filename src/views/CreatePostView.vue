<template>
    <div class="create">
      <NavBar />
      <div class="main">
        <TopBar />
        <div class="detail-view content">
          <h1>글 작성</h1>
          <div class="view">
            <form @submit.prevent="submitPost">
              <div class="form-group">
                <label for="title">제목</label>
                <input v-model="PostDto.title" id="title" type="text" required />
              </div>
              <div class="form-group">
                <label for="content">내용</label>
                <textarea v-model="PostDto.content" id="content" required></textarea>
              </div>
              <div class="button-container">
                <button class="btn-submit" type="submit">작성 완료</button>
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
  import axios from "axios";
  import { useUserStore } from "@/stores/user";
  
  export default {
    name: "CreatePostView",
    components: { NavBar, TopBar },
    data() {
      return {
        PostDto: {
          postId: 0,
          userId: "", // 사용자 ID
          title: "",
          content: "",
        },
      };
    },
    mounted() {
      const userStore = useUserStore();
      this.PostDto.userId = userStore.user.id; // 사용자 ID 설정
    },
    methods: {
      submitPost() {
        console.log(this.PostDto);
        axios.post("http://localhost:8080/post/create", this.PostDto)
          .then(() => {
            alert("게시글이 성공적으로 작성되었습니다.");
            this.$router.push("/community"); // 작성 후 목록 페이지로 이동
          })
          .catch((error) => {
            console.error("글 작성 실패:", error);
            alert("글 작성 중 오류가 발생했습니다.");
          });
      },
    },
  };
  </script>
    
  <style scoped>
  .create {
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
  
  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 36px;
  }
  
  .detail-view {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 95px);
  }
  
  .view {
    padding: 20px;
    flex-grow: 1;
    background-color: var(--white);
    border-radius: 10px;
    border: 1px solid var(--secondary-border);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--gray8);
    border-radius: 8px;
    font-size: 16px;
    resize: none;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  
  .btn-submit {
    background-color: var(--primary);
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-submit:hover {
    background-color: var(--primary-dark);
  }
  </style>
  