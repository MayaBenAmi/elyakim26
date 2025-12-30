<template>
    <div id="refreshing">
        <div v-if="chosenTitle === ''">
            <img class="wave" id="wave0" src="@/assets/media/wave0.svg" alt="">
            <img class="wave" id="wave1" src="@/assets/media/wave1.svg" alt="">
            <div class="titles-container" v-if="!chosen">
                <div v-for="(title, index) in titles" :key="index" class="title" @click="pickArea(index)">{{ title }}</div>
            </div>
        </div>
        <refreshment v-if="chosenTitle!== ''" :num="chosenTitle" @back="back"></refreshment>
    </div>
</template>

<script>
import json from "../../text.json";
import Refreshment from "@/components/Refreshment";
export default {
    name: "refreshing",
    components: {
        Refreshment
    },
    data() {
        return {
            titles: json.refreshing.map(item => item.title),
            chosen: false,
            chosenTitle:""
        }
    },
    methods: {
        pickArea(index) {
            this.chosenTitle = index;
            this.chosen = true;
        },
        back() {
            this.chosen = false;
            this.chosenTitle = "";
        }
    }
}
</script>

<style scoped>
#refreshing {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    top: 0;
    right: 0;
}
.titles-container {
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
.title {
padding: 0.75vw;
  border: 0.2vh solid #75C2E6;
  border-radius: 1.25vw;
  color: #E8E8E8;
  z-index: 3;
  cursor: pointer;
  margin: 2%;
  background: linear-gradient(180deg, #e8e8e81f, #e8e8e85f);
  position: relative;
  font-size: 2.75vw;
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 150ms;
  overflow: hidden;
  font-family: "assistant";
  margin-bottom: 10vh;
}

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
  -webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27);
  transition: all 150ms
}

.title:hover {
  color: #1F1E23;
  border-color: #00000000;
}

.title:hover::before {
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
    .titles-container {
        flex-direction: column;
        height:40%;
        top: 35%;
        transform: translateY(none);
        justify-content: space-around;

    }
    .title {
        font-size: 5vw;
        border-radius: 1vh;
        padding: 1vh;
          margin-bottom: 0.1vh;
          width: 50vw;
    }
}
</style>