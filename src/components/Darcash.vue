<template>
  <div id="darcash">
    <div class="title">{{ title }}</div>
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
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
}
.title {
    font-family: "assistant-extraBold";
    margin: auto;
    width: 80vw;
    margin-top: 5vh;
    font-size: 2.5vw;
    text-shadow: 1px 0px 3px #000000;
}

#table-container {
    margin-top: 3vh;
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
    background: linear-gradient(135deg, rgba(100,150,255,0.25) 0%, rgba(70,120,200,0.2) 100%);
    border: 0.15vh solid rgba(150,180,255,0.4);
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
    background-color: rgba(100,150,255,0.1);
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
.phone-cell {
    text-align: left;
    width: max-content;
    white-space: nowrap;
}
@media (max-device-width: 600px) {
    .title {
        margin-top: 7vh;
        font-size: 6vw;
    }
    #table-container {
        margin-top: 1.5vh;
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
