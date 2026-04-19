<template>
  <div id="shooting-range">
    <div class="title">{{ title }}</div>
    <div id="text-border">
        <div
        v-for="(item, index) in shootingRange"
        :key="index"
        class="txt"
        >
        {{ item }}
        </div>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";

export default {
  props: ["title"],
  name: "shooting-range",
  data() {
    return {
      shootingRange: json["shooting-range"]
    };
  }
};
</script>


<style scoped>
#shooting-range {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
#text-border {
  width: max-content;
  padding: 2% 6%;
  padding-top: 2%;
  margin: auto;
  margin-top: 3vh;
  border-radius: 2.25vh;
  background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
  border: 0.15vh solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  font-size: 2vw;
  text-align: start;
}
.txt {
    margin-bottom: 1.2vh;
    padding-right: 1.5vw;
    position: relative;
    padding-left: 1.5vw;
    color: rgba(255,255,255,0.9);
    transition: all 0.2s ease;
}
.txt::before {
    content: "●";
    position: absolute;
    right: 0;
    color: rgba(255,255,255,0.7);
    font-size: 0.8em;
}
@media (max-device-width: 600px)  {
  #text-border {
    border-radius: 1.25vh;
    border: 0.15vh solid rgba(255,255,255,0.2);
    font-size: 4.25vw;
    padding: 6% 10%;
    padding-top: 2%;
  }
  .title {
    margin-top: 7vh;
    font-size: 6vw;
  }
  .txt {
    margin-bottom: 1vh;
    padding-right: 2vw;
    padding-left: 2vw;
    font-size: 2.2vw;
  }
}
</style>