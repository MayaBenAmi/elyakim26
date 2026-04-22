<template>
  <div class="app">
    <!-- <img :src="require('@/assets/media/logo.png')" id="logo" alt="logo"></img> -->
    <open-page v-if="page===-1" @homePage="homePage"></open-page>
    <home-page v-if="page===0" @chosenNum="nextPage"></home-page>
    <text-page v-if="page===1" @back="back" :tabNum="chosenTab"></text-page>
  </div>
</template>

<script>
import OpenPage from "@/components/OpenPage";
import HomePage from "@/components/HomePage";
import TextPage from "@/components/TextPage";
export default {
  name: "App",
  components: {
    HomePage,
    TextPage,
    OpenPage
  },
  data() {
    return {
      page: -1,
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
    },
    homePage() {
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
  color: #E6EDF3;
  background: linear-gradient(160deg, #0a0f1e 0%, #0d1529 40%, #101e35 70%, #0a1628 100%);
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