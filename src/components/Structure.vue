<template>
  <div id="structure">
    <div class="web-container" v-if="!chosen">
      <div class="titles-container">
        <div 
          v-for="(tab ,index) in tabs" 
          :key="index" 
          class="tab"
          @click="selectTab(tab, $event)"
        >
          {{ tab }}
        </div>
      </div>
    </div>

    <practice 
      v-if="chosen" 
      @back="back" 
      :tab="selectedTab">
    </practice>
  </div>
</template>

<script>
import json from "../../text.json";
import Practice from "@/components/Practice.vue";

export default {
  name: "structure",
  components: {
    Practice
  },
  data() {
    return {
      structure: json.structure,
      tabs: json.structureTabs,
      chosen: false,
      selectedTab: null
    };
  },
  methods: {
    back() {
      this.chosen = false;
      this.selectedTab = null;
    },
    selectTab(tab, event) {
      const el = event.currentTarget;
      el.classList.add('clicked');

      setTimeout(() => {
        this.selectedTab = tab;
        this.chosen = true;
        el.classList.remove('clicked');
      }, 150);
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
  overflow: hidden;
  margin: 0;
  top: 0;
  right: 0;
}

/* ===== LAYOUT ===== */
.titles-container {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3vw;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* ===== TAB (copied from .title) ===== */
.tab {
  padding: 0.75vw;
  border: 0.2vh solid #75C2E6;
  border-radius: 1.25vw;
  color: #E8E8E8;
  width: 12vw;
  cursor: pointer;
  background: linear-gradient(180deg, #e8e8e81f, #e8e8e85f);
  position: relative;
  font-size: 2.25vw;
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: transform 120ms ease, background-color 150ms ease;
  overflow: hidden;
  font-family: "assistant";
  text-align: center;

  /* mobile fixes */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* press effect */
.tab:active {
  transform: scale(0.92);
}

/* background fill animation */
.tab::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  border-radius: 1vw;
  background-color: #75C2E6;
  z-index: -1;
  transition: all 150ms;
}

.tab.clicked::before {
  width: 100%;
}

/* hover */
.tab:hover {
  color: #1F1E23;
  border-color: transparent;
}

.tab:hover::before {
  width: 100%;
}

/* ===== MOBILE ===== */
@media (max-device-width: 600px) {
  .titles-container {
    flex-direction: column;
    gap: 2vh;
  }

  .tab {
    font-size: 5vw;
    border-radius: 1vh;
    padding: 1vh;
    width: 50vw;
  }
}
</style>