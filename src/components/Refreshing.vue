<template>
  <div id="refreshing">
    <div class="web-container">
      <div v-if="chosenTitle === ''">
      <img class="wave" id="wave0" src="@/assets/media/wave0.svg" alt="">
      <img class="wave" id="wave1" src="@/assets/media/wave1.svg" alt="">

      <div class="titles-container" v-if="!chosen">
        <div class="row" v-for="(rowTitles, rowIndex) in titleRows" :key="rowIndex">
          <div
            v-for="(title, index) in rowTitles"
            :key="index"
            class="title"
            @click="pickArea(rowIndex * rowLength + index, $event)"
          >
            {{ title }}
          </div>
        </div>
      </div>
    </div>
    </div>


    <refreshment v-if="chosenTitle !== ''" :num="chosenTitle" @back="back"></refreshment>
  </div>
</template>

<script>
import json from "../../text.json";
import Refreshment from "@/components/Refreshment";

export default {
  name: "refreshing",
  components: { Refreshment },

  data() {
    return {
      titles: json.refreshing.map(item => item.title),
      chosen: false,
      chosenTitle: "",
      isMobile: false
    };
  },

  computed: {
    // 2 columns on mobile (your current behavior), 3 columns on desktop
    rowLength() {
      return this.isMobile
        ? Math.ceil(this.titles.length / 2)
        : 3;
    },

    titleRows() {
      const rows = [];

      for (let i = 0; i < this.titles.length; i += this.rowLength) {
        rows.push(this.titles.slice(i, i + this.rowLength));
      }

      return rows;
    }
  },

  methods: {
    pickArea(index, event) {
      const el = event.currentTarget;
      el.classList.add("clicked");

      setTimeout(() => {
        this.chosenTitle = index;
        this.chosen = true;
        el.classList.remove("clicked");
      }, 150);
    },

    back() {
      this.chosen = false;
      this.chosenTitle = "";
    },

    checkScreen() {
      this.isMobile = window.matchMedia("(max-width: 600px)").matches;
    }
  },

  mounted() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreen);
  }
};
</script>

<style scoped>
#refreshing {
  position: absolute;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  top: 0;
  right: 0;
}
.web-container {
  width: 100vw;
  height: 100vh;
  margin: 0%;
  padding: 0%;
  position: absolute;
  top: 0px;
  right: 0px;
  overflow-y: hidden;
  overflow-x: hidden;
}

/* ===== LAYOUT ===== */
.titles-container {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 80%;
}

/* ===== TITLE ===== */
.title {
  padding: 0.75vw;
  border: 0.2vh solid #75C2E6;
  border-radius: 1.25vw;
  color: #E8E8E8;
  width: 15vw;
  cursor: pointer;
  background: linear-gradient(180deg, #e8e8e81f, #e8e8e85f);
  position: relative;
  font-size: 2.25vw;
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: transform 120ms ease, background-color 150ms ease;
  overflow: hidden;
  font-family: "assistant";
  margin-bottom: 2vh;
  margin-top: 2vh;

  /* mobile fixes */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* press effect */
.title:active {
  transform: scale(0.92);
}

/* background fill animation */
.title::before {
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

.title.clicked::before {
  width: 100%;
}

/* desktop hover */
.title:hover {
  color: #1F1E23;
  border-color: transparent;
}

.title:hover::before {
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

/* ===== MOBILE ===== */
@media (max-device-width: 600px) {
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

  .titles-container {
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    height: 60%;
    justify-content: space-around;
  }

  .row {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 5vw;
    border-radius: 1vh;
    padding: 1vh;
    width: 50vw;
    margin: 2%;
  }
}
</style>