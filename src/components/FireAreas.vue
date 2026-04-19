<template>
  <div id="fire-areas">
    <div class="web-container">
      <img class="wave" id="wave0" src="@/assets/media/wave0.svg" alt="">
      <img class="wave" id="wave1" src="@/assets/media/wave1.svg" alt="">

      <div class="number-container" v-if="!chosen && !table">
        <div
          v-for="(name, index) in fireAreaNames"
          :key="index"
          class="number"
          @click="pickArea(name, $event)"
        >
          {{ name }}
        </div>
      </div>

      <div id="table" @click="showTable" v-if="!chosen && !table">
        <div>שטחי אש לפי סוג האימון</div>
        <img id="arrow" src="@/assets/media/arrow.svg" alt="arrow">
      </div>
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
      table: false
    }
  },
  methods: {
    pickArea(name, event) {
      const el = event.currentTarget;
      el.classList.add('clicked');

      setTimeout(() => {
        this.chosen = true;
        this.chosenNum = Number(name);
        el.classList.remove('clicked');
      }, 150); // match CSS transition
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
  overflow: hidden;
  margin: 0;
  top: 0;
  right: 0;
}

/* ===== NUMBERS ===== */
.number-container {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.number {
  padding: 3vw;
  border: 0.2vh solid #75C2E6;
  border-radius: 50%;
  color: #E8E8E8;
  z-index: 3;
  cursor: pointer;
  margin: 2%;
  background: linear-gradient(180deg, #e8e8e81f, #e8e8e85f);
  position: relative;
  font-size: 3vw;
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: transform 120ms ease, background-color 150ms ease;
  overflow: hidden;
  font-family: "assistant";
  margin-bottom: 10vh;

  /* mobile fixes */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* press effect */
.number:active {
  transform: scale(0.9);
}

/* background fill */
.number::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  border-radius: 2vw;
  background-color: #75C2E6;
  z-index: -1;
  transition: all 150ms;
}

/* ripple effect */
.number::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  right: 50%;
  transition: width 300ms, height 300ms;
}

/* triggered animation */
.number.clicked::before {
  width: 100%;
}

.number.clicked::after {
  width: 200%;
  height: 200%;
}

/* hover (desktop only effect) */
.number:hover {
  color: #1F1E23;
  border-color: transparent;
}

.number:hover::before {
  width: 100%;
}

/* ===== WAVES ===== */
.wave {
  width: 100vw;
  max-height: 100%;
  position: absolute;
  right: 0;
  user-select: none;
  z-index: 0;
  opacity: 0.4;
}

#wave0 {
  top: -20vh;
}

#wave1 {
  top: 30vh;
}

/* ===== TABLE BUTTON ===== */
#table {
  position: absolute;
  top: 90%;
  right: 50%;
  transform: translateX(50%);
  display: flex;
  cursor: pointer;
  font-size: 1.2vw;
  align-items: center;
}

#arrow {
  height: 5vh;
  padding-right: 0.35vw;
  animation: movement 1s alternate-reverse infinite;
}

@keyframes movement {
  from { padding-right: 0.35vw; }
  to { padding-right: 0.85vw; }
}

/* ===== MOBILE ===== */
@media (max-device-width: 600px) {
  .number-container {
    flex-direction: column;
    justify-content: space-around;
    height: 65%;
  }

  .number {
    font-size: 9vw;
    padding: 5vw;
    margin: 1vh;
  }

  .wave {
    width: 500vw;
    right: 0;
  }

  #wave0 {
    top: -50vh;
    right: -40vw;
  }

  #wave1 {
    top: 10vh;
  }

  #table {
    font-size: 4.25vw;
    top: 85%;
  }
}
</style>