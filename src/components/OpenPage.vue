<template>
    <div id="open-page">
        <div class="content">
            <img class="logo" src="@/assets/media/logo.png" alt="לוגו">
            <div class="main-title">ברוכים הבאים לבא"פ אלייקים</div>
            <div class="divider"></div>
            <div class="cards">
                <div class="card" v-for="item in openPageData" :key="item.title">
                    <div class="card-title">{{ item.title }}</div>
                    <div class="card-txt">{{ item.txt }}</div>
                </div>
            </div>
            <div class="values-list">
                <span class="value-item" v-for="(val, i) in openPageArray" :key="i">{{ val }}</span>
            </div>
            <button class="enter-btn" @click="$emit('homePage')">
                <span class="btn-text">כניסה</span>
            </button>
        </div>
    </div>
</template>

<script>
    import json from "../../text.json";
    export default {
        name: "open-page",
        emits: ["homePage"],
        data() {
            return {
                openPageData: json.openpage,
                openPageArray: json.openpagearray
            }
        }
    }
</script>

<style scoped>
    #open-page {
        position: absolute;
        top: 0; right: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f7;
        overflow: hidden;
        z-index: 10;
    }

.content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4vh;
        padding: 0 4vw;
        width: 100%;
        animation: fadeUp 0.5s ease-out both;
    }

    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .logo {
        height: 8vh;
        width: auto;
        object-fit: contain;
        user-select: none;
    }

    .main-title {
        font-family: "assistant-extrabold";
        font-size: 2.25vw;
        color: #1d1d1f;
        letter-spacing: -0.02em;
    }

    .divider {
        width: 5vw;
        height: 1.5px;
        background: #d2d2d7;
        margin-top: -2.5vh;
    }

    .cards {
        display: flex;
        gap: 1.5vw;
        justify-content: center;
        width: 100%;
    }

    .card {
        background: #ffffff;
        border-radius: 12px;
        padding: 2.5vh 2vw;
        width: 26vw;
        display: flex;
        flex-direction: column;
        gap: 1vh;
        box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
        transition: box-shadow 0.2s, transform 0.2s;
    }

    .card:hover {
        box-shadow: 0 2px 6px rgba(0,0,0,0.07), 0 12px 28px rgba(0,0,0,0.09);
        transform: translateY(-2px);
    }

    .card-title {
        font-family: "assistant-bold";
        font-size: 1.15vw;
        color: #1d1d1f;
        border-bottom: 1px solid #f2f2f2;
        padding-bottom: 0.8vh;
        user-select: none;
    }

    .card-txt {
        font-family: "assistant";
        font-size: 0.95vw;
        color: #6e6e73;
        line-height: 1.7;
        user-select: none;
    }

    .values-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5vw;
    }

    .value-item {
        font-family: "assistant-bold";
        font-size: 0.95vw;
        color: #6e6e73;
        user-select: none;
        padding: 0.35vh 1.1vw;
        border-radius: 980px;
        background: #ffffff;
        border: 1px solid #e5e5ea;
        transition: color 0.2s, border-color 0.2s;
    }

    .value-item:hover {
        color: #1d1d1f;
        border-color: #86868b;
    }

    .enter-btn {
        font-family: "assistant-bold";
        font-size: 1vw;
        color: #ffffff;
        background: #1d1d1f;
        border: none;
        border-radius: 980px;
        padding: 1vh 3vw;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: opacity 0.2s;
    }

    .btn-text {
        position: relative;
        z-index: 1;
    }

    .enter-btn:hover {
        opacity: 0.85;
    }

    /* LARGE SCREEN */
    @media (min-width: 1600px) {
        .main-title  { font-size: 3.8vw; }
        .card-title  { font-size: 1.6vw; }
        .card-txt    { font-size: 1.35vw; }
        .value-item  { font-size: 1.3vw; }
        .enter-btn   { font-size: 1.5vw; }
    }

    /* MOBILE */
    @media (max-device-width: 600px) {
        .logo       { height: 4vh; }
        .main-title { font-size: 6.5vw; }

        .cards {
            flex-direction: column;
            align-items: center;
            gap: 2vh;
        }

        .card       { 
            width: 84vw;
            border-radius: 20px;
        }
        .card-title { font-size: 4.2vw; }
        .card-txt   { font-size: 3.4vw; }

        .value-item { font-size: 3.2vw; padding: 0.5vh 3vw; }

        .enter-btn  { font-size: 4.5vw; padding: 1.2vh 10vw; }
    }
</style>
