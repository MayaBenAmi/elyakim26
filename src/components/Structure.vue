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
text-shadow: 1px 0px 3px #000000;
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
  border: 0.15vh solid rgba(117,194,230,0.6);
  border-radius: 1vh;
  color: rgba(232,232,232,0.95);
  width: 12vw;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(117,194,230,0.15) 0%, rgba(70,120,200,0.1) 100%);
  position: relative;
  font-size: 2.25vw;
  box-shadow: 0 4px 15px rgba(0,0,0,0.25);
  transition: transform 120ms ease, background-color 150ms ease, box-shadow 150ms ease;
  overflow: hidden;
  font-family: "assistant";
  text-align: center;
  backdrop-filter: blur(5px);

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
  border-radius: 0.8vh;
  background: linear-gradient(135deg, rgba(117,194,230,0.4) 0%, rgba(100,150,255,0.3) 100%);
  z-index: -1;
  transition: all 150ms;
}

.tab.clicked::before {
  width: 100%;
}

/* hover */
.tab:hover {
  color: #FFFFFF;
  border-color: rgba(117,194,230,0.9);
  box-shadow: 0 6px 20px rgba(117,194,230,0.3);
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