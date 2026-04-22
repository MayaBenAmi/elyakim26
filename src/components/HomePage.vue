<template>
  <div id="home-page">
    <div class="content">
      <img class="logo" src="@/assets/media/logo.png" alt="לוגו">
      <div class="main-title">בחר נושא</div>
      <div class="divider"></div>
      <div class="grid">
        <button
          v-for="(topic, index) in topics"
          :key="index"
          class="topic-btn"
          :class="{ 'shine-animate': shiningIndex === index }"
          @click="triggerShine(index)"
        >
          <span class="topic-text">{{ topic }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";

export default {
  name: "home-page",
  emits: ["chosenNum"],
  data() {
    return {
      topics: json.topics,
      shiningIndex: null
    };
  },
  methods: {
    triggerShine(index) {
      this.shiningIndex = null;
      this.$nextTick(() => {
        this.shiningIndex = index;
      });

      const onEnd = () => {
        this.$emit("chosenNum", index);
        this.shiningIndex = null;
      };

      setTimeout(onEnd, 420);
    }
  }
};
</script>

<style scoped>
#home-page {
  position: absolute;
  top: 0; right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f7;
  overflow: hidden;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4vh;
  padding: 0 4vw;
  width: 100%;
}

.logo {
  height: 8vh;
  width: auto;
  object-fit: contain;
  user-select: none;
}

.main-title {
  font-family: "assistant-extrabold";
  font-size: 2.25vw;
  color: #1d1d1f;
  letter-spacing: -0.02em;
}

.divider {
  width: 3vw;
  height: 1.5px;
  background: #d2d2d7;
  margin-top: -2.5vh;
}

.grid {
  display: grid;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2vw;
  width: 80vw;
}

.topic-btn {
  flex: 0 0 calc(25% - 0.9vw);
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #d0e4d8;
  border-radius: 16px;
  padding: 3.5vh 2vw;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s, border-bottom-color 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
}

.topic-btn:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.09);
  border-color: #3a6b4a;
}

.topic-text {
  font-family: "assistant-bold";
  font-size: 1.3vw;
  color: #1d1d1f;
  user-select: none;
  position: relative;
  z-index: 1;
}

/* SHINE EFFECT */
.topic-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -80%;
  width: 55%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.55) 50%,
    rgba(255,255,255,0) 100%
  );
  opacity: 0;
  pointer-events: none;
}

.topic-btn.shine-animate::after {
  animation: btnShine 0.4s ease-in-out forwards;
  opacity: 1;
}

@keyframes btnShine {
  from { left: -80%; }
  to   { left: 120%; }
}

/* LARGE SCREEN */
@media (min-width: 1600px) {
  .main-title  { font-size: 3.8vw; }
  .topic-text  { font-size: 1.8vw; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  .logo        { height: 4vh; }
  .main-title  { font-size: 6.5vw; }
  .divider     { width: 15vw; }
  .grid {
    flex-direction: column;
    gap: 2.5vw;
    width: 88vw;
  }

  .topic-btn   { flex: none; width: 100%; padding: 2.5vh 4vw; border-radius: 20px; }
  .topic-text  { font-size: 4.2vw; }
}
</style>
