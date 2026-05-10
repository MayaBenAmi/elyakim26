<template>
    <div id="fire-map-wrapper" :class="{ fullscreen: isFullscreen }">
        <div id="fire-map-container" ref="mapContainer"></div>
        <button v-if="!isMobile" id="expand-btn" @click="toggleFullscreen">
            {{ isFullscreen ? '✕' : '⛶' }}
        </button>

        <transition :name="isMobile ? 'panel-up' : 'panel-right'">
            <div v-if="panelOpen && activePoi" class="poi-panel" @click.stop
                 :class="'poi-panel--' + panelState"
                 :style="panelDragStyle">
                <div v-if="isMobile" class="poi-panel-handle"
                     @touchstart="onHandleTouchStart"
                     @touchmove.prevent="onHandleTouchMove"
                     @touchend="onHandleTouchEnd"></div>
                <button class="poi-panel-close" @click="closePanel">✕</button>
                <div class="poi-panel-content" dir="rtl">
                    <div v-if="activePoi.name" class="poi-panel-title">{{ activePoi.name }}</div>
                    <template v-if="isMobile && activePoi.txt && activePoi.txt.length">
                        <p v-for="(t, i) in activePoi.txt" :key="i" class="poi-panel-line">• {{ t }}</p>
                    </template>
                    <ul v-else-if="!isMobile && activePoi.txt && activePoi.txt.length" class="poi-panel-list">
                        <li v-for="(t, i) in activePoi.txt" :key="i" class="poi-panel-line">{{ t }}</li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import json from "../../text.json";
import pinUrl from "../assets/media/pin.svg";
import shaftUrl from "../assets/media/shaft.svg";

const AREA_NAMES = {
    "104":         "ש.א 104",
    "108":         "ש.א 108",
    "111":         "ש.א 111",
    "112":         "ש.א 112",
    "108_sumka":   "108 סומקה",
    "108_north":   "108 צפון",
    "108_center":  "108 מרכז",
    "108_south":   "108 דרום",
    "baf-elyakim": 'בא"פ אליקים',
    "112_east":  "112 מזרח",
    "112_north": "112 צפון",
    "112_west":  "112 מערב",
    "112_south": "112 דרום",
    "111_lower":        "111 תחתון",
    "111_upper":        "111 עליון",
    "111_west_bananas": "מערב בננות",
    "111_south":        "111 דרום",
    "111_west_center":   "מרכז",
    "111_main_center":   "111 מרכז",
    "111_north":        "111 צפון",
    "104_matzav_hadash":   "מוצב חדש",
    "104_yardena":         "ירדנה",
    "104_carmela":         "כרמלה",
    "104_horoshet_negus":  "חורשת נגוס",
    "104_horoshet_katina": "חורשת קטינה",
    "104_yael_north":      "יעל צפון",
    "104_yael":            "יעל",
    "104_mishkakim_baesh": "משחקים באש",
};

// Subzones of 111 that should behave like top-level areas (only when area 111 is active)
const TOPLEVEL_SUBZONES = new Set([
    "111_west_bananas",
    "111_lower",
    "111_upper"
]);

// Manual label position overrides — used instead of centroid when specified
const LABEL_POSITIONS = {
    "111_north":        [32.69088, 34.97201],
    "111_west_bananas": [32.6884,  34.97081],
    "111_west_center":  [32.68644, 34.97066],
    "111_south":        [32.68151, 34.97088],
};

function getCentroid(coords) {
    const lat = coords.reduce((s, c) => s + c[0], 0) / coords.length;
    const lng = coords.reduce((s, c) => s + c[1], 0) / coords.length;
    return [lat, lng];
}

function getBBoxArea(coords) {
    const lats = coords.map(c => c[0]);
    const lngs = coords.map(c => c[1]);
    return (Math.max(...lats) - Math.min(...lats)) * (Math.max(...lngs) - Math.min(...lngs));
}

function areaToMinZoom(bboxArea) {
    if (bboxArea > 0.02)  return 11;
    if (bboxArea > 0.005) return 12;
    if (bboxArea > 0.001) return 13;
    return 14;
}

