<template>
  <div id="refreshment">
    <button id="back" @click="back">→ חזרה</button>
    <div class="maintitle">{{ maintitle }}</div>
    <div class="subTitle">{{ title }}</div>

    <!-- Render txt only if isTable is false -->
    <div v-if="!isTable" class="txt">
      <div v-for="(line, index) in txt" :key="index" class="txt-line">
       {{ line }}
      </div>
    </div>

    <!-- Render table only if isTable is true -->
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
  methods: {
    back() {
      this.$emit("back");
    },
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
      return Math.max(...this.tableArray.map((col) => col.cells.length));
    },
    maxRowsArray() {
      return Array.from({ length: this.maxRows }, (_, i) => i);
    },
  },
};
</script>

<style scoped>
#refreshment {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  top: 0;
  right: 0;
}
.maintitle {
    font-family: "assistant-extraBold";
    margin: auto;
    width: 80vw;
    margin-top: 5vh;
    font-size: 2.5vw;
    letter-spacing: 0.04em;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

#back {
  position: fixed;
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
  font-family: "assistant-extraBold";
  margin: auto;
  width: 80vw;
  margin-top: 1vh;
  font-size: 1.75vw;
  text-shadow: 1px 0px 1.5px #000000;
}

.txt {
  margin: auto;
  width: fit-content;
  max-width: 85vw;
  font-size: 1.25vw;
  border-radius: 1.5vw;
  margin-top: 1.5vh;
  margin-bottom: 3vh;
  text-align: start;
  padding: 2vw;
  padding-bottom: 2vh;
  padding-top: 5vh;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  border: 0.2vh solid rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  box-sizing: border-box;
  overflow: hidden;
  color: rgba(255,255,255,0.95);
  font-family: "assistant";
  /* line-height: 1.6; */
}

.txt-line {
  margin-bottom: 1.2vh;
  padding-right: 1.5vw;
  position: relative;
  padding-left: 1.5vw;
}

.table-container {
  margin-top: 2vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  .maintitle {
  margin-top: 7vh;
  font-size: 6vw;
}
  .subTitle {
    font-size: 4.75vw;
    margin-top: 0.5vh;
  }
  .txt {
    border-radius: 2.25vh;
    border: 0.2vh solid rgba(255,255,255,0.3);
    font-size: 4.5vw;
    margin-top: 0.75vh;
    max-width: 80vw;
    padding: 3vw;
    padding-top: 3vh;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    line-height: 1.5;
  }
  .txt-line {
    margin-bottom: 1vh;
    padding-right: 2vw;
    padding-left: 2vw;
  }
  .table-container {
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