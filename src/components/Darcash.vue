<template>
  <div id="darcash">
    <div class="title">{{ title }}</div>
    <div class="divider"></div>

    <!-- Desktop: search -->
    <div class="desktop-search-wrapper">
      <div class="desktop-search-box" :class="{ active: searchOpen }">
        <input
          ref="searchInput"
          class="desktop-search-input"
          v-model="desktopQuery"
          placeholder="חיפוש לפי שם או תפקיד..."
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
            v-for="(row, i) in searchSuggestions"
            :key="i"
            class="desktop-search-item"
            @mousedown.prevent="selectSearch(row)"
          >{{ row.name }} — {{ row.position }}</li>
        </ul>
      </transition>
    </div>

    <!-- Desktop: table -->
    <div id="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="(t, i) in darcashTitles" :key="i">{{ t }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in filteredDarcash" :key="i">
            <td>{{ row.name }}</td>
            <td>{{ row.position }}</td>
            <td class="phone-cell">{{ row.phone }}</td>
          </tr>
          <tr v-if="filteredDarcash.length === 0">
            <td colspan="3" class="no-results">לא נמצאו תוצאות</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile: name search -->
    <div class="mobile-search">
      <input
        class="search-input"
        type="text"
        v-model="nameQuery"
        placeholder="חפש לפי שם"
        @focus="selectedPosition = null"
      />
      <transition name="drop">
        <ul v-if="nameQuery.trim()" class="dropdown-list search-results">
          <li
            v-for="(person, i) in nameResults"
            :key="i"
            class="dropdown-item"
            @click="selectPerson(person)"
          >{{ person.name }} — {{ person.position }}</li>
          <li v-if="nameResults.length === 0" class="dropdown-item no-results">לא נמצאו תוצאות</li>
        </ul>
      </transition>
    </div>

    <!-- Mobile: dropdown -->
    <div class="mobile-dropdown">
      <button class="dropdown-trigger" @click="dropdownOpen = !dropdownOpen">
        <span class="trigger-label">{{ selectedPosition || 'חפש לפי תפקיד' }}</span>
        <span class="trigger-chevron" :class="{ open: dropdownOpen }">▾</span>
      </button>
      <transition name="drop">
        <ul v-if="dropdownOpen" class="dropdown-list">
          <li
            v-for="pos in uniquePositions"
            :key="pos"
            class="dropdown-item"
            @click="pick(pos)"
          >{{ pos }}</li>
        </ul>
      </transition>
    </div>

    <!-- Mobile: single person card (from name search) -->
    <transition name="card">
      <div v-if="selectedPerson" class="card-overlay" @click.self="selectedPerson = null">
        <div class="cards-sheet">
          <button class="card-close" @click="selectedPerson = null">✕</button>
          <div class="cards-position-title">{{ selectedPerson.position }}</div>
          <div class="person-card">
            <div class="card-name">{{ selectedPerson.name }}</div>
            <a class="card-phone" :href="'tel:' + selectedPerson.phone">{{ selectedPerson.phone }}</a>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile: cards overlay -->
    <transition name="card">
      <div v-if="selectedPosition && !dropdownOpen" class="card-overlay" @click.self="selectedPosition = null">
        <div class="cards-sheet">
          <button class="card-close" @click="selectedPosition = null">✕</button>
          <div class="cards-position-title">{{ selectedPosition }}</div>
          <div
            v-for="(person, i) in selectedPeople"
            :key="i"
            class="person-card"
            :class="{ 'card-divider': i > 0 }"
          >
            <div class="card-name">{{ person.name }}</div>
            <a class="card-phone" :href="'tel:' + person.phone">{{ person.phone }}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import json from "../../text.json";

