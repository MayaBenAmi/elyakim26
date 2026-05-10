<template>
    <div id="routine">
        <img class="logo" src="@/assets/media/logo.png" alt="לוגו">
        <div class="title">{{ title }}</div>
        <div class="divider"></div>
        <div class="number-container">
            <button
                v-for="(item, index) in routineItems"
                :key="index"
                class="number"
                :class="{ 'shine-animate': shiningIndex === index }"
                @click="pick(index)"
            >
                <span class="number-text">{{ item.title }}</span>
            </button>
        </div>
    </div>
</template>

<script>
    import json from "../../text.json";
    export default {
        name: 'routine',
        props: ['title'],
        data() {
            return {
                routineItems: json["routine"],
                shiningIndex: null
            }
        },
        mounted() {
            const tp = document.getElementById('text-page');
            if (tp) tp.scrollTop = 0;
            window.scrollTo(0, 0);
        },
        methods: {
            pick(index) {
                this.shiningIndex = null;
                this.$nextTick(() => { this.shiningIndex = index; });
                setTimeout(() => { this.shiningIndex = null; }, 420);
            }
        }
    }
</script>

<style scoped>
#routine {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f5f5f7;
    gap: 3.5vh;
    overflow: hidden;
}

.logo {
    height: 7vh;
    width: auto;
    object-fit: contain;
    user-select: none;
}

.title {
    font-family: "assistant-extrabold";
    font-size: 2.25vw;
    color: #1d1d1f;
    letter-spacing: -0.02em;
}

.divider {
    width: 3vw;
    height: 2px;
    background: #d2d2d7;
    border-radius: 2px;
    margin-top: -2vh;
}

.number-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.2vw;
    width: 80vw;
}

.number {
    flex: 0 0 calc(25% - 0.9vw);
    position: relative;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #d0e4d8;
    border-radius: 10px;
    padding: 3.5vh 2vw;
    cursor: pointer;
    transition: box-shadow 0.2s, border-color 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}

.number:hover {
    box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.09);
    border-color: #3a6b4a;
}

.number-text {
    font-family: "assistant-bold";
    font-size: 1.3vw;
    color: #1d1d1f;
    user-select: none;
    position: relative;
    z-index: 1;
}

.number::after {
    content: '';
    position: absolute;
    top: 0;
    left: -80%;
    width: 55%;
    height: 100%;
    background: linear-gradient(
        120deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.6) 50%,
        rgba(255,255,255,0) 100%
    );
    opacity: 0;
    pointer-events: none;
}

.number.shine-animate::after {
    animation: btnShine 0.4s ease-in-out forwards;
    opacity: 1;
}

@keyframes btnShine {
    from { left: -80%; }
    to   { left: 120%; }
}

@media (min-width: 1600px) {
    .title       { font-size: 3.8vw; }
    .number-text { font-size: 1.8vw; }
}

@media (max-device-width: 600px) {
    .logo    { height: 4vh; }
    .title   { font-size: 6.5vw; }
    .divider { width: 15vw; }

    .number-container {
        flex-direction: column;
        gap: 2.5vw;
        width: 88vw;
    }

    .number      { flex: none; width: 100%; padding: 2.5vh 4vw; border-radius: 20px; }
    .number-text { font-size: 4.2vw; }
}
</style>
