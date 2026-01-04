<script setup>
import { useWindowManager } from '../../composables/useWindowManager';
import DraggableWindow from '../UI/DraggableWindow.vue';

const { windows, closeWindow, focusWindow } = useWindowManager();
</script>

<template>
  <div class="window-layer">
    <DraggableWindow 
      v-for="win in windows" 
      :key="win.id"
      :title="win.title"
      :style="{ zIndex: win.zIndex }"
      @close="closeWindow(win.id)"
      @mousedown="focusWindow(win.id)"
    >
      <component :is="win.component" v-bind="win.props" :windowId="win.id" />
    </DraggableWindow>
  </div>
</template>

<style scoped>
.window-layer {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none; /* Let clicks pass through to HUD */
  z-index: 1000;
}

/* Re-enable pointer events for windows */
.window-layer > * {
  pointer-events: auto;
}
</style>
