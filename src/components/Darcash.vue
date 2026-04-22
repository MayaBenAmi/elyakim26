<template>
  <div id="darcash">
    <div class="title">{{ title }}</div>
    <div class="divider"></div>
    <div id="table-container">
        <table>
        <thead>
            <tr>
            <th v-for="(title, i) in darcashTitles" :key="i">
                {{ title }}
            </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(row, i) in darcash" :key="i">
            <td>{{ row.name }}</td>
            <td>{{ row.position }}</td>
            <td class="phone-cell">{{ row.phone }}</td>
            </tr>
        </tbody>
        </table>
    </div>

  </div>
</template>

<script>
import json from "../../text.json";

export default {
    props: ["title"],
  name: "darcash",
  data() {
    return {
      darcash: json.darcash || [],
      darcashTitles: json["tableHeaders"] || []
    };
  }
};
</script>

<style scoped>
#darcash {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10vh;
}

.title {
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
  width: 60vw;
  table-layout: fixed;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 12px 40px rgba(0,0,0,0.12);
  border: 1px solid #e5e5ea;
  margin-bottom: 5vh;
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

.phone-cell {
  text-align: left;
  white-space: nowrap;
}

@media (max-device-width: 600px) {
  #darcash      { padding-top: 6vh; }
  .title        { font-size: 5.5vw; }
  .divider      { width: 12vw; }
  table         { width: 88vw; border-radius: 12px; }
  th            { font-size: 2.8vw; padding: 1.2vh 1.5%; }
  td            { font-size: 2.5vw; padding: 1vh 1.5%; }
}
</style>
