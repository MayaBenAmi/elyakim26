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
          @input="searchOpen = true; cancelEdit()"
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
      <transition name="drop">
        <div v-if="editMode" class="edit-mode-banner">
          <span class="edit-mode-label">מצב עריכה פעיל</span>
          <div class="banner-actions">
            <button class="banner-btn" @click="openChangePassword">שינוי סיסמה</button>
            <button class="banner-btn banner-btn-logout" @click="logout">יציאה</button>
            <button class="exit-edit-btn" @click="exitEditMode">סיום עריכה ✓</button>
          </div>
        </div>
      </transition>

      <table>
        <thead>
          <tr>
            <th v-if="editMode" class="col-actions"></th>
            <th v-for="(t, i) in darcashTitles" :key="i">{{ t }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="editMode ? 4 : 3" class="no-results">טוען...</td>
          </tr>

          <template v-else>
            <tr
              v-for="row in filteredDarcash"
              :key="row.id"
              :class="{
                'row-editing': editingId === row.id,
                'row-confirm-delete': confirmDeleteId === row.id
              }"
            >
              <!-- Actions column -->
              <td v-if="editMode" class="col-actions">
                <template v-if="editingId !== row.id && confirmDeleteId !== row.id">
                  <button class="action-btn btn-edit" @click="startEdit(row)" title="ערוך">✎</button>
                  <button class="action-btn btn-del" @click="askDelete(row)" title="מחק">✕</button>
                </template>
                <template v-else-if="editingId === row.id">
                  <button class="action-btn btn-save" @click="saveEdit" title="שמור">✓</button>
                  <button class="action-btn btn-cancel" @click="cancelEdit" title="בטל">✕</button>
                </template>
                <template v-else-if="confirmDeleteId === row.id">
                  <button class="action-btn btn-save" @click="doDelete(row)" title="אשר מחיקה">✓</button>
                  <button class="action-btn btn-cancel" @click="confirmDeleteId = null" title="בטל">✕</button>
                </template>
              </td>

              <!-- View cells -->
              <template v-if="editingId !== row.id">
                <td>
                  <span v-if="confirmDeleteId === row.id" class="delete-confirm-text">למחוק?</span>
                  <span v-else>{{ row.name }}</span>
                </td>
                <td>{{ confirmDeleteId !== row.id ? row.position : '' }}</td>
                <td class="phone-cell">{{ confirmDeleteId !== row.id ? row.phone : '' }}</td>
              </template>

              <!-- Edit cells -->
              <template v-else>
                <td><input v-model="editForm.name" class="edit-input" placeholder="שם" /></td>
                <td><input v-model="editForm.position" class="edit-input" placeholder="תפקיד" /></td>
                <td><input v-model="editForm.phone" class="edit-input edit-input-ltr" placeholder="טלפון" /></td>
              </template>
            </tr>

            <!-- Add new row form -->
            <tr v-if="editMode && showAddForm" class="row-adding">
              <td class="col-actions">
                <button class="action-btn btn-save" @click="saveAdd" title="שמור">✓</button>
                <button class="action-btn btn-cancel" @click="cancelAdd" title="בטל">✕</button>
              </td>
              <td><input ref="addNameInput" v-model="addForm.name" class="edit-input" placeholder="שם" /></td>
              <td><input v-model="addForm.position" class="edit-input" placeholder="תפקיד" /></td>
              <td><input v-model="addForm.phone" class="edit-input edit-input-ltr" placeholder="טלפון" /></td>
            </tr>

            <tr v-if="!loading && filteredDarcash.length === 0 && !showAddForm">
              <td :colspan="editMode ? 4 : 3" class="no-results">לא נמצאו תוצאות</td>
            </tr>
          </template>
        </tbody>
      </table>

      <div v-if="editMode && !showAddForm" class="add-row-wrapper">
        <button class="add-row-btn" @click="startAdd">הוסף שורה +</button>
      </div>
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

    <!-- Mobile: single person card -->
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

    <!-- Edit toggle button (desktop only) -->
    <button class="edit-toggle-btn" @click="onEditToggle" :title="editMode ? 'יציאה ממצב עריכה' : session ? 'כניסה למצב עריכה' : 'התחברות'">
      {{ editMode ? '🔓' : session ? '🔓' : '🔒' }}
    </button>

    <!-- Login modal -->
    <transition name="modal-fade">
      <div v-if="showLoginModal" class="modal-overlay" @click.self="closeLoginModal">
        <div class="password-modal">
          <div class="modal-title">כניסת מנהל</div>
          <input
            ref="loginEmailInput"
            v-model="loginEmail"
            type="email"
            class="modal-pw-input"
            placeholder="אימייל"
            autocomplete="email"
            @keyup.enter="$refs.loginPasswordInput.focus()"
          />
          <input
            ref="loginPasswordInput"
            v-model="loginPassword"
            type="password"
            class="modal-pw-input"
            placeholder="סיסמה"
            autocomplete="current-password"
            @keyup.enter="submitLogin"
          />
          <div v-if="loginError" class="modal-error">{{ loginError }}</div>
          <div class="modal-btns">
            <button class="modal-btn-cancel" @click="closeLoginModal">ביטול</button>
            <button class="modal-btn-ok" @click="submitLogin" :disabled="loginLoading">
              {{ loginLoading ? '...' : 'כניסה' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Set password modal (invite / recovery) -->
    <transition name="modal-fade">
      <div v-if="showSetPasswordModal" class="modal-overlay">
        <div class="password-modal">
          <div class="modal-title">הגדרת סיסמה</div>
          <input
            ref="newPasswordInput"
            v-model="newPassword"
            type="password"
            class="modal-pw-input"
            placeholder="סיסמה חדשה"
            autocomplete="new-password"
          />
          <input
            v-model="confirmPassword"
            type="password"
            class="modal-pw-input"
            placeholder="אימות סיסמה"
            autocomplete="new-password"
            @keyup.enter="submitSetPassword"
          />
          <div v-if="setPasswordError" class="modal-error">{{ setPasswordError }}</div>
          <div class="modal-btns">
            <button class="modal-btn-ok" @click="submitSetPassword" :disabled="setPasswordLoading">
              {{ setPasswordLoading ? '...' : 'שמור סיסמה' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Change password modal -->
    <transition name="modal-fade">
      <div v-if="showChangePasswordModal" class="modal-overlay" @click.self="closeChangePassword">
        <div class="password-modal">
          <div class="modal-title">שינוי סיסמה</div>
          <input
            v-model="changeNewPassword"
            type="password"
            class="modal-pw-input"
            placeholder="סיסמה חדשה"
            autocomplete="new-password"
          />
          <input
            v-model="changeConfirmPassword"
            type="password"
            class="modal-pw-input"
            placeholder="אימות סיסמה"
            autocomplete="new-password"
            @keyup.enter="submitChangePassword"
          />
          <div v-if="changePasswordError" class="modal-error">{{ changePasswordError }}</div>
          <div class="modal-btns">
            <button class="modal-btn-cancel" @click="closeChangePassword">ביטול</button>
            <button class="modal-btn-ok" @click="submitChangePassword" :disabled="changePasswordLoading">
              {{ changePasswordLoading ? '...' : 'שמור' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { supabase } from '../supabase'
import json from "../../text.json";

export default {
  props: ["title"],
  name: "darcash",
  data() {
    return {
      darcash: [],
      loading: true,
      darcashTitles: json["tableHeaders"] || [],
      selectedPosition: null,
      selectedPerson: null,
      dropdownOpen: false,
      nameQuery: "",
      desktopQuery: "",
      searchOpen: false,
      // Auth
      session: null,
      editMode: false,
      // Login modal
      showLoginModal: false,
      loginEmail: "",
      loginPassword: "",
      loginError: "",
      loginLoading: false,
      // Set password modal (invite / recovery)
      showSetPasswordModal: false,
      newPassword: "",
      confirmPassword: "",
      setPasswordError: "",
      setPasswordLoading: false,
      // Change password modal
      showChangePasswordModal: false,
      changeNewPassword: "",
      changeConfirmPassword: "",
      changePasswordError: "",
      changePasswordLoading: false,
      // Edit state
      editingId: null,
      editForm: { name: "", position: "", phone: "" },
      confirmDeleteId: null,
      showAddForm: false,
      addForm: { name: "", position: "", phone: "" }
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
  async mounted() {
    const tp = document.getElementById('text-page');
    if (tp) tp.scrollTop = 0;
    window.scrollTo(0, 0);

    // Detect invite / recovery token in URL → show set-password form
    if (window.location.hash.includes('type=invite') || window.location.hash.includes('type=recovery')) {
      this.showSetPasswordModal = true;
      this.$nextTick(() => {
        if (this.$refs.newPasswordInput) this.$refs.newPasswordInput.focus();
      });
    }

    // Restore existing session
    const { data: { session } } = await supabase.auth.getSession();
    this.session = session;

    // Keep session in sync
    supabase.auth.onAuthStateChange((event, session) => {
      this.session = session;
      if (event === 'SIGNED_OUT') {
        this.editMode = false;
      }
    });

    await this.fetchContacts();
  },
  watch: {
    dropdownOpen(val) {
      const tp = document.getElementById('text-page');
      if (tp) tp.style.overflow = val ? 'hidden' : '';
    }
  },
  methods: {
    // ── Search / mobile ──
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
    },

    // ── Data ──
    async fetchContacts() {
      this.loading = true;
      const { data, error } = await supabase.from('contacts').select('*').order('created_at');
      if (!error && data) this.darcash = data;
      this.loading = false;
    },

    // ── Auth ──
    onEditToggle() {
      if (this.editMode) {
        this.exitEditMode();
      } else if (this.session) {
        this.editMode = true;
      } else {
        this.showLoginModal = true;
        this.loginEmail = "";
        this.loginPassword = "";
        this.loginError = "";
        this.$nextTick(() => {
          if (this.$refs.loginEmailInput) this.$refs.loginEmailInput.focus();
        });
      }
    },
    closeLoginModal() {
      this.showLoginModal = false;
      this.loginEmail = "";
      this.loginPassword = "";
      this.loginError = "";
    },
    async submitLogin() {
      this.loginError = "";
      this.loginLoading = true;
      const { error } = await supabase.auth.signInWithPassword({
        email: this.loginEmail,
        password: this.loginPassword
      });
      this.loginLoading = false;
      if (error) {
        this.loginError = "אימייל או סיסמה שגויים";
      } else {
        this.closeLoginModal();
        this.editMode = true;
      }
    },
    async submitSetPassword() {
      this.setPasswordError = "";
      if (this.newPassword.length < 6) {
        this.setPasswordError = "הסיסמה חייבת להכיל לפחות 6 תווים";
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.setPasswordError = "הסיסמאות אינן תואמות";
        return;
      }
      this.setPasswordLoading = true;
      const { error } = await supabase.auth.updateUser({ password: this.newPassword });
      this.setPasswordLoading = false;
      if (error) {
        this.setPasswordError = "שגיאה בהגדרת הסיסמה, נסה שוב";
      } else {
        this.showSetPasswordModal = false;
        this.newPassword = "";
        this.confirmPassword = "";
        window.history.replaceState(null, '', window.location.pathname);
        this.editMode = true;
      }
    },
    openChangePassword() {
      this.changeNewPassword = "";
      this.changeConfirmPassword = "";
      this.changePasswordError = "";
      this.showChangePasswordModal = true;
    },
    closeChangePassword() {
      this.showChangePasswordModal = false;
      this.changeNewPassword = "";
      this.changeConfirmPassword = "";
      this.changePasswordError = "";
    },
    async submitChangePassword() {
      this.changePasswordError = "";
      if (this.changeNewPassword.length < 6) {
        this.changePasswordError = "הסיסמה חייבת להכיל לפחות 6 תווים";
        return;
      }
      if (this.changeNewPassword !== this.changeConfirmPassword) {
        this.changePasswordError = "הסיסמאות אינן תואמות";
        return;
      }
      this.changePasswordLoading = true;
      const { error } = await supabase.auth.updateUser({ password: this.changeNewPassword });
      this.changePasswordLoading = false;
      if (error) {
        this.changePasswordError = "שגיאה בשינוי הסיסמה";
      } else {
        this.closeChangePassword();
      }
    },
    async logout() {
      await supabase.auth.signOut();
      this.exitEditMode();
    },
    exitEditMode() {
      this.editMode = false;
      this.editingId = null;
      this.confirmDeleteId = null;
      this.showAddForm = false;
    },

    // ── Row editing ──
    startEdit(row) {
      this.confirmDeleteId = null;
      this.showAddForm = false;
      this.editingId = row.id;
      this.editForm = { name: row.name, position: row.position, phone: row.phone };
    },
    async saveEdit() {
      const { error } = await supabase
        .from('contacts')
        .update({ name: this.editForm.name, position: this.editForm.position, phone: this.editForm.phone })
        .eq('id', this.editingId);
      if (!error) {
        const idx = this.darcash.findIndex(r => r.id === this.editingId);
        if (idx !== -1) this.$set(this.darcash, idx, { ...this.darcash[idx], ...this.editForm });
      }
      this.editingId = null;
    },
    cancelEdit() {
      this.editingId = null;
    },

    // ── Delete ──
    askDelete(row) {
      this.editingId = null;
      this.confirmDeleteId = row.id;
    },
    async doDelete(row) {
      const { error } = await supabase.from('contacts').delete().eq('id', row.id);
      if (!error) {
        const idx = this.darcash.findIndex(r => r.id === row.id);
        if (idx !== -1) this.darcash.splice(idx, 1);
      }
      this.confirmDeleteId = null;
    },

    // ── Add row ──
    startAdd() {
      this.editingId = null;
      this.confirmDeleteId = null;
      this.addForm = { name: "", position: "", phone: "" };
      this.showAddForm = true;
      this.$nextTick(() => {
        if (this.$refs.addNameInput) this.$refs.addNameInput.focus();
      });
    },
    async saveAdd() {
      if (!this.addForm.name.trim() && !this.addForm.position.trim()) return;
      const { data, error } = await supabase
        .from('contacts')
        .insert({ name: this.addForm.name, position: this.addForm.position, phone: this.addForm.phone })
        .select()
        .single();
      if (!error && data) this.darcash.push(data);
      this.showAddForm = false;
    },
    cancelAdd() {
      this.showAddForm = false;
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
  flex-direction: column;
  align-items: center;
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

/* ── EDIT MODE ── */
.edit-mode-banner {
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e8f5ec;
  border: 1.5px solid #3a6b4a;
  border-radius: 10px;
  padding: 0.8vh 1.2vw;
  margin-bottom: 1vh;
  direction: rtl;
}

.edit-mode-label {
  font-family: "assistant-bold";
  font-size: 0.95vw;
  color: #3a6b4a;
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: 0.6vw;
}

.banner-btn {
  background: transparent;
  border: 1.5px solid #3a6b4a;
  border-radius: 8px;
  padding: 0.4vh 0.8vw;
  font-family: "assistant-bold";
  font-size: 0.8vw;
  color: #3a6b4a;
  cursor: pointer;
  transition: background 0.15s;
}
.banner-btn:hover { background: #d0ebda; }

.banner-btn-logout {
  border-color: #bf2020;
  color: #bf2020;
}
.banner-btn-logout:hover { background: #ffeaea; }

.exit-edit-btn {
  background: #3a6b4a;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5vh 1vw;
  font-family: "assistant-bold";
  font-size: 0.85vw;
  cursor: pointer;
  transition: background 0.15s;
}
.exit-edit-btn:hover { background: #2d5239; }

.col-actions {
  width: 5vw;
  text-align: center;
  padding: 0.5vh 0.5vw !important;
  white-space: nowrap;
  border-left: 2px solid #f5f5f7;
}

.action-btn {
  width: 1.6vw;
  height: 1.6vw;
  border: none;
  border-radius: 50%;
  font-size: 0.75vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.1s;
  margin: 0 0.1vw;
  padding: 0;
  line-height: 1;
}
.action-btn:hover { transform: scale(1.1); }

.btn-edit   { background: #e8f0ff; color: #1a5bbf; }
.btn-edit:hover  { background: #d0e0ff; }
.btn-del    { background: #ffeaea; color: #bf2020; }
.btn-del:hover   { background: #ffd0d0; }
.btn-save   { background: #e8f5ec; color: #2d7a47; }
.btn-save:hover  { background: #d0ebda; }
.btn-cancel { background: #f5f5f7; color: #636366; }
.btn-cancel:hover { background: #e5e5ea; }

.row-editing td       { background: #f0f7ff !important; }
.row-confirm-delete td { background: #fff3f3 !important; }
.row-adding td        { background: #f0fff4 !important; }

.delete-confirm-text {
  font-family: "assistant-bold";
  color: #bf2020;
  font-size: 0.95vw;
}

.edit-input {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #b0c8d8;
  border-radius: 6px;
  padding: 0.4vh 0.5vw;
  font-family: "assistant";
  font-size: 0.9vw;
  color: #1d1d1f;
  background: #fff;
  outline: none;
  direction: rtl;
  text-align: right;
}
.edit-input:focus { border-color: #3a6b4a; }
.edit-input-ltr { direction: ltr; text-align: left; }

.add-row-wrapper {
  width: 60vw;
  display: flex;
  justify-content: flex-end;
  direction: rtl;
}

.add-row-btn {
  background: #3a6b4a;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.8vh 1.4vw;
  font-family: "assistant-bold";
  font-size: 0.9vw;
  cursor: pointer;
  transition: background 0.15s;
}
.add-row-btn:hover { background: #2d5239; }

/* ── EDIT TOGGLE BUTTON ── */
.edit-toggle-btn {
  position: fixed;
  bottom: 2vh;
  left: 1.5vw;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18), 0 6px 20px rgba(0,0,0,0.1);
  font-size: 1.2vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s, transform 0.15s;
  z-index: 40;
}
.edit-toggle-btn:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12);
  transform: scale(1.05);
}

/* ── MODALS ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-modal {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5vw 3vw;
  width: 22vw;
  min-width: 280px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2), 0 24px 60px rgba(0,0,0,0.12);
  direction: rtl;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
}

.modal-title {
  font-family: "assistant-extrabold";
  font-size: 1.2vw;
  color: #1d1d1f;
  margin-bottom: 0.3vh;
}

.modal-pw-input {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid #d0e4d8;
  border-radius: 10px;
  padding: 1vh 1vw;
  font-family: "assistant";
  font-size: 1vw;
  color: #1d1d1f;
  outline: none;
  direction: ltr;
  text-align: left;
}
.modal-pw-input:focus { border-color: #3a6b4a; box-shadow: 0 0 0 3px rgba(58,107,74,0.1); }

.modal-error {
  font-family: "assistant";
  font-size: 0.85vw;
  color: #bf2020;
}

.modal-btns {
  display: flex;
  gap: 0.8vw;
  justify-content: flex-start;
  margin-top: 0.5vh;
}

.modal-btn-cancel {
  background: #f5f5f7;
  border: none;
  border-radius: 8px;
  padding: 0.7vh 1.2vw;
  font-family: "assistant-bold";
  font-size: 0.9vw;
  color: #636366;
  cursor: pointer;
  transition: background 0.15s;
}
.modal-btn-cancel:hover { background: #e5e5ea; }

.modal-btn-ok {
  background: #3a6b4a;
  border: none;
  border-radius: 8px;
  padding: 0.7vh 1.2vw;
  font-family: "assistant-bold";
  font-size: 0.9vw;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.15s;
}
.modal-btn-ok:hover { background: #2d5239; }
.modal-btn-ok:disabled { opacity: 0.6; cursor: default; }

/* Modal transition */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .password-modal,
.modal-fade-leave-active .password-modal { transition: transform 0.2s ease, opacity 0.2s ease; }
.modal-fade-enter .password-modal,
.modal-fade-leave-to .password-modal { transform: scale(0.92) translateY(12px); opacity: 0; }

/* ── SEARCH ── */
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
.desktop-search-input::placeholder { color: #aeaeb2; font-family: "assistant"; }

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

.drop-enter-active, .drop-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.drop-enter, .drop-leave-to { opacity: 0; transform: translateY(-6px); }

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
.edit-toggle-btn { display: none; }

/* ── MOBILE ── */
@media (max-device-width: 600px) {
  #darcash         { padding-top: 6vh; padding-bottom: 8vh; margin: 0px; height: 100vh; }
  .title           { font-size: 5.5vw; }
  .divider         { width: 12vw; }
  #table-container { display: none; }
  .desktop-search-wrapper { display: none; }

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

  .no-results { color: #aaa; font-family: "assistant"; cursor: default; }
  .no-results:active { background: transparent; }

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

  .trigger-label { font-family: "assistant-bold"; font-size: 4.2vw; color: #1d1d1f; }

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

  .drop-enter-active, .drop-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
  .drop-enter, .drop-leave-to { opacity: 0; transform: translateY(-6px); }

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

  .card-divider { border-top: 1px solid #e5e5ea; }

  .card-name { font-family: "assistant-bold"; font-size: 4.5vw; color: #1d1d1f; }

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

  .card-enter-active { transition: opacity 0.2s ease; }
  .card-leave-active  { transition: opacity 0.15s ease; }
  .card-enter-active .cards-sheet { transition: transform 0.22s ease, opacity 0.2s ease; }
  .card-leave-active .cards-sheet { transition: transform 0.15s ease, opacity 0.15s ease; }
  .card-enter .cards-sheet, .card-leave-to .cards-sheet { transform: scale(0.9) translateY(16px); opacity: 0; }
  .card-enter  { opacity: 0; }
  .card-leave-to { opacity: 0; }
}

/* ── DESKTOP: show edit toggle ── */
@media (min-device-width: 601px) {
  .edit-toggle-btn { display: flex; }
}
</style>
