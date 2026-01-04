<script setup>
import { computed } from 'vue';
import { useDraggable } from '../../composables/useDraggable';

const props = defineProps({
  title: String,
  width: { type: String, default: '600px' },
  height: { type: String, default: '450px' },
  initialX: { type: Number, default: 100 },
  initialY: { type: Number, default: 100 }
});

const emit = defineEmits(['close']);

const { x, y, onDragStart, isDragging } = useDraggable(props.initialX, props.initialY);

const style = computed(() => ({
  width: props.width,
  height: 'auto', // Dynamic height
  maxHeight: '90vh', // Constrain to viewport
  transform: `translate(${x.value}px, ${y.value}px)`,
  zIndex: isDragging.value ? 1000 : 100
}));
</script>

<template>
  <div class="draggable-window" :style="style" :class="{ 'dragging': isDragging }">
    <!-- Header (Drag Handle) -->
    <div class="window-header" @mousedown="onDragStart" @touchstart="onDragStart">
      <div class="window-title">
        <span class="icon">📂</span> {{ title }}
      </div>
      <div class="window-controls">
        <button class="control-btn close-btn" @click="$emit('close')">×</button>
      </div>
    </div>
    
    <!-- Content -->
    <div class="window-body">
      <slot></slot>
    </div>

    <!-- Resizer (Visual only for now) -->
    <div class="resize-handle"></div>
  </div>
</template>

<style scoped>
.draggable-window {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: rgba(5, 12, 20, 0.95);
  border: 1px solid var(--neon-blue);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  /* clip-path removed per user request */
}

.draggable-window:hover {
  border-color: rgba(0, 243, 255, 1);
  box-shadow: 0 0 40px rgba(0, 243, 255, 0.6);
  z-index: 500; /* Ensure on top when hovered */
}

.draggable-window.dragging {
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.8);
  cursor: grabbing;
  border-color: #fff;
  transition: none; /* Instant feedback on drag */
}

.window-header {
  height: 35px;
  background: rgba(0, 243, 255, 0.1);
  border-bottom: 1px solid var(--neon-blue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  cursor: grab;
  user-select: none;
  flex-shrink: 0; /* Prevent header shrinking */
}

.window-header:active {
  cursor: grabbing;
}

.window-title {
  color: var(--neon-blue);
  font-family: var(--font-header);
  font-size: 0.9rem;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.window-controls {
  display: flex;
  gap: 5px;
}

.control-btn {
  background: transparent;
  border: none;
  color: var(--neon-blue);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0 5px;
}

.control-btn:hover {
  text-shadow: 0 0 5px var(--neon-blue);
}

.window-body {
  flex: 1;
  overflow-y: auto; /* Scroll only if content exceeds max-height */
  overflow-x: hidden;
  position: relative;
  /* Scrollbar Styling */
  scrollbar-width: thin;
  scrollbar-color: var(--neon-blue) transparent;
}

.window-body::-webkit-scrollbar {
  width: 6px;
}
.window-body::-webkit-scrollbar-thumb {
  background-color: var(--neon-blue);
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border-right: 2px solid var(--neon-blue);
  border-bottom: 2px solid var(--neon-blue);
  cursor: nwse-resize;
  opacity: 0.5;
}

@media (max-width: 768px) {
  .draggable-window {
    width: calc(100vw - 20px) !important; /* Match MainHUD margin */
    height: calc(100dvh - 20px) !important; /* Match MainHUD margin */
    height: calc(100vh - 20px) !important; /* Fallback */
    top: 10px !important; /* Center vertically/horizontally */
    left: 10px !important;
    transform: none !important;
    max-height: none !important; /* Remove constraints */
    border: 1px solid var(--neon-blue) !important; /* Restore Full Border */
    border-radius: 5px; /* Match HUD */
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.8); /* Strong shadow for popup feel */
  }
  
  .window-header {
    cursor: default;
    pointer-events: none;
  }
  
  .window-header .control-btn {
    pointer-events: auto;
  }
  
  .resize-handle {
    display: none;
  }
}
</style>
