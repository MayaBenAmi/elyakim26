<template>
  <div id="structure">
    <div id="table-container">
        <table>
        <thead>
            <tr>
            <th v-for="(col, index) in structure" :key="index">{{ col.header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="rowIndex in maxRows" :key="rowIndex">
            <td v-for="(col, colIndex) in structure" :key="colIndex">
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
  name: "structure",
  data() {
    return {
      structure: json.structure
    };
  },
  computed: {
    // Find the max number of rows to display (based on the longest cells array)
    maxRows() {
      return Math.max(...this.structure.map(col => col.cells.length));
    }
  }
};
</script>



<style scoped>
#structure {
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