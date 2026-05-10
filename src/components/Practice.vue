<template>
  <div id="practice" :class="{ scrollable: needsScroll }">
    <button id="back" @click="back">→ חזרה</button>
    <div class="subTitle">{{ tab.title }}</div>
    <div class="divider"></div>

    <button v-if="isAlal" id="extra-toggle" @click="showExtra = !showExtra">
      {{ showExtra ? '▲ הסתר הערות' : '▼ הצג הערות' }}
    </button>

    <transition name="slide">
      <div v-if="isAlal && showExtra" id="extra-container">
        <div class="bullet" v-for="(item, j) in alalExtra" :key="j">{{ item }}</div>
      </div>
    </transition>

    <div id="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="(col, i) in firstHeaders" :key="i">{{ col }}</th>
            <th v-if="!isAlal" :colspan="3">אימון גוף עיקרי- 3 ימים</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowIndex in maxRows" :key="rowIndex">
            <td v-for="(col, colIndex) in sections" :key="colIndex">
              {{ col.cells[rowIndex - 1] || "" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";

export default {
  name: "practice",
  props: ["tab"],
  data() {
    return {
      showExtra: false,
      needsScroll: false
    };
  },
  mounted() {
    this.checkScroll();
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);
  },
  updated() {
    this.$nextTick(this.checkScroll);
  },
  computed: {
    sections() {
      return json[this.tab.key] || [];
    },
    isAlal() {
      return this.tab.key === 'alal';
    },
    firstHeaders() {
      if (this.isAlal) return this.sections.map(s => s.header);
      return this.sections.slice(0, 1).map(s => s.header);
    },
    maxRows() {
      return Math.max(...this.sections.map(s => s.cells.length));
    },
    alalExtra() {
      return json["alalextra"] || [];
    }
  },
  methods: {
    back() {
      this.$emit("back");
    },
    checkScroll() {
      this.needsScroll = this.$el.scrollHeight > window.innerHeight;
    }
  }
};
</script>

<style scoped>
#practice {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10vh;
  /* padding: 10vh 0 6vh; */
  overflow: hidden;
}
#practice.scrollable {
  overflow-y: auto;
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
  margin-bottom: 2vh;
}

#extra-toggle {
  font-family: "assistant-bold";
  font-size: 0.9vw;
  color: #3a6b4a;
  background: transparent;
  border: 1.5px solid #3a6b4a;
  border-radius: 980px;
  padding: 0.5vh 1.5vw;
  cursor: pointer;
  margin-bottom: 1.5vh;
  transition: background 0.2s, color 0.2s;
}
#extra-toggle:hover {
  background: #3a6b4a;
  color: #ffffff;
}

/* NOTES PANEL */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
.slide-enter-to,
.slide-leave {
  opacity: 1;
  transform: translateY(0);
  max-height: 600px;
}

#extra-container {
  width: 60vw;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e5ea;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.08);
  padding: 2.5vh 2.5vw;
  margin-bottom: 2vh;
  text-align: right;
  direction: rtl;
  overflow: hidden;
  box-sizing: border-box;
}

.bullet {
  margin: 0.7vh 0;
  padding-right: 1.2vw;
  font-family: "assistant";
  font-size: 1vw;
  color: #3a3a3c;
  position: relative;
}
.bullet::before {
  content: "●";
  position: absolute;
  right: 0;
  color: #3a6b4a;
  font-size: 0.6vw;
  top: 0.25em;
}

/* TABLE */
#table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 6vh;
}

table {
  border-collapse: collapse;
  width: 75vw;
  table-layout: fixed;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 12px 40px rgba(0,0,0,0.12);
  border: 1px solid #e5e5ea;
}

th {
  background: #f5f5f7;
  border-bottom: 1px solid #f5f5f7;
  border-left: 2px solid #f5f5f7;
  padding: 1.5vh 2%;
  font-family: "assistant-extrabold";
  font-size: 1vw;
  color: #1d1d1f;
  text-align: center;
}
th:last-child {
  border-left: none;
}

tr:nth-child(even) td {
  background-color: #f5f5f7;
}

tr:hover td {
  background-color: #f0f7f3;
}

td {
  direction: rtl;
  text-align: center;
  border-bottom: 1px solid #f5f5f7;
  border-left: 2px solid #f5f5f7;
  padding: 1.2vh 2%;
  white-space: pre-line;
  color: #3a3a3c;
  font-family: "assistant";
  font-size: 1vw;
  transition: background-color 0.2s ease;
}
td:last-child {
  border-left: none;
}

/* MOBILE */
@media (max-device-width: 600px) {
  #practice     { padding-top: 6vh; }
  #back         { font-size: 3vw; padding: 0.6vh 3vw; right: 2vw; top: 2.5vh; background: #3a6b4a; color: #ffffff; transition: none; }
  #back:hover, #back:active { background: #3a6b4a; color: #ffffff; }
  .subTitle     { font-size: 5.5vw; }
  .divider      { width: 12vw; }
  #extra-toggle { font-size: 3.2vw; padding: 0.5vh 4vw; background: #3a6b4a; color: #ffffff; transition: none; }
  #extra-toggle:hover, #extra-toggle:active { background: #3a6b4a; color: #ffffff; }
  #extra-container { width: 88vw; padding: 2vh 4vw; border-radius: 12px; }
  .bullet       { font-size: 3vw; }
  .bullet::before { font-size: 2vw; }
  table         { width: 88vw; border-radius: 12px; }
  th            { font-size: 2.8vw; padding: 1.2vh 1.5%; font-family: "assistant-bold"; border-left-width: 4px; }
  td            { font-size: 2.5vw; padding: 1vh 1.5%; border-left-width: 4px; }
  tr:hover td   { background-color: inherit; }
  tr:nth-child(even):hover td { background-color: #f5f5f7; }
}
</style>
