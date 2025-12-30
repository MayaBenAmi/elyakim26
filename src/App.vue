<template>
  <div class="app">
    <img :src="require('@/assets/media/logo.png')" id="logo" alt="logo"></img>
    <open-page v-if="page===0" @chosenNum="nextPage"></open-page>
    <text-page v-if="page===1" @back="back" :tabNum="chosenTab"></text-page>
  </div>
</template>

<script>
import OpenPage from "@/components/OpenPage";
import TextPage from "@/components/TextPage";
export default {
  name: "App",
  components: {
    OpenPage,
    TextPage
  },
  data() {
    return {
      page: 0,
      chosenTab: -1
    }
  },
  methods: {
    nextPage(chosenNum) {
      this.chosenTab = chosenNum;
      this.page++ ;
    },
    back() {
      this.page = 0;
    }
  }
};
</script>

<style>
@font-face { 
  font-family: "assistant-light"; 
  src: url('./assets/fonts/Assistant-Light.ttf'); 
} 
@font-face { 
  font-family: "assistant-bold"; 
  src: url('./assets/fonts/Assistant-Bold.ttf'); 
} 
@font-face { 
  font-family: "assistant"; 
  src: url('./assets/fonts/Assistant-Regular.ttf'); 
} 
  @font-face { 
  font-family: "assistant-extrabold"; 
  src: url('./assets/fonts/Assistant-ExtraBold.otf'); 
}
.app {
  width: 100vw; 
  height: 100%; 
  position: absolute;
  top: 0;
  right: 0;
  margin: 0; 
  padding: 0; 
  overflow: hidden; 
  font-family: "assistant"; 
  text-align: center; 
  direction: rtl; 
  color: #E8E8E8; 
  background: linear-gradient(135deg, #5E81AC, #475C7A, #364256, #2B2A30, #1F1E23, #1F1E23);
}

#logo { 
  position: absolute; 
  left: 1vw; 
  top: 2vh; 
  height: 10vh; 
  z-index: 8;
}

@media (max-device-width: 600px) {
  #logo {
    height: 6vh;
    left: 2vw;
    top: 1vh;
  }
}

</style>