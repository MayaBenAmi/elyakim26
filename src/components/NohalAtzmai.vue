<template>
  <div id="nohal-atzmai">
    <button id="back" @click="back">→ חזרה</button>

    <div class="page-title">{{ tab.title }}</div>
    <div class="divider"></div>

    <div class="content">
      <div class="section-title">{{ data.title }}</div>

      <div class="item" v-for="(item, i) in data.txt" :key="i">
        <div class="item-header">
          <span class="item-number">{{ i + 1 }}.</span>
          <span class="item-subtitle">{{ item.subtitle }}</span>
        </div>
        <ul class="details" v-if="item.details && item.details.length">
          <li v-for="(d, j) in item.details" :key="j">{{ d }}</li>
        </ul>
      </div>

      <div class="contact-divider"></div>

      <div class="contact-title">צור קשר:</div>
      <div class="contact-row" v-for="contact in contacts" :key="contact.name">
        <span class="contact-position">{{ contact.position }}</span>
        <span class="contact-name">{{ contact.name }}</span>
        <a class="contact-phone" :href="'tel:' + contact.phone">{{ contact.phone }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";

const CONTACT_POSITIONS = ["ק' אג\"ם", "קמב\"צית"];

export default {
  name: "nohal-atzmai",
  props: ["tab"],
  data() {
    return {
      data: json["nohal-atzmai"],
      contacts: json["darcash"].filter(p => CONTACT_POSITIONS.includes(p.position)),
    };
  },
  methods: {
    back() {
      this.$emit("back");
    },
  }
};
</script>

<style scoped>
#nohal-atzmai {
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
  margin-bottom: 0;
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

.content {
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 4vh;
  width: 55vw;
  background: #ffffff;
  border-radius: 12px;
  padding: 4vh 3vw;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 6px 24px rgba(0,0,0,0.07);
}

.section-title {
  font-family: "assistant-extrabold";
  font-size: 1.6vw;
  color: #1d1d1f;
  margin-bottom: 1vh;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.item-header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 0.6vw;
}

.item-number {
  font-family: "assistant-extrabold";
  font-size: 1.4vw;
  color: #3a6b4a;
  flex-shrink: 0;
}

.item-subtitle {
  font-family: "assistant-bold";
  font-size: 1.4vw;
  color: #1d1d1f;
  line-height: 1.5;
}

.details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  padding-right: 2vw;
}

.details li {
  font-family: "assistant-bold";
  font-size: 1.2vw;
  text-align: right;
  color: #444;
  line-height: 1.5;
  position: relative;
}

.details li::before {
  content: "–";
  position: absolute;
  right: -1.5vw;
  color: #3a6b4a;
}

.contact-divider {
  width: 100%;
  height: 1px;
  background: #d2d2d7;
  border-radius: 2px;
}

.contact-title {
  font-family: "assistant-extrabold";
  font-size: 1.6vw;
  color: #1d1d1f;
  margin-bottom: 0.5vh;
}

.contact-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1vw;
}

.contact-position {
  font-family: "assistant-extrabold";
  font-size: 1.2vw;
  color: #3a6b4a;
  min-width: 8vw;
}

.contact-name {
  font-family: "assistant-bold";
  font-size: 1.2vw;
  color: #1d1d1f;
  min-width: 8vw;
}

.contact-phone {
  font-family: "assistant-bold";
  font-size: 1.2vw;
  color: #3a6b4a;
  text-decoration: none;
  direction: ltr;
}

.contact-phone:hover { text-decoration: underline; }

/* LARGE SCREEN */
@media (min-width: 1600px) {
  .page-title    { font-size: 3vw; }
  .section-title { font-size: 2vw; }
  .item-number   { font-size: 1.8vw; }
  .item-subtitle { font-size: 1.8vw; }
  .details li    { font-size: 1.5vw; }
}

/* MOBILE */
@media (max-device-width: 600px) {
  #nohal-atzmai {
    justify-content: flex-start;
    overflow-y: auto;
    padding: 10vh 0 6vh;
  }

  #back         { font-size: 3vw; padding: 0.6vh 3vw; right: 2vw; top: 2.5vh; background: #3a6b4a; color: #ffffff; transition: none; }
  #back:hover, #back:active { background: #3a6b4a; color: #ffffff; }

  .page-title    { font-size: 6vw; margin-bottom: 0; }
  .divider       { width: 12vw; margin-top: 1.5vh; margin-bottom: 3vh; display: block; }

  .content       { width: 88vw; min-width: unset; gap: 3vh; }
  .section-title { font-size: 4.5vw; }
  .item-number   { font-size: 4vw; }
  .item-subtitle { font-size: 4vw; }
  .details li    { font-size: 3.5vw; }
  .details       { padding-right: 5vw; }
  .details li::before { right: -4vw; }
  .item-header   { gap: 2vw; }

  .contact-title  { font-size: 4.5vw; }
  .contact-position { font-size: 3.5vw; min-width: 22vw; }
  .contact-name   { font-size: 3.5vw; min-width: 22vw; }
  .contact-phone  { font-size: 3.5vw; }
  .contact-row    { gap: 3vw; }
}
</style>
