<template>
  <div id="equipment">
    <button id="back" @click="back">→ חזרה</button>

    <div class="page-title">{{ tab.title }}</div>
    <div class="divider"></div>

    <div class="columns">
      <div class="column" v-for="cat in categories" :key="cat.key">
        <div class="column-title">{{ cat.title }}</div>
        <template v-if="cat.subtitles && cat.subtitles.length">
          <div class="subtitle-block" v-for="(sub, si) in cat.subtitles" :key="si">
            <div class="subtitle">{{ sub.title }}</div>
            <ul class="item-list">
              <li v-for="(item, ii) in sub.items" :key="ii">{{ item }}</li>
            </ul>
          </div>
        </template>
        <template v-else-if="cat.items && cat.items.length">
          <div class="subtitle-block">
            <ul class="item-list">
              <li v-for="(item, i) in cat.items" :key="i">{{ item }}</li>
            </ul>
          </div>
        </template>
        <div class="empty" v-else>—</div>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";
export default {
  name: "equipment",
  props: ["tab"],
  data() {
    return {
      categories: json["equipment"],
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
#equipment {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 10vh 0 6vh;
}

#back {
  position: absolute;
  right: 1.5vw;
  top: 2.5vh;
  z-index: 7;
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

.page-title {
  font-family: "assistant-extrabold";
  font-size: 2.25vw;
  color: #1d1d1f;
  letter-spacing: -0.02em;
  direction: rtl;
}

.divider {
  width: 3vw;
  height: 2px;
  background: #d2d2d7;
  border-radius: 2px;
  margin-top: 1vh;
  margin-bottom: 4vh;
}

.columns {
  display: flex;
  flex-direction: row;
  gap: 2vw;
  width: 70vw;
  align-items: flex-start;
}

.column {
  flex: 1;
  background: #ffffff;
  border-radius: 12px;
  padding: 3.5vh 2.5vw;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 6px 24px rgba(0,0,0,0.07);
  direction: rtl;
}

.column-title {
  font-family: "assistant-extrabold";
  font-size: 1.5vw;
  color: #3a6b4a;
  margin-bottom: 2vh;
  padding-bottom: 1.5vh;
  border-bottom: 1.5px solid #d2d2d7;
}

.subtitle-block {
  display: flex;
  flex-direction: column;
  gap: 1vh;
  margin-bottom: 3vh;
  background: #f5f9f6;
  border-radius: 8px;
  padding: 1.5vh 1.2vw;
}

.subtitle {
  font-family: "assistant-extrabold";
  font-size: 1.2vw;
  color: #1d1d1f;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
}

.item-list li {
  font-family: "assistant-bold";
  font-size: 1.2vw;
  color: #1d1d1f;
  line-height: 1.5;
  position: relative;
  padding-right: 1.5vw;
}

.item-list li::before {
  content: "–";
  position: absolute;
  right: 0;
  color: #3a6b4a;
}

.empty {
  font-family: "assistant-bold";
  font-size: 1.2vw;
  color: #aaa;
}

/* LARGE SCREEN */
@media (min-width: 1600px) {
  .page-title   { font-size: 3vw; }
  .column-title { font-size: 2vw; }
  .subtitle     { font-size: 1.5vw; }
  .item-list li { font-size: 1.6vw; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  #equipment { padding: 10vh 0 6vh; }

  #back { font-size: 3vw; padding: 0.6vh 3vw; right: 2vw; top: 2.5vh; background: #3a6b4a; color: #ffffff; transition: none; }
  #back:hover, #back:active { background: #3a6b4a; color: #ffffff; }

  .page-title   { font-size: 6vw; }
  .divider      { width: 15vw; margin-bottom: 3vh; }

  .columns      { flex-direction: column; width: 90vw; gap: 3vw; align-items: center; }
  .column       { padding: 3vh 5vw; width: 82vw; }
  .column-title  { font-size: 4.5vw; }
  .subtitle      { font-size: 3.8vw; }
  .subtitle-block { padding: 1.5vh 4vw; }
  .item-list li { font-size: 3.5vw; padding-right: 4vw; }
  .empty        { font-size: 3.5vw; }
}
</style>
