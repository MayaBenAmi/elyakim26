<template>
  <div class="practice">
    <img src="@/assets/media/back.svg" alt="back" id="back" @click="back" />
    <div class="subtitle">{{tab}}</div>
    <div v-if="isAlal" id="extra-container">
      <div class="bullet" v-for="(item, j) in alalExtra" :key="j">
        {{item}}
      </div>
    </div>
    <div id="table-container">
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
    margin-top: 14vh;
    font-size: 1.75vw;
    text-shadow: 1px 0px 1.5px #000000;
}
#back {
    position: absolute; 
    right: 1vw; 
    top: 2vh; 
    height: 10vh; 
    cursor: pointer;
    z-index: 7;
}
#extra-container {
  text-align: right;
  margin: auto;
  width: fit-content;
  padding: 2%;
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
    width: 60%; /* table only takes as much space as needed */
    table-layout: fixed;
    margin-bottom: 5vh;
}
th {
    border: 0.25vh solid white;
}
td {
    direction: rtl;
    text-align: right;
    border: 0.25vh solid white;
    padding: 1%;
    white-space: pre-line;
}
@media (max-device-width: 600px) {
  #back {
    height: 6vh;
    right: 2vw;
    top: 1vh;
  }
  .subtitle {
    font-size: 5vw;
    margin-top: 10.5vh;
  }
#table-container {
  margin-top: 0.75vh;
}

    table {
        width: 90%;
    }
    th {
        border: 0.25vw solid white;
        font-size: 1.25vh;
    }
    td {
        border: 0.25vw solid white;
        font-size: 1.25vh;
    }
    /* #table-container {
        margin-top: 10vh;
    } */
}
</style>