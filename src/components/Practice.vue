<template>
  <div class="practice">
    <button id="back" @click="back">→ חזרה</button>
    <div class="subtitle">{{tab}}</div>
    <button v-if="isAlal" id="extra-toggle" @click="showExtra = !showExtra">
      {{ showExtra ? '▼ הסתר הערות' : '▲ הצג הערות' }}
    </button>
    <transition name="slide">
      <div v-if="isAlal && showExtra" id="extra-container">
        <div class="bullet" v-for="(item, j) in alalExtra" :key="j">
          {{item}}
        </div>
      </div>
    </transition>
    <div id="table-container" :class="{ 'table-slide': showExtra }">
    <table>
        <thead>
        <tr>
            <th v-for="(col, i) in firstHeaders" :key="i">
            {{ col }}
            </th>

            <th v-if="isAlal" :colspan="3">
            אימון גוף עיקרי- 3 ימים
            </th>
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
      showExtra: false
    };
  },
computed: {
  englishTab() {
    return String(this.tab) === 'אל"ת' ? "alat" : "alal";
  },

  sections() {
    const key = String(this.tab) === 'אל"ת' ? "alat" : "alal";
    return json[key] || [];
  },

  isAlal() {
    return String(this.tab) !== 'אל"ת';
  },

  firstHeaders() {
    if (!this.isAlal) return this.sections.map(s => s.header);
    return this.sections.slice(0, 1).map(s => s.header); 
    // only "אימוני מפקדים"
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
    }
  }
};
</script>

<style scoped>
#practice {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
}
.subtitle {
    font-family: "assistant-extraBold";
    margin: auto;
    width: 80vw;
    margin-top: 0vh;
    font-size: 1.75vw;
    text-shadow: 1px 0px 1.5px #000000;
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
#extra-toggle {
  display: block;
  margin: 1.5vh auto 0.5vh;
  padding: 0.6vh 1.5vw;
  background: linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(59,130,246,0.08) 100%);
  border: 0.15vh solid rgba(96,165,250,0.4);
  border-radius: 1.5vh;
  color: rgba(230,237,243,0.95);
  font-family: "assistant-extraBold";
  font-size: 0.85vw;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}
#extra-toggle:hover {
  background: linear-gradient(135deg, rgba(96,165,250,0.25) 0%, rgba(59,130,246,0.15) 100%);
  border-color: rgba(96,165,250,0.65);
  box-shadow: 0 0 14px rgba(96,165,250,0.25);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s ease-out, opacity 0.35s ease-out, max-height 0.35s ease-out, padding 0.35s ease-out, margin 0.35s ease-out;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
}
.slide-enter-to,
.slide-leave {
  opacity: 1;
  transform: translateY(0);
  max-height: 900px;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  margin-top: 2vh;
}
#table-container {
  transition: transform 0.35s ease-out;
}
.table-slide {
  transform: translateY(20px);
}
#extra-container {
  text-align: right;
  margin: 2vh auto;
  width: 60%;
  padding: 2.5vh 3vw;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  border: 0.2vh solid rgba(255,255,255,0.3);
  border-radius: 1.5vh;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  box-sizing: border-box;
  overflow: hidden;
  max-height: 900px;
}


.bullet {
  margin: 0.8vh 0;
  padding-right: 1.5vw;
  font-family: "assistant";
  font-size: 1.1vw;
  color: rgba(255,255,255,0.95);
  position: relative;
  padding-left: 1.5vw;
}
.bullet::before {
  content: "●";
  position: absolute;
  right: 0;
  color: rgba(255,255,255,0.7);
}
#table-container {
    margin-top: 2vh;
    width: 100%;
    display: flex;
    justify-content: center; /* horizontally center */
    align-items: center;     /* vertically center if container has height */

}
table {
    border-collapse: collapse;
    width: 60%;
    table-layout: fixed;
    margin-bottom: 5vh;
    background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
    border: 0.15vh solid rgba(255,255,255,0.2);
    border-radius: 1vh;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
th {
    background: linear-gradient(135deg, rgba(96,165,250,0.3) 0%, rgba(59,130,246,0.2) 100%);
    border: 0.15vh solid rgba(96,165,250,0.4);
    padding: 1.5vh 1%;
    font-weight: bold;
    color: rgba(255,255,255,0.95);
    font-family: "assistant-extraBold";
    font-size: 1vw;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
tr:nth-child(even) {
    background-color: rgba(255,255,255,0.03);
}
tr:hover {
    background-color: rgba(96,165,250,0.1);
    transition: background-color 0.2s ease;
}
td {
    direction: rtl;
    text-align: right;
    border: 0.15vh solid rgba(255,255,255,0.15);
    padding: 1.2vh 1%;
    white-space: pre-line;
    color: rgba(255,255,255,0.9);
    transition: all 0.2s ease;
    font-size: 1.1vw;
}
@media (max-device-width: 600px) {
  #back {
    font-size: 3vw;
    padding: 0.6vh 3vw;
  }
  .subtitle {
    font-size: 5vw;
    margin-top: 0vh;
  }
  #extra-toggle {
    font-size: 3vw;
    padding: 0.4vh 2vw;
    margin: 1.5vh auto 0.5vh;
  }
  #extra-container {
    width: 70vw !important;
    padding: 2vh 3vw !important;
    margin: 1vh auto !important;
    border-radius: 0.5vh !important;
  }
  .bullet {
    font-size: 2.2vw !important;
    margin: 0.5vh 0 !important;
  }
#table-container {
  margin-top: 0.75vh;
}

    table {
        width: 70vw;
        border-radius: 0.5vh;
        box-sizing: border-box;
    }
    th {
        border: 0.15vh solid rgba(150,180,255,0.4);
        font-size: 2.5vw;
        padding: 1vh 0.5%;
    }
    td {
        border: 0.15vh solid rgba(255,255,255,0.15);
        font-size: 2.2vw;
        padding: 0.8vh 0.5%;
    }
}
</style>