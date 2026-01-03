<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  currentView: String
})

defineEmits(['change-view'])

const hudData = ref({
  date: '',
  time: '',
  location: 'TERRA'
});
let timer = null;

const updateTime = () => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '.');
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  
  hudData.value.date = dateStr;
  hudData.value.time = timeStr;
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="hud-container">
    <!-- Top Bar Status -->
    <header class="hud-header">
      <div class="system-status">
        <span class="status-dot"></span> SYSTEM ONLINE
      </div>
      <div class="time-display">
        <!-- Date -->
        <span class="hud-group">
          <svg class="hud-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14v10m0-12H5V6h14v2m-7 5h5v5h-5v-5z"/></svg>
          {{ hudData.date }}
        </span>
        <span class="separator">|</span>
        
        <!-- Time -->
        <span class="hud-group">
          <svg class="hud-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 32 2 27.53 2 22A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5z"/></svg>
          {{ hudData.time }}
        </span>
        <span class="separator">//</span>
        
        <!-- Location -->
        <span class="hud-group">
          <svg class="hud-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m-1-12h2v2h-2zm0 4h2v6h-2z"/></svg>
          {{ hudData.location }}
        </span>
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
  border-radius: 4px; 
  border: 1px solid rgba(0, 243, 255, 0.3);
  background: rgba(5, 10, 16, 0.6); /* Transparent dark */
  backdrop-filter: blur(10px); /* Blur effect */
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5); /* Deep shadow for 3D separation */
}

.hud-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-family: var(--font-main);
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: var(--neon-blue);
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
</style>
