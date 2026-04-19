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