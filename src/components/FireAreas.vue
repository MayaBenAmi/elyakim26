<template>
  <div id="fire-areas">
    <div class="web-container" v-if="!chosen && !table">
      <img class="logo" src="@/assets/media/logo.png" alt="לוגו">
      <div class="title">{{ title }}</div>
      <div class="divider"></div>
      <div class="number-container">
        <button
          v-for="(name, index) in fireAreaNames"
          :key="index"
          class="number"
          :class="{ 'shine-animate': shiningIndex === index }"
          @click="pickArea(name, index)"
        >
          <span class="number-text">{{ name }}</span>
        </button>
      </div>

      <button class="table-btn" @click="showTable">
        <span class="btn-text">שטחי אש לפי סוג האימון</span>
        <span class="arrow">←</span>
      </button>
    </div>

    <fire-area :num="chosenNum" v-if="chosen" @back="back"></fire-area>
    <fire-table v-if="table" @back="back"></fire-table>
  </div>
</template>

<script>
import json from "../../text.json";
import FireArea from "@/components/FireArea";
import FireTable from "@/components/FireTable.vue";

export default {
  props: ["title"],
  name: "fire-areas",
  components: {
    FireArea,
    FireTable
  },
  data() {
    return {
      fireAreaNames: json.fireAreas.map(area => area.num.toString()),
      chosen: false,
      chosenNum: "",
      table: false,
      shiningIndex: null
    }
  },
  methods: {
    pickArea(name, index) {
      this.shiningIndex = null;
      this.$nextTick(() => { this.shiningIndex = index; });
      setTimeout(() => {
        this.chosen = true;
        this.chosenNum = Number(name);
        this.shiningIndex = null;
      }, 420);
    },
    back() {
      this.chosen = false;
      this.chosenNum = "";
      this.table = false;
    },
    showTable () {
      this.table = true;
    }
  }
}
</script>

<style scoped>
#fire-areas {
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

.title {
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

/* ===== NUMBERS ===== */
.number-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2vw;
  width: 80vw;
}

.number {
  flex: 0 0 calc(25% - 0.9vw);
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #d0e4d8;
  border-radius: 16px;
  padding: 3.5vh 2vw;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.number:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.09);
  border-color: #3a6b4a;
}

.number-text {
  font-family: "assistant-bold";
  font-size: 1.3vw;
  color: #1d1d1f;
  user-select: none;
  position: relative;
  z-index: 1;
}

/* SHINE EFFECT */
.number::after {
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

.number.shine-animate::after {
  animation: btnShine 0.4s ease-in-out forwards;
  opacity: 1;
}

@keyframes btnShine {
  from { left: -80%; }
  to   { left: 120%; }
}

/* ===== TABLE BUTTON ===== */
.table-btn {
  font-family: "assistant-bold";
  font-size: 1vw;
  color: #3a6b4a;
  background: transparent;
  border: 1.5px solid #3a6b4a;
  border-radius: 980px;
  padding: 0.9vh 2.5vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5vw;
  transition: background 0.2s, color 0.2s;
}

.table-btn:hover {
  background: #3a6b4a;
  color: #ffffff;
}

.arrow {
  font-size: 1vw;
  line-height: 1;
  transition: transform 0.2s ease;
}

.table-btn:hover .arrow {
  transform: translateX(-0.3vw);
}

/* LARGE SCREEN */
@media (min-width: 1600px) {
  .title        { font-size: 3.8vw; }
  .number-text  { font-size: 1.8vw; }
  .table-btn    { font-size: 1.5vw; }
  .arrow        { font-size: 1.4vw; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  .logo         { height: 4vh; }
  .title        { font-size: 6.5vw; }
  .divider      { width: 15vw; }

  .number-container {
    flex-direction: column;
    gap: 2.5vw;
    width: 88vw;
  }

  .number       { flex: none; width: 100%; padding: 2.5vh 4vw; border-radius: 20px; }
  .number-text  { font-size: 4.2vw; }

  .table-btn    { font-size: 4.5vw; padding: 1.2vh 10vw; }
  .arrow        { font-size: 4vw; }
}
</style>