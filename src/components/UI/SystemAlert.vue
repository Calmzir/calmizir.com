<script setup>
import { computed } from 'vue';

const props = defineProps({
  visible: Boolean,
  message: String,
  type: {
    type: String,
    default: 'INFO'
  }
});

const emit = defineEmits(['close']);

const title = computed(() => {
  switch (props.type) {
    case 'ERROR': return 'SYSTEM ERROR';
    case 'WARNING': return 'WARNING';
    case 'SUCCESS': return 'OPERATION SUCCESS';
    default: return 'SYSTEM NOTICE';
  }
});

const color = computed(() => {
   switch (props.type) {
    case 'ERROR': return 'var(--neon-red, #ff0055)';
    case 'WARNING': return 'var(--neon-yellow, #ffee00)';
    case 'SUCCESS': return 'var(--neon-green, #00ff66)';
    default: return 'var(--neon-blue)';
  }
});
</script>

<template>
  <Transition name="alert-fade">
    <div v-if="visible" class="alert-overlay" @click.self="$emit('close')">
      <div class="alert-box" :style="{ borderColor: color }">
        <header :style="{ backgroundColor: color, color: '#000' }">
          <span class="icon">⚠️</span> {{ title }}
        </header>
        <div class="content">
          <p :style="{ color: color }">{{ message }}</p>
        </div>
        <footer>
          <button @click="$emit('close')" :style="{ borderColor: color, color: color }">
            ACKNOWLEDGE
          </button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.alert-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-box {
  background: rgba(5, 10, 20, 0.95);
  border: 2px solid var(--neon-blue);
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 30px rgba(0,0,0,0.8);
  font-family: var(--font-code);
}

header {
  padding: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.content {
  padding: 30px 20px;
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

footer {
  padding: 15px;
  display: flex;
  justify-content: center;
}

button {
  background: transparent;
  border: 1px solid var(--neon-blue);
  padding: 10px 30px;
  cursor: pointer;
  font-family: var(--font-header);
  letter-spacing: 2px;
  transition: all 0.2s;
}

button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: opacity 0.3s ease;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
}
</style>
