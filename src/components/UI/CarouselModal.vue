<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  images: { type: Array, default: () => [] },
  initialIndex: { type: Number, default: 0 }
});

const emit = defineEmits(['close']);

const currentIndex = ref(0);

watch(() => props.visible, (newVal) => {
  if (newVal) {
    currentIndex.value = props.initialIndex;
  }
});

watch(() => props.initialIndex, (newVal) => {
  currentIndex.value = newVal;
});

const next = () => {
  if (props.images.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prev = () => {
    if (props.images.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="carousel-overlay" @click.self="$emit('close')">
      <button class="close-btn" @click="$emit('close')">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
      </button>
      
      <div class="carousel-container">
        <button v-if="images.length > 1" class="nav-btn prev" @click="prev">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
        </button>
        
        <div class="image-wrapper">
          <img :src="images[currentIndex]" alt="Fullview" class="main-image" />
          <div class="counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
        </div>

        <button v-if="images.length > 1" class="nav-btn next" @click="next">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
        </button>
      </div>

      <!-- Thumbnails Strip -->
      <div v-if="images.length > 1" class="thumb-strip">
        <div 
          v-for="(img, idx) in images" 
          :key="idx" 
          class="strip-thumb"
          :class="{ active: idx === currentIndex }"
          @click="currentIndex = idx"
        >
          <img :src="img" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.carousel-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 20px; right: 30px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--neon-blue);
  width: 40px; height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2001;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.close-btn:hover {
  border-color: var(--neon-blue);
  box-shadow: 0 0 15px var(--neon-blue);
  transform: rotate(90deg);
}

.close-btn svg { width: 30px; height: 30px; }


.carousel-container {
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  padding: 0 20px;
  justify-content: center;
  flex: 1; 
}

.image-wrapper {
  position: relative;
  max-width: 85vw; /* Increased width */
  max-height: 80vh; /* Increased height */
  border: 1px solid var(--neon-blue);
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.15);
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  max-width: 100%;
  max-height: 80vh; /* Match wrapper */
  display: block;
  object-fit: contain;
}

.nav-btn {
  background: rgba(0,0,0,0.5);
  border: 1px solid var(--neon-blue);
  color: var(--neon-blue);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.nav-btn svg { width: 40px; height: 40px; }

.nav-btn:hover {
  background: var(--neon-blue);
  color: #000;
  box-shadow: 0 0 20px var(--neon-blue);
  transform: scale(1.1);
}

.counter {
  position: absolute;
  bottom: -30px;
  right: 0;
  color: #fff;
  font-family: var(--font-code);
}

.thumb-strip {
  height: 100px;
  display: flex;
  gap: 10px;
  padding: 20px;
  overflow-x: auto;
  max-width: 90vw;
  /* Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--neon-blue) transparent;
  justify-content: center; /* Center visuals */
}

.strip-thumb {
  height: 60px;
  width: 60px;
  border: 1px solid #444;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s;
  flex-shrink: 0;
}

.strip-thumb.active {
  border-color: var(--neon-blue);
  opacity: 1;
  transform: scale(1.1);
}

.strip-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