export default {
    name: "fire-map",
    props: ["num"],
    data() {
        return {
            map: null,
            isFullscreen: false,
            isMobile: window.matchMedia("(max-device-width: 600px)").matches,
            labelMarkers: [],
            shaftMarkers: [],
            activePoi: null,
            panelState: "closed",
            activeMarker: null,
            dragStartY: 0,
            dragDeltaY: 0,
            isDragging: false,
        };
    },
    computed: {
        panelOpen() {
            return this.panelState !== "closed";
        },
        panelDragStyle() {
            if (!this.isMobile) return {};
            if (!this.isDragging || this.dragDeltaY === 0) return {};
            return {
                transform: "translateY(" + this.dragDeltaY + "px)",
                transition: "none",
            };
        },
    },
    mounted() {
        this.$nextTick(() => { this._initMap(); });
        document.addEventListener("keydown", this._onEsc);
    },
    beforeDestroy() {
        if (this.map) { this.map.remove(); this.map = null; }
        document.removeEventListener("keydown", this._onEsc);
    },
    methods: {
        _initMap() {
            this.map = L.map(this.$refs.mapContainer, {
                scrollWheelZoom: true,
                zoomControl: true,
                attributionControl: false,
            });
            this.map.invalidateSize();

            L.tileLayer(
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                {
                    attribution: "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
                    maxZoom: 19,
                }
            ).addTo(this.map);

            const borders = json["fire-map-borders"];
            const key = String(this.num);
            const subzonePrefix = key + "_";

            Object.entries(borders).forEach(([borderKey, coords]) => {
                if (!coords || !coords.length) return;

                const isActive  = borderKey === key;
                const isSubzone = borderKey.startsWith(subzonePrefix) &&
                                  !(key === "111" && TOPLEVEL_SUBZONES.has(borderKey));

                const w = this.isMobile ? 2 : 1;
                if (isActive) {
                    L.polygon(coords, {
                        color: "#1a1a1a", weight: 2.5 + w,
                        fillColor: "#ffffff", fillOpacity: 0.55,
                    }).addTo(this.map);
                } else if (isSubzone) {
                    L.polygon(coords, {
                        color: "#1a1a1a", weight: 1.5 + w,
                        fillColor: "#000000", fillOpacity: 0.2,
                        dashArray: "5, 5",
                    }).addTo(this.map);
                } else {
                    L.polygon(coords, {
                        color: "#1a1a1a", weight: 2 + w, fillOpacity: 0,
                    }).addTo(this.map);
                }

                const name = AREA_NAMES[borderKey];
                if (name) {
                    const centroid = LABEL_POSITIONS[borderKey] || getCentroid(coords);
                    const minZoom  = areaToMinZoom(getBBoxArea(coords));
                    const marker   = L.marker(centroid, {
                        icon: L.divIcon({
                            className: "",
                            html: `<div class="area-label ${isSubzone ? "area-label--sub" : ""}">${name}</div>`,
                            iconSize: [0, 0],
                            iconAnchor: [0, 0],
                        }),
                        interactive: false,
                        zIndexOffset: isSubzone ? 500 : 1000,
                    });
                    const isMainArea = ["104","108","111","112"].indexOf(borderKey) !== -1;
                    this.labelMarkers.push({ marker, minZoom, isMainArea });
                }
            });

            const mainBorder = borders[key];
            if (mainBorder && mainBorder.length) {
                this.map.fitBounds(L.latLngBounds(mainBorder), { padding: [30, 30] });
            }
            this._initialZoom = this.map.getZoom();
            const mainMinZoom = mainBorder && mainBorder.length
                ? areaToMinZoom(getBBoxArea(mainBorder))
                : 12;

            const pinSize = this.isMobile ? 96 : 40;
            const pinAnchorY = Math.round(pinSize * 0.854);
            const pinIcon = L.icon({
                iconUrl: pinUrl,
                iconSize: [pinSize, pinSize],
                iconAnchor: [pinSize / 2, pinAnchorY],
            });

            this._updateLabels();
            this._updateShafts();
            this.map.on("zoomend", this._updateLabels);
            this.map.on("zoomend", this._updateShafts);

            const self = this;
            const pois = json[`poi_${key}`] || [];
            pois.forEach(function(poi) {
                if (!poi.coordinates) return;
                const marker = L.marker(poi.coordinates, { icon: pinIcon }).addTo(self.map);
                if (!poi.txt || !poi.txt.length) return;
                marker.on("click", function(e) {
                    L.DomEvent.stopPropagation(e);
                    self.openPanel(poi, marker);
                });
            });

            const shaftSize = this.isMobile ? 56 : 24;
            const shaftIcon = L.icon({
                iconUrl: shaftUrl,
                iconSize: [shaftSize, shaftSize],
                iconAnchor: [shaftSize / 2, shaftSize / 2],
            });

            const shaftsAndRoutes = json["shafts-and-routes"] || [];
            shaftsAndRoutes.forEach(function(item) {
                if (item.isShaft && item.coordinates) {
                    var m = L.marker(item.coordinates, { icon: shaftIcon });
                    m.on("click", function(e) {
                        L.DomEvent.stopPropagation(e);
                        self.openPanel(item, m);
                    });
                    self.shaftMarkers.push(m);
                } else if (item.isRoute && item.coordinates) {
                    L.polyline(item.coordinates, {
                        color: "#7C3AED",
                        weight: self.isMobile ? 4 : 2.5,
                        opacity: 0.85,
                    }).addTo(self.map);
                    if (item.name) {
                        var mid = item.coordinates[Math.floor(item.coordinates.length / 2)];
                        var routeLabel = L.marker(mid, {
                            icon: L.divIcon({
                                className: "",
                                html: '<div class="route-label">' + item.name + '</div>',
                                iconSize: [0, 0],
                                iconAnchor: [0, 0],
                            }),
                            interactive: false,
                            zIndexOffset: 800,
                        });
                        self.labelMarkers.push({ marker: routeLabel, minZoom: mainMinZoom, isMainArea: true });
                    }
                }
            });

            this.map.on("click", function() { self.closePanel(); });
        },

        _updateShafts() {
            const zoom = this.map.getZoom();
            const minZoom = 13;
            this.shaftMarkers.forEach(function(marker) {
                if (zoom >= minZoom) {
                    if (!this.map.hasLayer(marker)) marker.addTo(this.map);
                } else {
                    if (this.map.hasLayer(marker)) marker.remove();
                }
            }, this);
        },

        _updateLabels() {
            const zoom = this.map.getZoom();
            this.labelMarkers.forEach(function(item) {
                var threshold;
                if (this.isMobile) {
                    threshold = item.isMainArea ? this._initialZoom : this._initialZoom + 1.5;
                } else {
                    threshold = item.minZoom;
                }
                if (zoom >= threshold) {
                    if (!this.map.hasLayer(item.marker)) item.marker.addTo(this.map);
                } else {
                    if (this.map.hasLayer(item.marker)) item.marker.remove();
                }
            }, this);
        },

        onHandleTouchStart(e) {
            this.dragStartY = e.touches[0].clientY;
            this.dragDeltaY = 0;
            this._rawDragDelta = 0;
            this.isDragging = true;
        },
        onHandleTouchMove(e) {
            if (!this.isDragging) return;
            const delta = e.touches[0].clientY - this.dragStartY;
            this._rawDragDelta = delta;
            // Only apply downward translateY when open; no visual drag when collapsed
            this.dragDeltaY = this.panelState === "open" ? Math.max(0, delta) : 0;
        },
        onHandleTouchEnd() {
            this.isDragging = false;
            const raw = this._rawDragDelta || 0;
            this._rawDragDelta = 0;
            if (this.panelState === "open" && raw > 80) {
                this.panelState = "collapsed";
            } else if (this.panelState === "collapsed" && raw < -60) {
                this.panelState = "open";
            }
            this.dragDeltaY = 0;
        },

        _setMarkerHighlight(marker, active) {
            if (!marker) return;
            var el = marker.getElement();
            if (!el) return;
            var img = el.querySelector("img");
            var target = img || el;
            if (active) {
                target.style.filter = "drop-shadow(0 0 3px #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 10px #fff) drop-shadow(0 0 14px #fff)";
                target.style.transition = "filter 0.2s ease";
            } else {
                target.style.filter = "";
            }
        },
        openPanel(poi, marker) {
            this._setMarkerHighlight(this.activeMarker, false);
            this.activeMarker = marker || null;
            this._setMarkerHighlight(this.activeMarker, true);
            this.activePoi = poi;
            this.panelState = "open";
            this.dragDeltaY = 0;
            this.isDragging = false;
        },
        closePanel() {
            this._setMarkerHighlight(this.activeMarker, false);
            this.activeMarker = null;
            this.panelState = "closed";
            this.dragDeltaY = 0;
            this.isDragging = false;
        },
        _onEsc(e) {
            if (e.key === "Escape") this.closePanel();
        },

        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen;
            this.$nextTick(() => { this.map.invalidateSize(); });
        },
    },
};
</script>

