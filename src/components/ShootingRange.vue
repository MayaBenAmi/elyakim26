<template>
  <div id="shooting-range">
    <div id="text-border">
        <div
        v-for="(item, index) in shootingRange"
        :key="index"
        class="txt"
        >
        • {{ item }}
        </div>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";

export default {
  name: "shooting-range",
  data() {
    return {
      shootingRange: json["shooting-range"]
    };
  }
};
</script>


<style scoped>
#shooting-range {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  top: 0;
  right: 0;
}
#text-border {
  width: max-content;
  padding: 2% 6%;
  padding-top: 0%;
  margin: auto;
  border-radius: 2vw;
  border: 0.5vh solid white;
  border-top: none;
  margin-top: 15vh;
  font-size: 2vw;
  text-align: start;
}
@media (max-device-width: 600px)  {
  #text-border {
    border-radius: 2.25vh;
    border: 0.5vw solid white;
    border-top: none;
    font-size: 4.25vw;
    padding: 6% 10%;
    padding-top: 0%;
    margin-top: 12vh;
  }
}
</style>