<template>
  <div id="structure">
    <div class="web-container" v-if="!chosen">
      <img class="logo" src="@/assets/media/logo.png" alt="לוגו">
      <div class="title">{{ title }}</div>
      <div class="divider"></div>
      <div class="grid">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-btn"
          :class="{ 'shine-animate': shiningIndex === index }"
          @click="selectTab(tab, index)"
        >
          <span class="tab-text">{{ tab.title }}</span>
        </button>
      </div>
    </div>

    <practice
      v-if="chosen && selectedTab && selectedTab.key !== 'nohal-alat'"
      @back="back"
      :tab="selectedTab">
    </practice>

    <nohal-alat
      v-if="chosen && selectedTab && selectedTab.key === 'nohal-alat'"
      @back="back"
      :tab="selectedTab">
    </nohal-alat>
    <nohal-atzmai
      v-if="chosen && selectedTab && selectedTab.key === 'nohal-atzmai'"
      @back="back"
      :tab="selectedTab">
    </nohal-atzmai>

    <equipment
      v-if="chosen && selectedTab && selectedTab.key === 'equipment'"
      @back="back"
      :tab="selectedTab">
    </equipment>
  </div>
</template>

<script>
import json from "../../text.json";
import Practice from "@/components/Practice.vue";
import NohalAlat from "@/components/NohalAlat.vue";
import NohalAtzmai from "@/components/NohalAtzmai.vue";
import Equipment from "@/components/Equipment.vue";

export default {
  props: ["title"],
  name: "structure",
  components: {
    Practice,
    NohalAlat,
    NohalAtzmai,
    Equipment
  },
  data() {
    return {
      structure: json.structure,
      tabs: json.structureTabs,
      chosen: false,
      selectedTab: null,
      shiningIndex: null
    };
  },
  mounted() {
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);
  },
  methods: {
    back() {
      this.chosen = false;
      this.selectedTab = null;
      this.shiningIndex = null;
    },
    selectTab(tab, index) {
      this.shiningIndex = null;
      this.$nextTick(() => { this.shiningIndex = index; });
      setTimeout(() => {
        this.selectedTab = tab;
        this.chosen = true;
        this.shiningIndex = null;
      }, 420);
    }
  }
};
</script>

<style scoped>
#structure {
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
  gap: 4vh;
  overflow: hidden;
}

.logo {
  height: 8vh;
  width: auto;
  object-fit: contain;
  user-select: none;
}

.title {
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
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 1.2vw;
  width: 80vw;
}

.tab-btn {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #d0e4d8;
  border-radius: 10px;
  padding: 3.5vh 2vw;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.tab-btn:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.09);
  border-color: #3a6b4a;
}

.tab-text {
  font-family: "assistant-bold";
  font-size: 1.3vw;
  color: #1d1d1f;
  user-select: none;
  position: relative;
  z-index: 1;
}

/* SHINE EFFECT */
.tab-btn::after {
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

.tab-btn.shine-animate::after {
  animation: btnShine 0.4s ease-in-out forwards;
  opacity: 1;
}

@keyframes btnShine {
  from { left: -80%; }
  to   { left: 120%; }
}

/* LARGE SCREEN */
@media (min-width: 1600px) {
  .title    { font-size: 3.8vw; }
  .tab-text { font-size: 1.8vw; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  .logo     { height: 4vh; }
  .title    { font-size: 6.5vw; }
  .divider  { width: 15vw; }
  .grid {
    flex-direction: column;
    gap: 2.5vw;
    width: 88vw;
  }
  .tab-btn  { flex: none; width: 100%; padding: 2.5vh 4vw; border-radius: 20px; }
  .tab-text { font-size: 4.2vw; }
}
</style>
