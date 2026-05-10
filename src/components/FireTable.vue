<template>
  <div id="fire-table">
    <button id="back" @click="back">→ חזרה</button>
    <div class="subTitle">שטח אש לפי סוג אימון</div>
    <div class="divider"></div>

    <!-- Desktop: search dropdown -->
    <div class="desktop-search-wrapper">
      <div class="desktop-search-box" :class="{ active: searchOpen }">
        <input
          ref="searchInput"
          class="desktop-search-input"
          v-model="searchQuery"
          placeholder="חיפוש לפי סוג אימון..."
          autocomplete="off"
          @click="clearSearch"
          @blur="onSearchBlur"
          @input="searchOpen = true"
        />
        <span class="desktop-search-chevron" :class="{ open: searchOpen }" @mousedown.prevent="toggleChevron">▾</span>
      </div>
      <transition name="drop">
        <ul v-if="searchOpen && searchSuggestions.length" class="desktop-search-list">
          <li
            v-for="(item, i) in searchSuggestions"
            :key="i"
            class="desktop-search-item"
            @mousedown.prevent="selectSearch(item)"
          >{{ item.subTitle }}</li>
        </ul>
      </transition>
    </div>

    <!-- Desktop: table -->
    <div id="table-container">
      <table>
        <thead>
          <tr>
            <th>סוג אימון</th>
            <th>שטח אש פוטנציאלי</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredTitles" :key="index">
            <td>{{ item.subTitle }}</td>
            <td>{{ item.txt }}</td>
          </tr>
          <tr v-if="filteredTitles.length === 0">
            <td colspan="2" class="no-results">לא נמצאו תוצאות</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile: dropdown -->
    <div class="mobile-dropdown">
      <button class="dropdown-trigger" @click="dropdownOpen = !dropdownOpen">
        <span class="trigger-label">{{ selectedItem ? selectedItem.subTitle : 'בחר סוג אימון' }}</span>
        <span class="trigger-chevron" :class="{ open: dropdownOpen }">▾</span>
      </button>
      <transition name="drop">
        <ul v-if="dropdownOpen" class="dropdown-list">
          <li
            v-for="(item, i) in titles"
            :key="i"
            class="dropdown-item"
            @click="pick(item)"
          >{{ item.subTitle }}</li>
        </ul>
      </transition>
    </div>

    <!-- Mobile: popup -->
    <transition name="card">
      <div v-if="selectedItem && !dropdownOpen" class="card-overlay" @click.self="selectedItem = null">
        <div class="cards-sheet">
          <button class="card-close" @click="selectedItem = null">✕</button>
          <div class="cards-position-title">{{ selectedItem.subTitle }}</div>
          <div class="card-txt">{{ selectedItem.txt }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import json from "../../text.json";

export default {
  name: "fire-table",
  data() {
    return {
      titles: json["fire-type"],
      dropdownOpen: false,
      selectedItem: null,
      searchQuery: "",
      searchOpen: false
    };
  },
  computed: {
    searchSuggestions() {
      const q = this.searchQuery.trim();
      if (!q) return this.titles;
      return this.titles.filter(item => item.subTitle.includes(q));
    },
    filteredTitles() {
      const q = this.searchQuery.trim();
      if (!q) return this.titles;
      return this.titles.filter(item => item.subTitle.includes(q));
    }
  },
  mounted() {
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);
  },
  watch: {
    dropdownOpen(val) {
      const tp = document.getElementById('text-page');
      if (tp) tp.style.overflow = val ? 'hidden' : '';
    }
  },
  methods: {
    back() {
      this.$emit("back");
    },
    pick(item) {
      this.selectedItem = item;
      this.dropdownOpen = false;
    },
    selectSearch(item) {
      this.searchQuery = item.subTitle;
      this.searchOpen = false;
    },
    onSearchBlur() {
      this.searchOpen = false;
    },
    clearSearch() {
      this.searchQuery = "";
      this.searchOpen = true;
    },
    toggleChevron() {
      if (this.searchOpen) {
        this.searchOpen = false;
      } else {
        this.searchQuery = "";
        this.searchOpen = true;
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    }
  }
};
</script>

<style scoped>
#fire-table {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10vh 0 4vh;
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

.subTitle {
  font-family: "assistant-extrabold";
  font-size: 2.25vw;
  color: #1d1d1f;
  letter-spacing: -0.02em;
  margin-bottom: 1vh;
}

.divider {
  width: 3vw;
  height: 2px;
  background: #d2d2d7;
  border-radius: 2px;
  margin-bottom: 3vh;
}

#table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10vh;
}

table {
  border-collapse: collapse;
  width: 55vw;
  table-layout: fixed;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 12px 40px rgba(0,0,0,0.12);
  border: 1px solid #e5e5ea;
}

th {
  background: #f5f5f7;
  border-bottom: 1px solid #f5f5f7;
  border-left: 2px solid #f5f5f7;
  padding: 1.5vh 2%;
  font-family: "assistant-extrabold";
  font-size: 1vw;
  color: #1d1d1f;
}
th:last-child { border-left: none; }

