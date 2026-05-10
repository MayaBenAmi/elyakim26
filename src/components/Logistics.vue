<template>
  <div id="logistics">
    <div class="subTitle">{{ title }}</div>
    <div class="divider"></div>
    <div class="blocks-container">
      <div v-for="(subtitle, index) in subtitles" :key="index" class="block-container">
        <div class="title-container" @click="showText(index)">
          <span class="icon">{{ pressedIndex.includes(index) ? '−' : '+' }}</span>
          <div class="subtitle">{{ subtitle }}</div>
        </div>
        <transition name="expand">
          <div v-if="pressedIndex.includes(index)" class="extra-text-container">
            <div v-for="(text, tIndex) in jsonText.logistics[index].txt" :key="tIndex" class="extra-line">
              {{ text }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import jsonText from "../../text.json";

export default {
  props: ["title"],
  name: "logistics",
  data() {
    return {
      subtitles: jsonText.logistics.map(item => item.subTitle),
      pressedIndex: [],
      jsonText
    };
  },
  mounted() {
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);
  },
  methods: {
    showText(index) {
      if (this.pressedIndex.includes(index)) {
        this.pressedIndex = this.pressedIndex.filter(i => i !== index);
      } else {
        this.pressedIndex.push(index);
      }
    }
  }
};
</script>

<style scoped>
#logistics {
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

.blocks-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  direction: rtl;
  gap: 1.2vw;
  width: 75vw;
}

.block-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: calc(33.333% - 0.8vw);
}

.title-container {
  display: flex;
  flex-direction: row;
  direction: rtl;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75vw;
  padding: 1.2vh 1.2vw;
  background: #ffffff;
  border: 1px solid #d0e4d8;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s, border-color 0.2s;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.title-container:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.09);
  border-color: #3a6b4a;
}

.icon {
  font-size: 1.3vw;
  color: #f5f5f7;
  background: #3a6b4a;
  font-family: "assistant-bold";
  flex-shrink: 0;
  line-height: 1;
  user-select: none;
  width: 1.1vw;
  height: 1.1vw;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subtitle {
  font-family: "assistant-bold";
  font-size: 1.1vw;
  color: #1d1d1f;
  text-align: right;
  direction: rtl;
}

/* EXPAND TRANSITION */
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.3s ease, max-height 0.3s ease;
}
.expand-enter,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
.expand-enter-to,
.expand-leave {
  opacity: 1;
  max-height: 500px;
}

.extra-text-container {
  background: #ffffff;
  border: 1px solid #e5e5ea;
  border-radius: 10px;
  margin-top: 0.5vh;
  padding: 1.5vh 1.2vw;
  font-family: "assistant";
  font-size: 1vw;
  color: #3a3a3c;
  direction: rtl;
  text-align: right;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.extra-line {
  margin-bottom: 0.8vh;
  padding-right: 1vw;
  position: relative;
}
.extra-line::before {
  content: "●";
  position: absolute;
  right: 0;
  color: #3a6b4a;
  font-size: 0.55em;
  top: 0.4em;
}

/* MOBILE */
@media (max-device-width: 600px) {
  #logistics       { padding-top: 6vh; }
  .subTitle        { font-size: 5.5vw; }
  .divider         { width: 12vw; }
  .blocks-container { flex-direction: column; align-items: center; gap: 2.5vw; width: 88vw; }
  .block-container { width: 100%; }
  .title-container { padding: 1.5vh 3vw; border-radius: 20px; }
  .title-container:hover, .title-container:active { box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05); border-color: #d0e4d8; }
  .icon            { font-size: 3vw; width: 5.5vw; height: 5.5vw; }
  .subtitle        { font-size: 4.2vw; }
  .extra-text-container { font-size: 3.5vw; padding: 1.5vh 3vw; border-radius: 20px; }
  .extra-line      { padding-right: 3vw; }
}
</style>