<style scoped>
#fire-map-wrapper {
    position: relative;
    width: 90vw;
    height: 65vh;
    margin: 3vh auto 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
}

#fire-map-wrapper.fullscreen {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    margin: 0;
    border-radius: 0;
    z-index: 9999;
}

#fire-map-container { width: 100%; height: 100%; }

#fire-map-container :deep(.leaflet-tile-pane) {
    filter: brightness(1.3) saturate(0.6);
}

#fire-map-container :deep(.area-label) {
    background: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    transform: translate(-50%, -50%);
    display: inline-block;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.6);
}

#fire-map-container :deep(.area-label--sub) {
    font-size: 11px;
    font-weight: 600;
    background: rgba(0, 0, 0, 0.4);
    padding: 2px 5px;
}

#fire-map-container :deep(.route-label) {
    display: inline-block;
    background: rgba(124, 58, 237, 0.85);
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    white-space: nowrap;
    border: none;
    box-shadow: none;
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    direction: rtl;
}


#expand-btn {
    position: absolute;
    top: 10px; right: 10px;
    z-index: 1000;
    background: rgba(255,255,255,0.9);
    border: none;
    border-radius: 6px;
    width: 32px; height: 32px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 5px rgba(0,0,0,0.3);
    transition: background 0.15s;
}

