<template>
  <div id="fire-table">
    <button id="back" @click="back">→ חזרה</button>
    <div class="subTitle">שטח אש לפי סוג אימון</div>
    <div class="divider"></div>
    <div id="table-container">
    <table>
      <thead>
        <tr>
          <th>סוג אימון</th>
          <th>שטח אש פוטנציאלי</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in titles" :key="index">
          <td>{{ item.subTitle }}</td>
          <td>{{ item.txt }}</td>
        </tr>
      </tbody>
    </table>
    </div>

  </div>
</template>

<script>
import json from "../../text.json";

export default {
  name: "fire-table",
  data() {
    return {
      titles: json["fire-type"]
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
#fire-table {
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

#table-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  width: 55vw;
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
  text-align: right;
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

@media (max-device-width: 600px) {
  #back {
    font-size: 3vw;
    padding: 0.6vh 3vw;
    right: 2vw;
    top: 1.5vh;
  }
  #fire-table { padding-top: 6vh; }
  .subTitle { font-size: 5.5vw; }
  .divider  { width: 12vw; }
  table     { width: 88vw; }
  th        { font-size: 2.8vw; padding: 1.2vh 1.5%; }
  td        { font-size: 2.5vw; padding: 1vh 1.5%; }
}
</style>