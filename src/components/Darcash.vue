<template>
  <div id="darcash">
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
#table-container {
    margin-top: 3vh;
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
}
.phone-cell {
    text-align: left;
    width: max-content;
    white-space: nowrap;
}
@media (max-device-width: 600px) {
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
}
</style>
