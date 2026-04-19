<template>
  <div id="logistics">
     <div class="title">{{ title }}</div>
    <div class="blocks-container">
        <div v-for="(subtitle, index) in subtitles" :key="index" class="block-container">
            <div class="title-container" @click="showText(index)">  
                <img 
                src="../assets/media/plus.svg" 
                alt="plus" 
                v-if="!pressedIndex.includes(index)" 
                class="plus"
                >
                <img 
                src="../assets/media/minus.svg" 
                alt="minus" 
                v-if="pressedIndex.includes(index)" 
                class="plus"
                >
                <div class="subtitle">{{ subtitle }}</div>
            </div>
        <!-- Text shown when expanded -->
        <transition name="expand">
          <div v-if="pressedIndex.includes(index)" class="extra-text-container">
              <div v-for="(text, tIndex) in jsonText.logistics[index].txt" :key="tIndex" >
              • {{ text }}
              </div>
          </div>
        </transition>
        </div>
    </div>
  </div>
</template>

<script>
import jsonText from "../../text.json";

export default {
    props: ["title"],
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
/* ===== TRANSITIONS ===== */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.expand-enter-to,
.expand-leave {
  opacity: 1;
  max-height: 500px;
}

#logistics {
    position: absolute;
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
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.title-container:hover {
    background: linear-gradient(180deg, #e8e8e82f, #e8e8e86f);
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
.title {
  margin-top: 7vh;
  font-size: 6vw;
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
    cursor: pointer;
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