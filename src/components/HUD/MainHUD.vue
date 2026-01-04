<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MobileNav from './MobileNav.vue';
import { useAudioSystem } from '../../composables/useAudioSystem'; // Import

defineProps({
  currentView: String
})

defineEmits(['change-view'])

const { isMuted, initAudio, toggleMute, metadata } = useAudioSystem(); // Init Composable

const hudData = ref({
  date: '',
  time: '',
  location: 'TERRA'
});
let timer = null;

const updateTime = () => {
  const now = new Date();
  
  // Format Date manually to ensure YYYY.MM.DD in LOCAL time
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  const dateStr = `${year}.${month}.${day}`;
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  
  hudData.value.date = dateStr;
  hudData.value.time = timeStr;
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
  
  // Init Audio (will try autoplay)
  // Defer slightly to ensure user interaction capability if possible, though mounted is auto.
  // We'll rely on the user clicking the Mute button if autoplay fails/mutes.
  initAudio();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="hud-container">
    <!-- Top Bar Status -->
    <header class="hud-header">
      <div class="header-left-group">
        <div class="system-status">
          <span class="status-dot"></span> SYSTEM ONLINE
        </div>

        <!-- Desktop Audio Player -->
        <div class="audio-player-desktop">
           <button 
             class="audio-btn" 
             @click="toggleMute" 
             :title="isMuted ? 'UNMUTE AUDIO' : 'MUTE AUDIO'"
           >
             <!-- Icon Speaker On/Off -->
             <svg v-if="!isMuted" viewBox="0 0 24 24"><path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16.02C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /></svg>
             <svg v-else viewBox="0 0 24 24"><path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" /></svg>
           </button>
           <div class="audio-info">
             <div class="audio-visualizer">
               <div class="bar"></div>
               <div class="bar"></div>
               <div class="bar"></div>
               <div class="bar"></div>
             </div>
           </div>
        </div>
      </div>
      
      <div class="header-controls">
        <div class="time-display">
          <!-- Date -->
          <span class="hud-group">
            <svg class="hud-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14v10m0-12H5V6h14v2m-7 5h5v5h-5v-5z"/></svg>
            {{ hudData.date }}
          </span>
          <span class="separator">|</span>
          
          <!-- Time -->
          <span class="hud-group time-value">
            <svg class="hud-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 32 2 27.53 2 22A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5z"/></svg>
            {{ hudData.time }}
          </span>
          
          <!-- Location (Desktop Only) -->
          <span class="separator location-sep">//</span>
          <span class="hud-group location-group">
            <svg class="hud-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m-1-12h2v2h-2zm0 4h2v6h-2z"/></svg>
            {{ hudData.location }}
          </span>
        </div>
        
        <MobileNav /> <!-- Integrated here -->
      </div>
    </header>

    <div class="main-viewport">
      <slot></slot>
    </div>

    <!-- Decorative corners -->
    <div class="corner top-left"></div>
    <div class="corner top-right"></div>
    <div class="corner bottom-left"></div>
    <div class="corner bottom-right"></div>
  </div>
</template>

<style scoped>
.hud-container {
  width: 80vw; /* Reduced from 95vw (~2 columns less) */
  height: 90vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 30px 60px; /* Increased side padding */
  border: 1px solid var(--glass-border);
  background: rgba(10, 14, 20, 0.6); /* More transparent */
  backdrop-filter: blur(3px); /* Reduced blur */
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); /* Deep shadow for 3D separation */
}

.hud-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center vertically */
  border-bottom: 1px solid var(--glass-border);
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-family: var(--font-main);
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: var(--neon-blue);
  height: 40px; /* Pre-define height to accommodate button */
}

.header-left-group {
    display: flex;
    align-items: center;
    gap: 20px;
}

.audio-player-desktop {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 20px;
    border-left: 1px solid var(--glass-border);
}

.audio-btn {
    background: transparent;
    border: none;
    color: var(--neon-blue);
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 0;
    opacity: 0.8;
    transition: opacity 0.3s;
}
.audio-btn:hover { opacity: 1; text-shadow: 0 0 5px var(--neon-blue); }
.audio-btn svg { width: 100%; height: 100%; }

.audio-info {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    opacity: 0.8;
}

.music-label { color: var(--neon-purple); font-weight: bold; font-size: 0.6rem; }
.track-name { font-family: var(--font-code); }

.header-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}
.time-display {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hud-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Tabular nums for time to prevent jitter */
.time-value {
  font-variant-numeric: tabular-nums;
  min-width: 85px; /* Fixed width reservation for time */
}

.hud-icon {
  width: 14px;
  height: 14px;
  opacity: 0.8;
}

.separator {
  opacity: 0.5;
  margin: 0 4px;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #0f0;
  border-radius: 50%;
  box-shadow: 0 0 5px #0f0;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

.main-viewport {
  flex: 1;
  position: relative;
  overflow: hidden; /* Content scroll happens inside specific panels if needed, but overall no scroll */
}

/* Corners */
.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--neon-blue);
  box-shadow: 0 0 5px var(--neon-blue);
}
.top-left { top: -1px; left: -1px; border-right: none; border-bottom: none; }
.top-right { top: -1px; right: -1px; border-left: none; border-bottom: none; }
.bottom-left { bottom: -1px; left: -1px; border-right: none; border-top: none; }
.bottom-right { bottom: -1px; right: -1px; border-left: none; border-top: none; }

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@media (max-width: 1024px), (max-height: 600px) {
  .hud-container {
    width: calc(100vw - 20px); 
    height: calc(100dvh - 20px); 
    height: calc(100vh - 20px); 
    max-height: none; /* remove 95vh cap for small landscape if needed, or keep safety. 95vh is fine. */
    padding: 10px;
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 5px;
    transform: none !important; 
    margin: auto; 
  }
  
  .hud-header {
    font-size: 0.6rem;
    flex-direction: row; /* KEEP ROW */
    gap: 0;
    align-items: center;
    justify-content: space-between;
    height: auto;
    padding-bottom: 5px;
    padding: 0 5px; /* Lateral padding */
    margin-bottom: 10px;
  }

  /* Hide Left Group (System Status + Desktop Audio) */
  .header-left-group, .audio-player-desktop {
    display: none;
  }
  
  .header-controls {
    width: 100%; /* Take full width since status is hidden */
    justify-content: space-between; /* Push Time to Left, Nav to Right */
  }
  
  .time-display {
    gap: 5px;
    font-size: 0.6rem;
  }
  
  /* Hide Location on Mobile */
  .location-group, .location-sep {
    display: none;
  }
  
  /* Compact date/time */
  .time-value {
    min-width: auto; /* Let it shrink on mobile if needed, or keep tabular */
    min-width: 60px;
  }
}
</style>
