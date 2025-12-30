<template>
  <div id="logistics">
    <div class="blocks-container">
        <div v-for="(subtitle, index) in subtitles" :key="index" class="block-container">
            <div class="title-container">  
                <img 
                src="../assets/media/plus.svg" 
                alt="plus" 
                v-if="!pressedIndex.includes(index)" 
                @click="showText(index)"
                class="plus"
                >
                <img 
                src="../assets/media/minus.svg" 
                alt="minus" 
                v-if="pressedIndex.includes(index)" 
                @click="showText(index)"
                class="plus"
                >
                <div class="subtitle">{{ subtitle }}</div>
            </div>
        <!-- Text shown when expanded -->
        <div v-if="pressedIndex.includes(index)" class="extra-text-container">
            <div v-for="(text, tIndex) in jsonText.logistics[index].txt" :key="tIndex" >
            • {{ text }}
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import jsonText from "../../text.json";

export default {
  name: "logistics",
  data() {
    return {
      subtitles: jsonText.logistics.map(item => item.subTitle),
      pressedIndex: [],
      jsonText
    }
  },
  methods: {
    showText(index) {
      if (this.pressedIndex.includes(index)) {
        this.pressedIndex = this.pressedIndex.filter(i => i !== index);
      } else {
        this.pressedIndex.push(index);
      }
    }
  }
}
</script>

<style scoped>
#logistics {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
}
.blocks-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    margin-top: 20vh;
    /* position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%); */
}
.block-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 0.5vh;
    width: 15vw;
    margin-bottom: 0.5vh;
    text-align: right;
}
.plus {
    max-width: 100%;
    margin-left: 0.75vw;
    cursor: pointer;
    height: 4.2vh;
}
.title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1%;
    justify-content: flex-start;
    width: 90%;
    height: 10vh;
    margin: 0.5vh;
    background: linear-gradient(180deg, #e8e8e81f, #e8e8e85f);
    border: 0.2vh solid #75C2E6;
    border-radius: 2vh;

}
.subtitle {
    font-size: 1.5vw;
    font-family: "assistant-extraBold";
}
.extra-text-container {
    background: linear-gradient(180deg, #e8e8e81f, #e8e8e85f);
    border: 0.2vh solid #75C2E6;
    border-radius: 1.75vh;
    width: 90%;
    padding: 1%;
    margin-right: 0.5vh;
    margin-top: 0.5%;
    font-size: 1.35vw;
}
@media (max-device-width: 600px) {
#logistics {
    position: relative;
}
    .blocks-container {
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 3vh;
}
.block-container {
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 0.75vh;
    width: 90vw;
    margin-bottom: 0.75vh;
    text-align: right;
}
.title-container {
    height: 5vh;
    margin: 0.5vh;
    margin-bottom: 0%;
    background: linear-gradient(180deg, #e8e8e81f, #e8e8e85f);
    border: 0.2vh solid #75C2E6;
    border-radius: 1.5vh;
}
.subtitle {
    font-size: 5.5vw;
    font-family: "assistant-extraBold";
}
.extra-text-container {
    border-radius: 1.5vh;
    width: 90%;
    padding: 1%;
    margin-top: 0.5%;
    font-size: 4vw;
}
}
</style>