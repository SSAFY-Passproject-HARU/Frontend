<template>
  <div class="community">
    <NavBar />
    <div class="main">
      <TopBar />
      <div class="detail-view content">
        <h1>커뮤니티</h1>
        <div class="view">
          <!-- 글 작성 버튼 -->
          <div class="button-container">
            <button class="btn-register" @click="goToCreatePost">
              글 작성
            </button>
          </div>

          <!-- 게시글 목록 -->
          <ul class="post-list">
            <li v-for="post in posts" :key="post.postId" @click="goToDetail(post.postId)">
              <div class="post-header">
                <h3>{{ post.title }}</h3>
                <small class="user-info">작성자: {{ post.userId }}</small>
                <!-- 글 삭제 버튼 -->
                <button v-if="post.userId === userId" class="btn-delete" @click.stop="deletePost(post.postId)">
                  삭제
                </button>
              </div>
              <p class="post-content">{{ post.content }}</p>
            </li>
          </ul>
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
  name: "CommunityView",
  components: { NavBar, TopBar },
  data() {
    return {
      posts: [],
      userId: "", // 사용자 ID
    };
  },
  methods: {
    goToDetail(postId) {
      this.$router.push(`/community/detail/${postId}`);
    },
    goToCreatePost() {
      this.$router.push("/community/create");
    },
    fetchPosts() {
      axios.get("http://localhost:8080/post")
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    },
    deletePost(postId) {
      if (confirm("정말로 이 글을 삭제하시겠습니까?")) {
        axios.delete(`http://localhost:8080/post/${postId}`)
          .then(() => {
            this.fetchPosts(); // 삭제 후 글 목록 갱신
          })
          .catch(error => {
            console.error("Error deleting post:", error);
          });
      }
    }
  },
  created() {
    this.fetchPosts();
  },
  mounted() {
    const userStore = useUserStore();
    this.userId = userStore.user.id; // 로그인된 사용자 ID 설정
  },
};
</script>

<style scoped>

.community {
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

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn-register {
  background-color: var(--primary);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-register:hover {
  background-color: var(--primary-dark);
}

.post-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-list li {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--gray8);
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
  transition: box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.post-list li:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.post-header h3 {
  font-size: 22px;
  margin: 0;
  color: var(--primary-dark);
}

.user-info {
  font-size: 14px;
  color: var(--gray5);
}

.post-content {
  font-size: 16px;
  color: var(--gray1);
  line-height: 1.5;
}

/* 글 삭제 버튼 스타일 */
.btn-delete {
  background-color: var(--danger);
  color: white;
  font-size: 14px;
  padding: 6px 12px;  /* 버튼 크기 줄이기 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px; /* 작성자 정보와 버튼 간의 간격 */
}

.btn-delete:hover {
  background-color: var(--danger-dark);
}
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  position: relative; /* 버튼을 절대 위치로 배치하기 위해 필요 */
}

.btn-delete {
  background-color: var(--danger);
  color: white;
  font-size: 14px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  right: 0;
  bottom: -45px; /* 아래로 조금 떨어지게 설정 */
}

.btn-delete:hover {
  background-color: var(--danger-dark);
}

</style>
