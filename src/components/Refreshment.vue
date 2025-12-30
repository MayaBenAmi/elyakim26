<template>
    <div id="refreshment">
        <img src="@/assets/media/back.svg" alt="back" id="back" @click="back"></img>
        <div class="subTitle">{{ title }}</div>
        <div class="txt">
            <div
                v-for="(line, index) in txt"
                :key="index"
                class="txt-line"
            >
                • {{ line }}
            </div>
        </div>
    </div>
</template>

<script>
    import json from "../../text.json";
    export default {
        name: "refreshment", 
        props: ["num"],
        methods: {
            back() {
                this.$emit("back");
            }
        },
        computed: {
            title() {
                return json.refreshing[this.num].title;
            },
            txt() {
                return json.refreshing[this.num].txt;
            }
        }
    }
</script>

<style scoped>
#refreshment {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    top: 0;
    right: 0;
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
    font-size: 2vw;
    text-shadow: 1px 0px 1.5px #000000;
}
.txt {
    margin: auto;
    width: fit-content;
    font-size: 1.5vw;
    border-radius: 2vw;
    margin-top: -2vh;
    border: 0.5vh solid white;
    text-align: start;
    border-top: none;
    padding: 2vw;
    padding-bottom: 2vh;
    padding-top: 5vh;
}
@media (max-device-width: 600px) {
    #back {
    height: 6vh;
    right: 2vw;
    top: 1vh;
    }
    .subTitle {
        font-size: 5vw;
        margin-top: 12vh;
    }
  .txt {
    border-radius: 2.25vh;
    border: 0.5vw solid white;
    border-top: none;
    font-size: 4.5vw;
    margin-top: -1.5vh;
    max-width: 80vw;
    padding: 3vw;
    padding-top: 3vh;
  }
    .txt-line {
        margin-bottom: 1vh; 
}
}
</style>