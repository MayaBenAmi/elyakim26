<template>
  <div id="refreshment">
    <button id="back" @click="back">→ חזרה</button>
    <div class="subTitle">{{ title }}</div>
    <div class="divider"></div>

    <div v-if="!isTable" class="txt">
      <div v-for="(line, index) in txt" :key="index" class="txt-line" v-html="linkifyPhones(line)"></div>
    </div>

    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="(col, index) in tableArray" :key="index">{{ col.header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rowIndex in maxRowsArray" :key="rowIndex">
            <td v-for="col in tableArray" :key="col.header">
              {{ col.cells[rowIndex] || "" }}
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
  name: "refreshment",
  props: ["num", "maintitle"],
  mounted() {
    this.$el.scrollTop = 0;
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);
  },
  methods: {
    back() {
      this.$emit("back");
    },
    linkifyPhones(text) {
      return text.replace(/(0\d{2}-\d{7})/g, '<a href="tel:$1" class="phone-link">$1</a>');
    }
  },
  computed: {
    dataItem() {
      return json.refreshing[this.num];
    },
    title() {
      return this.dataItem.title;
    },
    txt() {
      return this.dataItem.txt;
    },
    isTable() {
      return this.dataItem.isTable;
    },
    tableArray() {
      return this.dataItem.tableArray;
    },
    maxRows() {
      if (!this.isTable) return 0;
      return Math.max(...this.tableArray.map(col => col.cells.length));
    },
    maxRowsArray() {
      return Array.from({ length: this.maxRows }, (_, i) => i);
    }
  }
};
</script>

<style scoped>
#refreshment {
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

/* TEXT CARD */
.txt {
  width: 80vw;
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
}

.phone-link {
  color: #3a6b4a;
  text-decoration: underline;
  font-family: inherit;
}

/* TABLE */
.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 5vh;
}

table {
  border-collapse: collapse;
  width: 60vw;
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
  #refreshment  { padding-top: 6vh; }
  #back {
  font-size: 3vw;
  padding: 0.6vh 3vw;
  right: 2vw;
  top: 2.5vh;
  background: #3a6b4a;
  color: #ffffff;
  transition: none;
}
#back:hover, #back:active {
  background: #3a6b4a;
  color: #ffffff;
}
  
  .subTitle     { font-size: 5.5vw; }
  .divider      { width: 12vw; }
  .txt          { width: 88vw; font-size: 3.5vw; padding: 2.5vh 4vw; border-radius: 12px; line-height: 1.6; }
  table         { width: 88vw; border-radius: 12px; }
  th            { font-size: 3.5vw; padding: 1.2vh 1.5%; font-family: "assistant-bold"; }
  td            { font-size: 3.5vw; padding: 1vh 1.5%; }
  tr:hover td   { background-color: inherit; }
  tr:nth-child(even):hover td { background-color: #f5f5f7; }
}
</style>
