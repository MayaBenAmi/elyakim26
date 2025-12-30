<template>
    <div id="fire-areas">
        <img class="wave" id="wave0" src="@/assets/media/wave0.svg" alt="">
        <img class="wave" id="wave1" src="@/assets/media/wave1.svg" alt="">
        <div class="number-container" v-if="!chosen">
            <div v-for="(name, index) in fireAreaNames" :key="index" class="number" @click="pickArea(name)">{{ name }}</div>
        </div>
        <fire-area :num="chosenNum" v-if="chosen" @back="back"></fire-area>
    </div>
</template>

<script>
import json from "../../text.json";
import FireArea from "@/components/FireArea";
export default {
    name: "fire-areas",
    components: {
        FireArea
    },
    data() {
        return {
            fireAreaNames: json.fireAreas.map(area => area.num.toString()),
            chosen: false,
            chosenNum:""
        }
    },
    methods: {
        pickArea(name) {
            this.chosen = true;
            this.chosenNum = Number(name);
        },
        back() {
            this.chosen = false;
            this.chosenNum = "";
        }
    }
}
</script>

<style scoped>
#fire-areas {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    top: 0;
    right: 0;
}
.number-container {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
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
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 150ms;
  overflow: hidden;
  font-family: "assistant";
  margin-bottom: 10vh;
}

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
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 150ms
}

.number:hover {
  color: #1F1E23;
  border-color: #00000000;
}

.number:hover::before {
  width: 100%;
}
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
        right: 0vw;
    }
    #wave0 {
        top: -50vh;
        right: -40vw;
    }
    #wave1 {
        top: 10vh;
    }
}
</style>