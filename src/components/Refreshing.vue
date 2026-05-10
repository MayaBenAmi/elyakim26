<template>
  <div id="refreshing">
    <div class="web-container" v-if="chosenTitle === ''">
      <img class="logo" src="@/assets/media/logo.png" alt="לוגו">
      <div class="maintitle">{{ maintitle }}</div>
      <div class="divider"></div>
      <div class="grid">
        <button
          v-for="(title, index) in titles"
          :key="index"
          class="area-btn"
          :class="{ 'shine-animate': shiningIndex === index }"
          @click="pickArea(index)"
        >
          <span class="area-text">{{ title }}</span>
        </button>
      </div>
    </div>

    <refreshment
      v-if="chosenTitle !== ''"
      :num="chosenTitle"
      :maintitle="maintitle"
      @back="back"
    ></refreshment>
  </div>
</template>

<script>
import json from "../../text.json";
import Refreshment from "@/components/Refreshment";

export default {
  props: ["maintitle"],
  name: "refreshing",
  components: { Refreshment },
  data() {
    return {
      titles: json.refreshing.map(item => item.title),
      chosenTitle: "",
      shiningIndex: null
    };
  },
  mounted() {
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);
  },
  methods: {
    pickArea(index) {
      this.shiningIndex = null;
      this.$nextTick(() => { this.shiningIndex = index; });
      setTimeout(() => {
        this.chosenTitle = index;
        this.shiningIndex = null;
      }, 420);
    },
    back() {
      this.chosenTitle = "";
      this.shiningIndex = null;
    }
  }
};
</script>

<style scoped>
#refreshing {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}

.web-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f7;
  gap: 3.5vh;
  overflow: hidden;
}

.logo {
  height: 7vh;
  width: auto;
  object-fit: contain;
  user-select: none;
}

.maintitle {
  font-family: "assistant-extrabold";
  font-size: 2.25vw;
  color: #1d1d1f;
  letter-spacing: -0.02em;
}

.divider {
  width: 3vw;
  height: 2px;
  background: #d2d2d7;
  border-radius: 2px;
  margin-top: -2vh;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2vw;
  width: 55vw;
}

.area-btn {
  flex: 0 0 calc(33.333% - 0.8vw);
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #d0e4d8;
  border-radius: 10px;
  padding: 2.8vh 2vw;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.area-btn:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.09);
  border-color: #3a6b4a;
}

.area-text {
  font-family: "assistant-bold";
  font-size: 1.3vw;
  color: #1d1d1f;
  user-select: none;
  position: relative;
  z-index: 1;
}

/* SHINE EFFECT */
.area-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -80%;
  width: 55%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.6) 50%,
    rgba(255,255,255,0) 100%
  );
  opacity: 0;
  pointer-events: none;
}

.area-btn.shine-animate::after {
  animation: btnShine 0.4s ease-in-out forwards;
  opacity: 1;
}

@keyframes btnShine {
  from { left: -80%; }
  to   { left: 120%; }
}

/* LARGE SCREEN */
@media (min-width: 1600px) {
  .maintitle  { font-size: 3.8vw; }
  .area-text  { font-size: 1.8vw; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  .web-container {
    justify-content: flex-start;
    padding-top: 10vh;
    overflow-y: auto;
  }
  .logo       { height: 4vh; }
  .maintitle  { font-size: 6.5vw; }
  .divider    { width: 15vw; }
  .grid {
    flex-direction: column;
    gap: 2.5vw;
    width: 88vw;
    margin-bottom: 20vh;
  }
  .area-btn   { flex: none; width: 100%; padding: 2.5vh 4vw; border-radius: 20px; }
  .area-text  { font-size: 4.2vw; }
}
</style>
