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
            <li
              v-for="post in posts"
              :key="post.id"
              @click="goToDetail(post.id)"
            >
              <h3>{{ post.title }}</h3>
              <p>{{ post.content }}</p>
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

export default {
  name: "CommunityView",
  components: { NavBar, TopBar },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "첫 번째 게시글",
          content: "이것은 첫 번째 게시글 내용입니다.",
        },
        {
          id: 2,
          title: "두 번째 게시글",
          content: "여기는 두 번째 게시글 내용이에요.",
        },
        {
          id: 3,
          title: "세 번째 게시글",
          content: "세 번째 게시글의 간단한 설명입니다.",
        },
      ],
    };
  },
  methods: {
    goToDetail(postId) {
      this.$router.push(`/community/detail/${postId}`);
    },
    goToCreatePost() {
      this.$router.push("/community/create"); // 글 작성 페이지로 이동
    },
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

.content::-webkit-scrollbar {
  display: none;
}

h1 {
  margin: 0;
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  margin-bottom: 36px;
}

.detail-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
}

.view {
  padding: 40px;
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
  transition: all 0.3s ease;
}

.btn-register:hover {
  background-color: var(--primary-dark);
}

.post-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.post-list li {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid var(--gray8);
  border-radius: 8px;
  background-color: var(--white);
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.post-list li:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.post-list h3 {
  font-size: 20px;
  margin: 0 0 10px;
}

.post-list p {
  font-size: 16px;
  color: var(--gray1);
  margin: 0;
}
</style>
  