<template>
    <div id="text-page">
      <button id="back" @click="back">→ חזרה</button>
      <!-- <div class="title">{{ title }}</div> -->
      <fire-areas :title="title" v-if="Number(tabNum) === 0"></fire-areas>
      <refreshing :maintitle="title" v-if="Number(tabNum) === 1"></refreshing>
      <shooting-range :title="title" v-if="Number(tabNum) === 2"></shooting-range>
      <logistics :title="title" v-if="Number(tabNum) === 3"></logistics>
      <structure :title="title" v-if="Number(tabNum) === 4"></structure>
      <darcash :title="title" v-if="Number(tabNum) === 5"></darcash>


      <!-- <div id="text-border">
        <fire-areas v-if="Number(tabNum) === 0"></fire-areas>
      </div> -->
    </div>
</template>

<script>
import json from "../../text.json";
import FireAreas from "@/components/FireAreas";
import Refreshing from "@/components/Refreshing";
import ShootingRange from "@/components/ShootingRange";
import Logistics from "@/components/Logistics";
import Darcash from "@/components/Darcash";
import Structure from "@/components/Structure";

export default {
  name: "text-page",
  props: ["tabNum"],
  components: {
    FireAreas,
    Refreshing,
    ShootingRange,
    Logistics,
    Darcash,
    Structure
  },
  data() {
    return {
      title: json["topics"][Number(this.tabNum)]
    }
  },
  methods: {
    back() {
      this.$emit("back");
    }
  }
}
</script>

<style scoped>
#text-page {
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100vw;
}
#back {
  position: absolute;
  right: 1.5vw;
  top: 2.5vh;
  z-index: 6;
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
.title {
    font-family: "assistant-extraBold";
    margin: auto;
    width: 80vw;
    margin-top: 5vh;
    font-size: 3vw;
    text-shadow: 1px 0px 3px #000000;
}
#text-border {
  min-height: 20vh;
  width: 90vw;
  margin: auto;
  border-radius: 2vw;
  border: 0.5vh solid white;
  border-top: none;
  margin-top: -2vh;
}
 
@media (max-device-width: 600px) {
 #back {
  font-size: 3vw;
  padding: 0.6vh 3vw;
  right: 2vw;
  top: 1.5vh;
}
 
.title {
    margin-top: 7vh;
    font-size: 6.5vw;
  }
  #text-border {
    border-radius: 2.25vh;
    border: 0.5vw solid white;
    border-top: none;
  }
}
</style>