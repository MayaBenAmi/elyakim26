<template>
  <div id="open-page">
    <img class="wave" id="wave0" src="@/assets/media/wave0.svg" alt="">
    <img class="wave" id="wave1" src="@/assets/media/wave1.svg" alt="">
    <!-- DESKTOP -->
    <div class="big-container">
      <div class="row" v-for="rowIndex in 2" :key="rowIndex">
        <div
          v-for="i in 3"
          :key="i"
          class="tab"
          v-if="tabs[(rowIndex - 1) * 3 + (i - 1)]"
          @click="triggerTabShine($event, (rowIndex - 1) * 3 + (i - 1))"
        >
          <img :src="tabs[(rowIndex - 1) * 3 + (i - 1)]" />
        </div>
      </div>
    </div>
    <!-- MOBILE -->
    <div class="small-container">
      <div class="row" v-for="rowIndex in Math.ceil(tabs.length / 2)" :key="rowIndex">
        <div
          v-for="i in 2"
          :key="i"
          class="tab"
          v-if="tabs[(rowIndex - 1) * 2 + (i - 1)]"
          @click="triggerTabShine($event, (rowIndex - 1) * 2 + (i - 1))"
        >
          <img :src="tabs[(rowIndex - 1) * 2 + (i - 1)]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tab0 from '@/assets/media/tab0.svg';
import tab1 from '@/assets/media/tab1.svg';
import tab2 from '@/assets/media/tab2.svg';
import tab3 from '@/assets/media/tab3.svg';
import tab4 from '@/assets/media/tab4.svg';
import tab5 from '@/assets/media/tab5.svg';

export default {
  name: "open-page",
  data() {
    return {
      tabs: [
        tab0, tab1, tab2,
        tab3, tab4, tab5
      ]
    };
  },
  methods: {
    triggerTabShine(event, chosenNum) {
      const el = event.currentTarget;

      el.classList.remove("shine-animate");
      void el.offsetWidth;
      el.classList.add("shine-animate");

      el.removeEventListener("animationend", el._shineListener);

      el._shineListener = () => {
        this.$emit("chosenNum", chosenNum);
        el.removeEventListener("animationend", el._shineListener);
      };

      el.addEventListener("animationend", el._shineListener);
    }
  }
};
</script>

<style scoped>
#open-page {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* WAVES (STATIC) */
.wave {
  width: 100vw;
  position: absolute;
  right: 0;
  user-select: none;
  z-index: 1;
  transform: scale(1.03);
}

#wave0 { top: -5vh; }
#wave1 { top: 30vh; }

/* CONTAINERS */
.big-container,
.small-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 100vw;
}

.big-container {
  display: flex;
  flex-direction: column;
}

.small-container {
  display: none;
}

.row {
  display: flex;
  justify-content: center;
}

/* TAB + SHINE */
.tab {
  width: 20vw;
  margin: 1%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.tab img {
  width: 100%;
  display: block;
}

/* SHINE EFFECT */
.tab::after {
  content: '';
  position: absolute;
  top: 2%;
  left: -75%;
  width: 50%;
  height: 90.5%;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0) 20%,
    rgba(255,255,255,0.45) 50%,
    rgba(255,255,255,0) 80%,
    rgba(255,255,255,0) 100%
  );
  opacity: 0;
  pointer-events: none;
}

.tab.shine-animate::after {
  animation: tabShine 0.8s ease-in-out;
  opacity: 1;
}

@keyframes tabShine {
  from { left: -75%; }
  to   { left: 125%; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  .wave {
    width: 500vw;
    right: -50vw;
  }

  #wave0 { top: -50vh; }
  #wave1 { top: 10vh; }

  .big-container { display: none; }
  .small-container { display: flex; flex-direction: column; }

  .tab { width: 45vw; }
}
</style>
