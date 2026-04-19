<template>
  <div id="fire-table">
    <img src="@/assets/media/back.svg" alt="back" id="back" @click="back">
    <div class="subTitle">שטח אש לפי סוג אימון</div>
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
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
}
#back {
    position: absolute; 
    right: 1vw; 
    top: 2vh; 
    height: 10vh; 
    cursor: pointer;
    z-index: 7;
}
#table-container {
    margin-top: 2vh;
    width: 100%;
    display: flex;
    justify-content: center; /* horizontally center */
    align-items: center;     /* vertically center if container has height */

}
.subTitle {
    font-family: "assistant-extraBold";
    margin: auto;
    width: 80vw;
    margin-top: 15vh;
    font-size: 1.75vw;
    text-shadow: 1px 0px 1.5px #000000;
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
  #table-container {
    margin-top: 1vh;
  }
  .subTitle {
    font-size: 5vw;
    margin-top: 10.5vh;
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
}
</style>