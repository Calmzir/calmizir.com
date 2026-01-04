```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useMouseParallax } from '../../composables/useMouseParallax'
import { useSystemLogs } from '../../composables/useSystemLogs'; // Import

const { addLog } = useSystemLogs();

const emit = defineEmits(['ready'])

const lines = ref([])
const showCursor = ref(true)
const isFading = ref(false)
const { tiltX, tiltY } = useMouseParallax(15) // Loader parallax

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const typeText = async (text, delay = 50) => {
  let currentLine = ''
  const lineIndex = lines.value.length
  lines.value.push(currentLine)
  
  for (let char of text) {
    currentLine += char
    lines.value[lineIndex] = currentLine
    await sleep(delay)
  }
}

const runSequence = async () => {
  addLog('LOADER_SEQUENCE_START', 'SYS');
  await sleep(200) // +100ms
  await typeText(':: SYSTEM BOOT SEQUENCE INITIATED ::', 10) // +5ms delay
  addLog('SYSTEM_BOOT_INITIATED', 'SYS');
  await sleep(100) // +50ms
  await typeText('> CHECKING CORE MODULES... OK', 5) // +3ms delay
  addLog('CORE_MODULES_CHECK_OK', 'SYS');
  await sleep(100) // +50ms
  await typeText('> LOADING GRAPHICAL INTERFACE... OK', 5) // +3ms delay
  addLog('GRAPHICAL_INTERFACE_LOADED', 'SYS');
  await sleep(200) // +100ms
  
  // Login Simulation
  lines.value.push('> AUTHENTICATION REQUIRED')
  await sleep(200) // +100ms
  
  // User
  const userLineIndex = lines.value.length
  lines.value.push('USER: ')
  await sleep(200) // +100ms
  
  const user = 'Calmizir'
  for (let char of user) {
    lines.value[userLineIndex] += char
    await sleep(30) // +10ms delay
  }
  await sleep(200) // +100ms
  
  // Password
  const passLineIndex = lines.value.length
  lines.value.push('PASSWORD: ')
  await sleep(200) // +100ms
  
  const pass = '**********'
  for (let char of pass) {
    lines.value[passLineIndex] += char
    await sleep(20) // +10ms delay
  }
  
  await sleep(500) // +300ms
  lines.value.push('') 
  lines.value.push('> ACCESS GRANTED.')
  lines.value.push('> WELCOME, ARCHITECT.')
  
  await sleep(1000) // +600ms (more steady read time)
  isFading.value = true
  await sleep(600) 
  emit('ready')
}

onMounted(() => {
  runSequence()
})
</script>

<template>
  <div class="loader-backdrop" :class="{ 'fade-out': isFading }">
    <div 
      class="console-window"
      :style="{ transform: `perspective(1000px) rotateY(${tiltX * 0.1}deg) rotateX(${-tiltY * 0.1}deg)` }"
    >
      <div class="window-header">
        <span class="window-title">TERMINAL // SYSTEM_BOOT</span>
        <div class="window-controls">
          <span>_</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <div class="terminal-content">
        <div v-for="(line, index) in lines" :key="index" class="line">
          {{ line }}
        </div>
        <div class="cursor-line">
          <span class="blinking-cursor" v-if="showCursor">_</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
}

.fade-out {
  opacity: 0;
  pointer-events: none;
}

.console-window {
  width: 600px;
  height: 400px;
  background: rgba(5, 10, 16, 0.6); /* More transparent */
  backdrop-filter: blur(8px); /* Blur added */
  border: 1px solid var(--neon-blue);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
  display: flex;
  flex-direction: column;
  font-family: monospace;
}

@media (max-width: 768px) {
  .console-window {
    width: 90vw;
    height: 60vh;
  }
}

.window-header {
  background: rgba(0, 243, 255, 0.1);
  border-bottom: 1px solid var(--neon-blue);
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.window-title {
  color: var(--neon-blue);
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.window-controls {
  display: flex;
  gap: 10px;
  color: var(--neon-blue);
  font-size: 0.8rem;
}

.terminal-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  color: var(--neon-blue);
  text-shadow: 0 0 4px var(--neon-blue);
  font-size: 0.9rem;
}

.line {
  margin-bottom: 5px;
  min-height: 1.2rem;
}

.blinking-cursor {
  animation: blink 1s infinite;
  background: var(--neon-blue);
  color: black;
  padding: 0 4px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