tr:nth-child(even) td { background-color: #f5f5f7; }
tr:hover td { background-color: #f0f7f3; }

td {
  direction: rtl;
  text-align: right;
  border-bottom: 1px solid #f5f5f7;
  border-left: 2px solid #f5f5f7;
  padding: 1.2vh 2%;
  white-space: pre-line;
  color: #3a3a3c;
  font-family: "assistant";
  font-size: 1vw;
  transition: background-color 0.2s ease;
}
td:last-child { border-left: none; }

.desktop-search-wrapper {
  position: relative;
  width: 55vw;
  margin-bottom: 1.5vh;
  direction: rtl;
}

.desktop-search-box {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1.5px solid #d0e4d8;
  border-radius: 12px;
  padding: 0.8vh 1.2vw;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.desktop-search-box.active {
  border-color: #3a6b4a;
  box-shadow: 0 0 0 3px rgba(58,107,74,0.1);
}

.desktop-search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: "assistant-bold";
  font-size: 1vw;
  color: #1d1d1f;
  direction: rtl;
  text-align: right;
}
.desktop-search-input::placeholder {
  color: #aeaeb2;
  font-family: "assistant";
}

.desktop-search-chevron {
  font-size: 1.1vw;
  color: #3a6b4a;
  margin-right: 0.5vw;
  transition: transform 0.2s ease;
  line-height: 1;
  flex-shrink: 0;
  cursor: pointer;
  padding: 0.2vh 0.3vw;
  user-select: none;
}
.desktop-search-chevron.open { transform: rotate(180deg); }

.desktop-search-list {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  left: 0;
  background: #ffffff;
  border: 1px solid #e5e5ea;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07);
  list-style: none;
  margin: 0;
  padding: 0.5vh 0;
  z-index: 30;
  max-height: 40vh;
  overflow-y: auto;
}

.desktop-search-item {
  font-family: "assistant-bold";
  font-size: 1vw;
  color: #1d1d1f;
  padding: 0.9vh 1.2vw;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f7;
  direction: rtl;
  text-align: right;
  transition: background 0.15s;
}
.desktop-search-item:last-child { border-bottom: none; }
.desktop-search-item:hover { background: #f0f7f3; }

.no-results {
  text-align: center;
  color: #aeaeb2;
  font-family: "assistant";
  font-size: 1vw;
  padding: 2vh;
}

.drop-enter-active, .drop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.drop-enter, .drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* hidden on desktop */
.mobile-dropdown { display: none; }
.card-overlay    { display: none; }

/* ── MOBILE ── */
@media (max-device-width: 600px) {
  #back {
    font-size: 3vw;
    padding: 0.6vh 3vw;
    right: 2vw;
    top: 2.5vh;
    background: #3a6b4a;
    color: #ffffff;
    transition: none;
  }
  #back:hover, #back:active { background: #3a6b4a; color: #ffffff; }

  #fire-table    { padding-top: 6vh; padding-bottom: 8vh; }
  .subTitle      { font-size: 5.5vw; }
  .divider       { width: 12vw; }
  #table-container { display: none; }
  .desktop-search-wrapper { display: none; }

  .mobile-dropdown {
    display: block;
    position: relative;
    width: 88vw;
    direction: rtl;
  }

  .dropdown-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border: 1.5px solid #d0e4d8;
    border-radius: 16px;
    padding: 2vh 4vw;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .trigger-label {
    font-family: "assistant-bold";
    font-size: 4.2vw;
    color: #1d1d1f;
  }

  .trigger-chevron {
    font-size: 4.5vw;
    color: #3a6b4a;
    transition: transform 0.2s ease;
    line-height: 1;
  }
  .trigger-chevron.open { transform: rotate(180deg); }

  .dropdown-list {
    position: absolute;
    top: calc(100% + 1.5vw);
    right: 0;
    left: 0;
    background: #ffffff;
    border: 1px solid #e5e5ea;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08);
    list-style: none;
    margin: 0;
    padding: 1vh 0;
    z-index: 20;
    max-height: 52vh;
    overflow-y: auto;
  }

  .dropdown-item {
    font-family: "assistant-bold";
    font-size: 4vw;
    color: #1d1d1f;
    padding: 1.6vh 4vw;
    cursor: pointer;
    border-bottom: 1px solid #f5f5f7;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  .dropdown-item:last-child { border-bottom: none; }
  .dropdown-item:active     { background: #f0f7f3; }

  .drop-enter-active, .drop-leave-active {
    transition: opacity 0.18s ease, transform 0.18s ease;
  }
  .drop-enter, .drop-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }

  .card-overlay {
    display: flex;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 50;
    align-items: center;
    justify-content: center;
  }

  .cards-sheet {
    position: relative;
    background: #ffffff;
    border-radius: 24px;
    width: 80vw;
    padding: 5vw 6vw 6vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 24px 60px rgba(0,0,0,0.12);
    direction: rtl;
    text-align: right;
    max-height: 70vh;
    overflow-y: auto;
  }

  .card-close {
    position: absolute;
    top: 3vw;
    left: 3vw;
    background: #f5f5f7;
    border: none;
    border-radius: 50%;
    width: 7vw;
    height: 7vw;
    font-size: 3.5vw;
    color: #3a3a3c;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    flex-shrink: 0;
  }

  .cards-position-title {
    font-family: "assistant-extrabold";
    font-size: 5vw;
    color: #3a6b4a;
    margin-top: 3vw;
    margin-bottom: 2vh;
    width: 100%;
  }

  .card-txt {
    font-family: "assistant";
    font-size: 4vw;
    color: #3a3a3c;
    line-height: 1.7;
    white-space: pre-line;
    width: 100%;
  }

  .card-enter-active { transition: opacity 0.2s ease; }
  .card-leave-active { transition: opacity 0.15s ease; }
  .card-enter-active .cards-sheet { transition: transform 0.22s ease, opacity 0.2s ease; }
  .card-leave-active .cards-sheet { transition: transform 0.15s ease, opacity 0.15s ease; }
  .card-enter .cards-sheet, .card-leave-to .cards-sheet {
    transform: scale(0.9) translateY(16px);
    opacity: 0;
  }
  .card-enter  { opacity: 0; }
  .card-leave-to { opacity: 0; }
}
</style>