export default {
  props: ["title"],
  name: "darcash",
  data() {
    return {
      darcash: json.darcash || [],
      darcashTitles: json["tableHeaders"] || [],
      selectedPosition: null,
      selectedPerson: null,
      dropdownOpen: false,
      nameQuery: "",
      desktopQuery: "",
      searchOpen: false
    };
  },
  computed: {
    searchSuggestions() {
      const q = this.desktopQuery.trim();
      if (!q) return this.darcash;
      return this.darcash.filter(r => r.name.includes(q) || r.position.includes(q));
    },
    filteredDarcash() {
      const q = this.desktopQuery.trim();
      if (!q) return this.darcash;
      return this.darcash.filter(r => r.name.includes(q) || r.position.includes(q));
    },
    uniquePositions() {
      return [...new Set(this.darcash.map(r => r.position))];
    },
    selectedPeople() {
      if (!this.selectedPosition) return [];
      return this.darcash.filter(r => r.position === this.selectedPosition);
    },
    nameResults() {
      const q = this.nameQuery.trim();
      if (!q) return [];
      return this.darcash.filter(r => r.name.includes(q));
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
    pick(pos) {
      this.selectedPosition = pos;
      this.dropdownOpen = false;
    },
    selectPerson(person) {
      this.selectedPerson = person;
      this.nameQuery = "";
    },
    selectSearch(row) {
      this.desktopQuery = row.name;
      this.searchOpen = false;
    },
    clearSearch() {
      this.desktopQuery = "";
      this.searchOpen = true;
    },
    onSearchBlur() {
      this.searchOpen = false;
    },
    toggleChevron() {
      if (this.searchOpen) {
        this.searchOpen = false;
      } else {
        this.desktopQuery = "";
        this.searchOpen = true;
        this.$nextTick(() => this.$refs.searchInput.focus());
      }
    }
  }
};
</script>

<style scoped>
#darcash {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10vh;
}

.title {
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

/* ── DESKTOP TABLE ── */
#table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10vh;
}

table {
  border-collapse: collapse;
  width: 60vw;
  table-layout: fixed;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 12px 40px rgba(0,0,0,0.12);
  border: 1px solid #e5e5ea;
  margin-bottom: 5vh;
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

.phone-cell { text-align: left; white-space: nowrap; }

.desktop-search-wrapper {
  position: relative;
  width: 60vw;
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

.drop-enter-active, .drop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.drop-enter, .drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.no-results {
  text-align: center;
  color: #aeaeb2;
  font-family: "assistant";
  font-size: 1vw;
  padding: 2vh;
}

/* ── MOBILE HIDDEN BY DEFAULT ── */
.mobile-search   { display: none; }
.mobile-dropdown { display: none; }
.card-overlay    { display: none; }

/* ── MOBILE ── */
@media (max-device-width: 600px) {
  #darcash         { padding-top: 6vh; padding-bottom: 8vh; margin: 0px; height: 100vh;}
  .title           { font-size: 5.5vw; }
  .divider         { width: 12vw; }
  #table-container { display: none; }
  .desktop-search-wrapper { display: none; }

  /* name search */
  .mobile-search {
    display: block;
    position: relative;
    width: 88vw;
    direction: rtl;
    margin-bottom: 3vw;
  }

  .search-input {
    width: 100%;
    box-sizing: border-box;
    background: #ffffff;
    border: 1.5px solid #d0e4d8;
    border-radius: 16px;
    padding: 2vh 4vw;
    font-family: "assistant-bold";
    font-size: 4.2vw;
    color: #1d1d1f;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    outline: none;
    direction: rtl;
    -webkit-appearance: none;
    appearance: none;
  }
  .search-input::placeholder { color: #aaa; }
  .search-input:focus { border-color: #3a6b4a; }

  .search-results { position: absolute; top: calc(100% + 1.5vw); }

  .no-results {
    color: #aaa;
    font-family: "assistant";
    cursor: default;
  }
  .no-results:active { background: transparent; }

  /* dropdown wrapper */
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

  /* cards overlay */
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
    gap: 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 24px 60px rgba(0,0,0,0.12);
    direction: rtl;
    text-align: center;
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

  .person-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6vh;
    padding: 1.8vh 0;
  }

  .card-divider {
    border-top: 1px solid #e5e5ea;
  }

  .card-name {
    font-family: "assistant-bold";
    font-size: 4.5vw;
    color: #1d1d1f;
  }

  .card-phone {
    font-family: "assistant";
    font-size: 4.2vw;
    color: #3a3a3c;
    text-decoration: none;
    background: #f5f5f7;
    border-radius: 980px;
    padding: 0.8vh 4vw;
    letter-spacing: 0.04em;
    direction: ltr;
  }

  /* card transition */
  .card-enter-active { transition: opacity 0.2s ease; }
  .card-leave-active  { transition: opacity 0.15s ease; }
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
