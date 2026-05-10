<template>
  <div id="shooting-range">
    <div class="subTitle">{{ title }}</div>
    <div class="divider"></div>
    <div class="txt">
      <div v-for="(item, index) in shootingRange" :key="index" class="txt-line">
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
  },
  mounted() {
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
#shooting-range {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10vh 0 6vh;
}

.subTitle {
  font-family: "assistant-extrabold";
  font-size: 2.25vw;
  color: #1d1d1f;
  letter-spacing: -0.02em;
  margin-bottom: 1vh;
}

.divider {
  width: 3vw;
  height: 2px;
  background: #d2d2d7;
  border-radius: 2px;
  margin-bottom: 3vh;
}

.txt {
  width: 55vw;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e5ea;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.08);
  padding: 3vh 2.5vw;
  font-family: "assistant";
  font-size: 1.1vw;
  color: #3a3a3c;
  line-height: 1.8;
  direction: rtl;
  text-align: right;
  box-sizing: border-box;
}

.txt-line {
  margin-bottom: 1vh;
  padding-right: 1.2vw;
  position: relative;
}
.txt-line::before {
  content: "●";
  position: absolute;
  right: 0;
  color: #3a6b4a;
  font-size: 0.6em;
  top: 0.35em;
}

@media (max-device-width: 600px) {
  #shooting-range { padding-top: 6vh; }
  .subTitle  { font-size: 5.5vw; }
  .divider   { width: 12vw; }
  .txt       { width: 88vw; font-size: 3.2vw; padding: 2.5vh 4vw; border-radius: 12px; line-height: 1.6; }
  .txt-line  { padding-right: 3vw; }
}
</style>
