<script setup>
defineProps({
  modelValue: Boolean,
  labelOn: { type: String, default: 'ON' },
  labelOff: { type: String, default: 'OFF' }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="cyber-switch-wrapper" @click="$emit('update:modelValue', !modelValue)">
    <span class="label-text" :class="{ active: !modelValue }">{{ labelOff }}</span>
    
    <div class="switch-track" :class="{ active: modelValue }">
      <div class="switch-thumb"></div>
    </div>
    
    <span class="label-text" :class="{ active: modelValue }">{{ labelOn }}</span>
  </div>
</template>

<style scoped>
.cyber-switch-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.switch-track {
  width: 50px;
  height: 24px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #444;
  position: relative;
  transition: all 0.3s ease;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}

.switch-track.active {
  border-color: var(--neon-blue);
  background: rgba(0, 243, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
}

.switch-thumb {
  width: 16px;
  height: 16px;
  background: #666;
  position: absolute;
  top: 3px;
  left: 4px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch-track.active .switch-thumb {
  transform: translateX(24px);
  background: var(--neon-blue);
  box-shadow: 0 0 10px var(--neon-blue);
}

.label-text {
  font-family: var(--font-code);
  font-size: 0.7rem;
  color: #666;
  transition: color 0.3s;
}

.label-text.active {
  color: var(--neon-blue);
  text-shadow: 0 0 5px var(--neon-blue);
}
</style>
