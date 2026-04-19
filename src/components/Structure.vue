<template>
  <div id="structure">
     <div class="title">{{ title }}</div>
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

    <transition name="slide-up">
      <practice 
        v-if="chosen" 
        @back="back" 
        :tab="selectedTab">
      </practice>
    </transition>
  </div>
</template>

<script>
import json from "../../text.json";
import Practice from "@/components/Practice.vue";

export default {
  props: ["title"],
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
      this.$emit("show-arrow");
    },
    selectTab(tab, event) {
      const el = event.currentTarget;
      el.classList.add('clicked');
      this.$emit("hide-arrow");

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
/* ===== TRANSITIONS ===== */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

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
.title {
    font-family: "assistant-extraBold";
margin: auto;
width: 80vw;
margin-top: 5vh;
font-size: 2.5vw;
letter-spacing: 0.04em;
text-shadow: 0 2px 8px rgba(0,0,0,0.5);
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
  padding: 1vh 1.5vw;
  border: 0.15vh solid rgba(96,165,250,0.45);
  border-radius: 1.5vh;
  color: #E6EDF3;
  width: 12vw;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);
  position: relative;
  font-size: 2.25vw;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  transition: transform 120ms ease, box-shadow 200ms ease;
  overflow: hidden;
  font-family: "assistant";
  text-align: center;
  backdrop-filter: blur(10px);

  /* mobile fixes */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* press effect */
.tab:active {
  transform: scale(0.95);
}

/* background fill animation */
.tab::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  border-radius: 1.2vh;
  background: linear-gradient(135deg, #60A5FA, #3B82F6);
  z-index: -1;
  transition: all 150ms;
}

.tab.clicked::before {
  width: 100%;
}

/* hover */
.tab:hover {
  color: #0a0f1e;
  border-color: transparent;
  box-shadow: 0 6px 24px rgba(0,0,0,0.3), 0 0 18px rgba(96,165,250,0.3);
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
  .title {
  margin-top: 7vh;
  font-size: 6vw;
}

  .tab {
    font-size: 4vw;
    border-radius: 0.8vh;
    padding: 1.2vh 2vw;
    width: 60vw;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  .tab:hover {
    box-shadow: 0 4px 15px rgba(117,194,230,0.25);
  }
}
</style>