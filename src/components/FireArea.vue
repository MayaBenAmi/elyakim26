<template>
    <div id="fire-area">
        <img src="@/assets/media/back.svg" alt="back" id="back" @click="back">
        <div class="subTitle">{{ num }}</div>
        <div class="txt">{{ txt }}</div>
    </div>
</template>

<script>
import json from "../../text.json";
export default {
    name: "fire-area",
    props: ["num"],
    data() {
        return {
           
        }
    },
    computed: {
        txt() {
            const area = json.fireAreas.find(a => a.num === this.num);
            return area ? area.txt : "";
        }
    },
    methods: {
        back() {
            this.$emit("back");
        }
    }
}
</script>

<style scoped>
    #fire-areas {
        position: absolute;
        top: 0%;
        right: 0%;
        width: 100%;
        height: 100%;
        margin: 0%;
    }
    #back {
        position: absolute; 
        right: 1vw; 
        top: 2vh; 
        height: 10vh; 
        cursor: pointer;
        z-index: 7;
    }
    .subTitle {
        font-family: "assistant-extraBold";
        margin: auto;
        width: 80vw;
        margin-top: 15vh;
        font-size: 3vw;
        text-shadow: 1px 0px 1.5px #000000;
    }
    .txt {
        margin: auto;
        margin-top: -5vh;
        width: 50vw;
        font-size: 2vw;
        border-radius: 2vw;
        border: 0.5vh solid white;
        border-top: none;
        padding: 2vw;
        padding-bottom: 5vh;
        padding-top: 10vh;
    }
@media (max-device-width: 600px) {
  #back {
    height: 6vh;
    right: 2vw;
    top: 1vh;
  }
  .txt {
    border-radius: 2.25vh;
    border: 0.5vw solid white;
    border-top: none;
    font-size: 5vw;
    margin-top: -2.5vh;
    width: 70vw;
    padding-top: 7vh;
  }
  .subTitle {
    font-size: 7vw;
    margin-top: 12vh;
  }

}

</style>