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
      <button class="close-btn" @click="$emit('close')">×</button>
      
      <div class="carousel-container">
        <button v-if="images.length > 1" class="nav-btn prev" @click="prev">‹</button>
        
        <div class="image-wrapper">
          <img :src="images[currentIndex]" alt="Fullview" class="main-image" />
          <div class="counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
        </div>

        <button v-if="images.length > 1" class="nav-btn next" @click="next">›</button>
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
  border: none;
  color: var(--neon-blue);
  font-size: 3rem;
  cursor: pointer;
  z-index: 2001;
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 50px;
  justify-content: center;
  flex: 1; /* Take mostly available space */
}

.image-wrapper {
  position: relative;
  max-width: 80vw;
  max-height: 70vh;
  border: 1px solid var(--neon-blue);
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
}

.main-image {
  max-width: 100%;
  max-height: 70vh;
  display: block;
  object-fit: contain;
}

.nav-btn {
  background: transparent;
  border: 1px solid var(--neon-blue);
  color: var(--neon-blue);
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px; /* Alignment fix */
}

.nav-btn:hover {
  background: var(--neon-blue);
  color: #000;
  box-shadow: 0 0 20px var(--neon-blue);
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
}

.strip-thumb {
  height: 60px;
  width: 60px;
  border: 1px solid #444;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s;
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
