<script setup>
import { ref, onMounted } from 'vue'
import { useMouseParallax } from '../../composables/useMouseParallax'
import { useSystemLogs } from '../../composables/useSystemLogs';
import { useAudioSystem } from '../../composables/useAudioSystem'; // Import Audio

const { addLog } = useSystemLogs();
const { initAudio } = useAudioSystem(); // Get initAudio

const emit = defineEmits(['ready'])

const lines = ref([])
const showCursor = ref(true)
const isFading = ref(false)
const isGlitching = ref(false) 
const isHeavyGlitching = ref(false)
const waitForInteraction = ref(false) // New state to pause
const { tiltX, tiltY } = useMouseParallax(15)

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const triggerGlitch = async (duration = 200) => {
  isGlitching.value = true
  await sleep(duration)
  isGlitching.value = false
}

const triggerHeavyGlitch = async (duration = 400) => {
  isHeavyGlitching.value = true
  await sleep(duration)
  isHeavyGlitching.value = false
}

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

const initializeSystem = async () => {
    // Resume sequence
    waitForInteraction.value = false
    
    // START AUDIO CONTEXT HERE
    initAudio();
    
    await sleep(200)
    lines.value.push('> AUTH_KEY: VERIFIED')
    await sleep(300)
    
    lines.value.push('') 
    lines.value.push('> ACCESS GRANTED.')
    lines.value.push('> WELCOME, ARCHITECT.')
    
    await sleep(800)
    
    triggerHeavyGlitch(600)
    await sleep(400)
    
    isFading.value = true
    await sleep(600) 
    emit('ready')
}

const runSequence = async () => {
  addLog('LOADER_SEQUENCE_START', 'SYS');
  await sleep(200) 
  
  await typeText(':: SYSTEM BOOT SEQUENCE INITIATED ::', 10)
  addLog('SYSTEM_BOOT_INITIATED', 'SYS');
  await sleep(100)
  
  await typeText('> CHECKING CORE MODULES... OK', 5)
  addLog('CORE_MODULES_CHECK_OK', 'SYS');
  
  await sleep(100)
  await typeText('> LOADING GRAPHICAL INTERFACE... OK', 5)
  addLog('GRAPHICAL_INTERFACE_LOADED', 'SYS');
  await sleep(200)
  
  // Login Simulation
  lines.value.push('> AUTHENTICATION REQUIRED')
  await sleep(200)
  
  // User
  const userLineIndex = lines.value.length
  lines.value.push('USER: ')
  await sleep(200)
  
  const user = 'Calmizir'
  for (let char of user) {
    lines.value[userLineIndex] += char
    await sleep(30)
  }
  await sleep(200)
  
  // Password
  const passLineIndex = lines.value.length
  lines.value.push('PASSWORD: ')
  await sleep(200)
  
  const pass = '**********'
  for (let char of pass) {
    lines.value[passLineIndex] += char
    await sleep(20)
  }
  
  await sleep(300)
  
  // PAUSE AND WAIT FOR USER
  addLog('WAITING_FOR_USER_INIT', 'SYS');
  lines.value.push('') 
  waitForInteraction.value = true;
  // Sequence halts here, continues in initializeSystem()
}

onMounted(() => {
  runSequence()
})
</script>

<template>
  <div class="loader-backdrop" :class="{ 'fade-out': isFading }">
    <div 
      class="console-window"
      :class="{ 'glitch-active': isGlitching }"
      :style="{ transform: `perspective(1000px) rotateY(${tiltX * 0.1}deg) rotateX(${-tiltY * 0.1}deg)` }"
    >
      <div class="window-header">
        <span class="window-title" :class="{ 'glitch-text': isGlitching }">TERMINAL // SYSTEM_BOOT</span>
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
        
        <!-- Interactive Prompt -->
        <div v-if="waitForInteraction" class="interaction-prompt">
             <button @click="initializeSystem" class="sys-btn">
                > [ INITIALIZE_SYSTEM ] <
             </button>
        </div>
        
        <div class="cursor-line" v-else>
          <span class="blinking-cursor" v-if="showCursor">_</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ... existing styles ... */
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

.heavy-glitch {
    animation: glitch-anim-heavy 0.1s infinite linear alternate-reverse;
}

.console-window {
  width: 600px;
  height: 400px;
  background: rgba(10, 14, 20, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid var(--neon-blue);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
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
  display: flex;
  flex-direction: column;
}

.line {
  margin-bottom: 5px;
  min-height: 1.2rem;
}

.interaction-prompt {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.sys-btn {
    background: rgba(0, 240, 255, 0.1);
    border: 1px solid var(--neon-blue);
    color: var(--neon-blue);
    font-family: monospace;
    font-size: 1.2rem;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s;
    animation: pulse-btn 1s infinite alternate;
}

.sys-btn:hover {
    background: var(--neon-blue);
    color: #000;
    box-shadow: 0 0 15px var(--neon-blue);
}

@keyframes pulse-btn {
    0% { opacity: 0.8; transform: scale(0.98); }
    100% { opacity: 1; transform: scale(1.02); }
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
