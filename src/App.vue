<script setup>
import { ref, computed, onMounted } from 'vue' // Add computed here
import MainHUD from './components/HUD/MainHUD.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import PortfolioView from './views/PortfolioView.vue'
import ContactView from './views/ContactView.vue'
import SystemLoader from './components/UI/SystemLoader.vue'
import BackgroundConsole from './components/UI/BackgroundConsole.vue' // Re-import
import SystemAlert from './components/UI/SystemAlert.vue' // Import Alert
import { useSystemLogs } from './composables/useSystemLogs' // Re-import
import { useMouseParallax } from './composables/useMouseParallax'

const { addLog, alertVisible, alertMessage, alertType, closeAlert } = useSystemLogs()
const currentView = ref('About')
const isLoading = ref(true)

// Background parallax - lighter intensity
const { tiltX: bgX, tiltY: bgY } = useMouseParallax(20) 
// HUD parallax - slightly stronger for depth
const { tiltX: hudX, tiltY: hudY } = useMouseParallax(10)

const renderView = computed(() => {
  switch(currentView.value) {
    case 'Home': return HomeView;
    case 'About': return AboutView;
    case 'Portfolio': return PortfolioView;
    case 'Contact': return ContactView;
    default: return HomeView;
  }
})

const onLoaderComplete = () => {
  addLog('SYSTEM_LOADER_COMPLETE', 'SYS')
  addLog('INIT_MAIN_INTERFACE', 'SYS')
  isLoading.value = false
}

onMounted(() => {
  addLog('BOOT_SEQUENCE_INITIATED', 'SYS')
  addLog('CHECKING_BioKernel...', 'SYS')
})
</script>

<template>
  <main class="main-interface">
    <SystemLoader v-if="isLoading" @ready="onLoaderComplete" /> <!-- Changed @complete to @ready -->
    
    <!-- Background Console Layer -->
    <BackgroundConsole />
    
    <!-- System Alert Overlay (High Z-Index) -->
    <SystemAlert 
      :visible="alertVisible"
      :message="alertMessage"
      :type="alertType"
      @close="closeAlert"
    />
    
    <div class="scanline"></div>
    <div 
      class="bg-layer"
      :style="{ transform: `translate(${-bgX}px, ${-bgY}px)` }"
    >
      <div class="bg-grid"></div>
    </div>
    
    <Transition name="window-pop">
      <div class="hud-wrapper" v-if="!isLoading"> <!-- Wrapper for Z-Index -->
        <MainHUD 
          :current-view="currentView" 
          @change-view="(view) => currentView = view"
          :style="{ transform: `perspective(1000px) rotateY(${hudX * 0.05}deg) rotateX(${-hudY * 0.05}deg)` }"
        >
          <Transition name="fade" mode="out-in">
            <component :is="renderView" />
          </Transition>
        </MainHUD>
      </div>
    </Transition>
    
    <!-- Global Window Layer for Teleported Popups -->
    <div id="window-layer"></div>
  </main>
</template>

<style scoped>
.main-interface {
  width: 100%;
  height: 100%;
  position: relative;
  background: radial-gradient(circle at center, #0a1f30 0%, #050a10 80%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  perspective: 1000px; /* Enable 3D space */
}

/* Ensure HUD is above console */
.hud-wrapper {
  z-index: 10;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none; /* Let clicks pass to children, but wrapper shouldn't block */
}

/* Allow HUD to receive clicks */
.hud-wrapper > * {
  pointer-events: auto;
}

#window-layer {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 2000; /* Above HUD */
  pointer-events: none; /* Let clicks pass through to HUD */
  perspective: 1000px; /* Maintain 3D context if needed */
}

.bg-layer {
  position: absolute;
  top: -5%; left: -5%; 
  width: 110%; height: 110%; /* Oversize to prevent gaps on move */
  z-index: 1; /* Above Background Console */
  transition: transform 0.1s ease-out;
}
/* ... rest of styles */
.window-pop-enter-active {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.window-pop-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.window-pop-enter-to {
  opacity: 1;
  transform: scale(1);
}

.bg-grid {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: 
    linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  perspective: 1000px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
