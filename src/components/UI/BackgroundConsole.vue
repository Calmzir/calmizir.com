<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { useSystemLogs } from '../../composables/useSystemLogs';

const { logs, addLog } = useSystemLogs();
const consoleBody = ref(null);

// Auto-scroll to bottom when logs update
watch(logs, async () => {
  await nextTick();
  if (consoleBody.value) {
    consoleBody.value.scrollTop = consoleBody.value.scrollHeight;
  }
}, { deep: true });

onMounted(() => {
  // Initial random noise to simulate persistent system activity
  setInterval(() => {
    if (Math.random() > 0.95) { // 5% chance every second
       const systems = ['MEM', 'NET', 'CPU', 'IO', 'VUE'];
       const sys = systems[Math.floor(Math.random() * systems.length)];
       const status = Math.random() > 0.5 ? 'OK' : 'PING';
       addLog(`[BACKGROUND_PROCESS]: ${sys}_CHECK -> ${status}`, 'SYS');
    }
  }, 1000);
});
</script>

<template>
  <div class="background-console">
    <div class="console-overlay"></div>
    <div class="console-body" ref="consoleBody">
      <div v-for="log in logs" :key="log.id" class="log-line" :class="log.type.toLowerCase()">
        <span class="log-time">[{{ log.time }}]</span>
        <span class="log-type">[{{ log.type }}]</span>
        <span class="log-message">> {{ log.message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-console {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Behind everything */
  pointer-events: none; /* Non-interactive */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 40px; /* Adjust padding to avoid overlap with HUD borders if needed */
  font-family: 'Courier New', monospace;
}

.console-body {
  height: 100vh; /* Fill full view */
  max-height: 100vh;
  overflow-y: hidden; /* Hide scrollbar but allow JS scroll */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Keep logs at bottom */
  gap: 4px;
  mask-image: linear-gradient(to top, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 90%, transparent 100%);
  padding-bottom: 20px;
}

.log-line {
  font-size: 1rem; /* Increased size */
  opacity: 0.8; /* Increased visibility */
  color: var(--neon-blue);
  text-shadow: 0 0 2px var(--neon-blue);
  white-space: nowrap;
}

.log-line.sys {
  color: #888; /* Lighter grey for better visibility */
  font-size: 0.9rem;
}

.log-line.action {
  color: var(--neon-purple); 
  opacity: 1; /* Full opacity for actions */
  font-weight: bold;
}

.log-line.error {
  color: #ff0055;
}

.log-time {
  margin-right: 8px;
  opacity: 0.5;
}

.log-type {
  margin-right: 8px;
  color: #fff;
}
</style>