#expand-btn:hover { background: rgba(255,255,255,1); }

/* ── Panel base (desktop: slide in from right) ── */
.poi-panel {
    position: fixed;
    z-index: 3100;
    background: #ffffff;
    box-shadow: 0 -2px 20px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    border-radius: 0;
    padding: 24px 20px 24px;
}

/* ── Panel content ── */
.poi-panel-close {
    align-self: flex-end;
    background: none;
    border: none;
    font-size: 18px;
    color: #555;
    cursor: pointer;
    padding: 0 0 12px 0;
    line-height: 1;
}
.poi-panel-close:hover { color: #000; }

.poi-panel-content {
    flex: 1;
    font-size: 14px;
    line-height: 1.7;
    color: #1d1d1f;
    text-align: start;
}

.poi-panel-title {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
    color: #1d1d1f;
}

.poi-panel-list {
    padding-right: 18px;
    padding-left: 0;
    margin: 0;
    list-style: disc;
}

.poi-panel-line { margin: 4px 0; }

/* ── Desktop slide-right transition ── */
.panel-right-enter-active,
.panel-right-leave-active { transition: transform 0.3s ease; }
.panel-right-enter,
.panel-right-leave-to { transform: translateX(100%); }


@media (max-device-width: 600px) {
    #fire-map-wrapper {
        width: 94vw;
        height: 65vh;
        border-radius: 14px;
    }

    #fire-map-container :deep(.area-label) {
        font-size: 35px;
        padding: 6px 12px;
    }

    #fire-map-container :deep(.area-label--sub) {
        font-size: 29px;
        padding: 4px 9px;
    }

    #fire-map-container :deep(.route-label) {
        font-size: 22px;
        padding: 4px 10px;
    }

    /* Mobile: bottom sheet */
    .poi-panel {
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        border-radius: 20px 20px 0 0;
        padding: 12px 0 0;
        box-shadow: 0 -4px 24px rgba(0,0,0,0.18);
        transition: max-height 0.35s ease, min-height 0.35s ease;
    }

    .poi-panel--open {
        min-height: 35vh;
        max-height: 38vh;
    }

    .poi-panel--collapsed {
        min-height: 0;
        max-height: fit-content;
        overflow-y: visible;
    }

    .poi-panel-handle {
        width: 100%;
        min-height: 44px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        touch-action: none;
        cursor: grab;
        margin-bottom: 4px;
    }

    .poi-panel-handle::before {
        content: '';
        display: block;
        width: 44px;
        height: 5px;
        background: #d1d1d6;
        border-radius: 3px;
    }

    .poi-panel-close {
        font-size: 7vw;
        padding: 0 36px 16px;
    }

    .poi-panel-title {
        font-size: 5vw;
        margin-bottom: 12px;
    }

    .poi-panel-content {
        font-size: 3.7vw;
        line-height: 2;
        padding: 0 36px 28px;
    }

    .poi-panel-line { margin: 8px 0; }

    /* Mobile slide-up transition */
    .panel-up-enter-active,
    .panel-up-leave-active { transition: transform 0.3s ease; }
    .panel-up-enter,
    .panel-up-leave-to { transform: translateY(100%); }
}
</style>
