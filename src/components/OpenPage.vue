<template>
    <div id="open-page">
        <img class="wave" id="wave0" src="@/assets/media/wave0.svg" alt="">
        <img class="wave" id="wave1" src="@/assets/media/wave1.svg" alt="">
        <div class="glow-orb orb1"></div>
        <div class="glow-orb orb2"></div>
        <div class="glow-orb orb3"></div>
        <div class="content">
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
        top: 0;
        right: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        overflow: hidden;
        background: linear-gradient(160deg, #0a0f1e 0%, #0d1529 40%, #101e35 70%, #0a1628 100%);
    }
    .wave {
        width: 100vw;
        position: absolute;
        right: 0;
        user-select: none;
        opacity: 0.3;
        z-index: 1;
        transform: scale(1.03);
    }
    
    
    #wave0 { top: -5vh; }
    #wave1 { top: 30vh; }


    .glow-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(75px);
        pointer-events: none;
        z-index: 0;
    }

    .orb1 {
        width: 40vw;
        height: 40vw;
        background: radial-gradient(circle, rgba(100, 160, 255, 0.18) 0%, transparent 68%);
        top: -10vw;
        right: -8vw;
        animation: floatOrb1 9s ease-in-out infinite;
    }

    .orb2 {
        width: 32vw;
        height: 32vw;
        background: radial-gradient(circle, rgba(60, 100, 220, 0.12) 0%, transparent 68%);
        bottom: -8vw;
        left: 5vw;
        animation: floatOrb2 11s ease-in-out infinite;
    }

    .orb3 {
        width: 22vw;
        height: 22vw;
        background: radial-gradient(circle, rgba(80, 130, 255, 0.14) 0%, transparent 68%);
        top: 30vh;
        left: -6vw;
        animation: floatOrb3 13s ease-in-out infinite;
    }

    @keyframes floatOrb1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33%       { transform: translate(-3vw, 4vh) scale(1.08); }
        66%       { transform: translate(2vw, -3vh) scale(0.94); }
    }

    @keyframes floatOrb2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        40%       { transform: translate(4vw, -5vh) scale(1.1); }
        70%       { transform: translate(-2vw, 3vh) scale(0.92); }
    }

    @keyframes floatOrb3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50%       { transform: translate(3vw, -6vh) scale(1.12); }
    }

    .content {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5vh;
        padding: 4vh 4vw;
        width: 100%;
        animation: fadeUp 0.8s ease-out both;
    }

    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    .main-title {
        font-family: "assistant-extrabold";
        font-size: 3.2vw;
        color: #E6EDF3;
        animation: titlePulse 4s ease-in-out infinite;
    }

    @keyframes titlePulse {
        0%, 100% { text-shadow: 0 0 40px rgba(100, 160, 255, 0.35), 0 2px 8px rgba(0,0,0,0.4); }
        50%       { text-shadow: 0 0 55px rgba(100, 160, 255, 0.55), 0 2px 8px rgba(0,0,0,0.4); }
    }

    .divider {
        width: 12vw;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(100, 160, 255, 0.7), transparent);
        border-radius: 2px;
        margin-top: -1vh;
        animation: dividerGlow 4s ease-in-out infinite;
    }

    @keyframes dividerGlow {
        0%, 100% { opacity: 0.7; width: 12vw; }
        50%       { opacity: 1;   width: 16vw; }
    }

    .cards {
        display: flex;
        gap: 2.5vw;
        justify-content: center;
        width: 100%;
    }

    .card {
        background: linear-gradient(145deg, rgba(20, 35, 70, 1), rgba(10, 18, 40, 0.65));
        border: 1px solid rgba(100, 160, 255, 0.2);
        border-radius: 1vw;
        padding: 2.8vh 2.5vw;
        width: 28vw;
        backdrop-filter: blur(14px);
        display: flex;
        flex-direction: column;
        gap: 1.5vh;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(100, 160, 255, 0.1);
        transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    }

    .card:hover {
        border-color: rgba(100, 160, 255, 0.45);
        box-shadow: 0 14px 42px rgba(0, 0, 0, 0.4), 0 0 22px rgba(80, 130, 255, 0.15);
        transform: translateY(-3px);
    }

    .card-title {
        font-family: "assistant-bold";
        font-size: 1.3vw;
        color: #a8c8ff;
        border-bottom: 1px solid rgba(100, 160, 255, 0.2);
        padding-bottom: 1vh;
    }

    .card-txt {
        font-family: "assistant";
        font-size: 1.05vw;
        color: #c8d8ee;
        line-height: 1.8;
    }

    .values-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.8vw;
    }

    .value-item {
        font-family: "assistant-bold";
        font-size: 1vw;
        color: #a8c8ff;
        user-select: none;
        background: rgba(100, 160, 255, 0.08);
        border: 1px solid rgba(100, 160, 255, 0.25);
        border-radius: 0.5vw;
        padding: 0.45vh 1.4vw;
        transition: background 0.25s, border-color 0.25s, color 0.25s;
    }

    .value-item:hover {
        background: rgba(100, 160, 255, 0.15);
        border-color: rgba(100, 160, 255, 0.5);
        color: #d0e4ff;
    }

    .enter-btn {
        font-family: "assistant-bold";
        font-size: 1.2vw;
        color: #E6EDF3;
        background: linear-gradient(135deg, rgba(40, 80, 160, 0.8), rgba(20, 50, 120, 0.9));
        border: 1px solid rgba(100, 160, 255, 0.4);
        border-radius: 0.75vw;
        padding: 1.2vh 4vw;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.6vw;
        box-shadow: 0 4px 20px rgba(60, 100, 220, 0.35);
        transition: background 0.25s, box-shadow 0.25s;
        animation: btnPulse 3s ease-in-out infinite;
    }

    @keyframes btnPulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(60, 100, 220, 0.35); }
        50%       { box-shadow: 0 4px 28px rgba(60, 100, 220, 0.6); }
    }

    .enter-btn:hover {
        background: linear-gradient(135deg, rgba(60, 110, 200, 0.9), rgba(30, 70, 160, 1));
        box-shadow: 0 6px 30px rgba(60, 100, 220, 0.65);
        animation: none;
    }

    .btn-arrow {
        font-size: 1vw;
        transition: transform 0.2s;
    }

    .enter-btn:hover .btn-arrow {
        transform: translateX(-4px);
    }

    /* MOBILE */
    @media (max-device-width: 600px) {
        .wave {
          width: 500vw;
          right: -50vw;
        }
        #wave0 { top: -50vh; }
        #wave1 { top: 10vh; }
        .orb1 { width: 75vw; height: 75vw; }
        .orb2 { width: 60vw; height: 60vw; }
        .orb3 { width: 45vw; height: 45vw; }

        .main-title { font-size: 6.5vw; }
        .divider    { width: 30vw; }

        .cards {
            flex-direction: column;
            align-items: center;
            gap: 2vh;
        }

        .card {
            width: 84vw;
            border-radius: 2vw;
        }

        .card-title { font-size: 4.2vw; }
        .card-txt   { font-size: 3.4vw; }

        .value-item {
            font-size: 3.2vw;
            border-radius: 1vw;
            padding: 0.5vh 3vw;
        }

        .enter-btn {
            font-size: 4.5vw;
            padding: 1.2vh 10vw;
            border-radius: 2vw;
        }

        .btn-arrow { font-size: 4vw; }
    }
</style>
