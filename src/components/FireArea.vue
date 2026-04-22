<template>
    <div id="fire-area">
        <button id="back" @click="back">→ חזרה</button>
        <div class="subTitle">{{ num }}</div>
        <div class="divider"></div>
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
#fire-area {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10vh 0 4vh;
}

#back {
  position: absolute;
  right: 1.5vw;
  top: 2.5vh;
  z-index: 7;
  font-family: "assistant-bold";
  font-size: 1vw;
  color: #3a6b4a;
  background: transparent;
  border: 1.5px solid #3a6b4a;
  border-radius: 980px;
  padding: 0.7vh 1.5vw;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
#back:hover {
  background: #3a6b4a;
  color: #ffffff;
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
  font-size: 1.65vw;
  color: #3a3a3c;
  line-height: 1.8;
  white-space: pre-line;
  direction: rtl;
  text-align: right;
}

@media (max-device-width: 600px) {
  #fire-area { padding-top: 6vh; }
  #back {
    font-size: 3vw;
    padding: 0.6vh 3vw;
    right: 2vw;
    top: 1.5vh;
  }
  .subTitle { font-size: 5.5vw; }
  .divider  { width: 12vw; }
  .txt {
    width: 88vw;
    font-size: 3.2vw;
    padding: 2.5vh 4vw;
    border-radius: 20px;
  }
}
</style>