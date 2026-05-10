<template>
  <div id="nohal-alat">
    <button id="back" @click="back">→ חזרה</button>

    <div class="page-title">נוהל תיאום אל"ת</div>
    <div class="divider"></div>

    <div class="charts-wrapper">
      <div class="chart-section" v-for="(chart, ci) in charts" :key="ci">
        <div class="chart-label">{{ ci + 1 }}</div>
        <div class="chart-flow">
          <template v-for="(step, si) in chart.flowchart">
            <div class="box" :key="'box-' + si">
              <div class="box-main">{{ step }}</div>
              <div class="box-divider"></div>
              <div class="box-extra">{{ chart.extra[si] }}</div>
            </div>
            <div class="arrow" v-if="si < chart.flowchart.length - 1" :key="'arr-' + si">
              <svg width="20" height="12" viewBox="0 0 28 16" fill="none">
                <path d="M28 8H4M4 8L11 2M4 8L11 14" stroke="#3a6b4a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";
export default {
  name: "nohal-alat",
  props: ["tab"],
  data() {
    return {
      charts: json["nohal-alat"]
    };
  },
  methods: {
    back() {
      this.$emit("back");
    }
  }
};
</script>

<style scoped>
#nohal-alat {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

.page-title {
  font-family: "assistant-extrabold";
  font-size: 2vw;
  color: #1d1d1f;
  margin-bottom: 0;
  letter-spacing: -0.02em;
  direction: rtl;
}

.divider {
  width: 3vw;
  height: 2px;
  background: #d2d2d7;
  border-radius: 2px;
  margin-top: 1vh;
  margin-bottom: 2vh;
}
.charts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3.5vh;
  width: fit-content;
}

.chart-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5vw;
}

.chart-label {
  display: none;
}

.chart-flow {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.5vw;
  flex: 1;
  padding: 0.5vh 0;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2.4vh 1vw;
  width: 13vw;
  flex-shrink: 0;
  direction: rtl;
  text-align: center;
  gap: 0.5vh;
  user-select: none;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.box:hover {
  border-color: #c0c0c0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.box-main {
  font-family: "assistant-bold";
  font-size: 1.35vw;
  color: #1d1d1f;
  line-height: 1.35;
}

.box-divider {
  width: 100%;
  height: 1px;
  background: #e0e0e0;
  margin: 0.2vh 0;
}

.box-extra {
  font-family: "assistant-bold";
  font-size: 1vw;
  color: #888888;
  line-height: 1.3;
}

.arrow {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0.7;
}

/* LARGE SCREEN */
@media (min-width: 1600px) {
  .page-title  { font-size: 3vw; }
  .chart-label { font-size: 2.2vw; }
  .box-main    { font-size: 1.4vw; }
  .box-extra   { font-size: 1vw; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  #nohal-alat {
    justify-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10vh 0 6vh;
  }
  #back         { font-size: 3vw; padding: 0.6vh 3vw; right: 2vw; top: 2.5vh; background: #3a6b4a; color: #ffffff; transition: none; }
  #back:hover, #back:active { background: #3a6b4a; color: #ffffff; }

  .page-title {
    font-size: 6vw;
    margin-bottom: 0;
  }
  .divider {
    display: block;
    width: 12vw;
    margin-top: 1.5vh;
    margin-bottom: 3vh;
  }

  .charts-wrapper {
    flex-direction: column;
    width: 96vw;
    gap: 1.5vh;
    align-items: stretch;
  }

  /* each flowchart: number on top, boxes stacked below */
  .chart-section {
    flex-direction: column;
    align-items: center;
    gap: 0;
    background: #ffffff;
    border: 2.5px solid #e0e0e0;
    border-radius: 18px;
    padding: 1.5vh 4vw;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
  }

  .chart-label {
    display: block;
    font-family: "assistant-extrabold";
    font-size: 5vw;
    color: #3a6b4a;
    text-align: center;
    margin-bottom: 1vh;
  }

  /* boxes stack vertically */
  .chart-flow {
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    padding: 0;
  }

  .box {
    width: 100%;
    max-width: 100%;
    min-width: unset;
    padding: 1vh 4vw;
    border-radius: 12px;
    gap: 0.15vh;
  }
  .box { border: 2.5px solid #e0e0e0; }
  .box-divider { display: none; }
  .box:hover, .box:active { border-color: #e0e0e0; box-shadow: none; }

  .box-main  { font-size: 4vw; }
  .box-extra { font-size: 3vw; }

  /* rotate arrow to point downward */
  .arrow {
    transform: rotate(-90deg);
    margin: 0.3vh 0;
    opacity: 1;
  }
  .arrow svg { width: 28px; height: 28px; }
  .arrow svg path { stroke-width: 2.5; }
}
</style>
