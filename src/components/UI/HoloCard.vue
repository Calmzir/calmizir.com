<script setup>
defineProps({
  title: String,
  variant: {
    type: String, // 'default', 'alert', 'info'
    default: 'default'
  }
})
</script>

<template>
  <div :class="['holo-card', variant]">
    <div class="card-header" v-if="title">
      <h3>{{ title }}</h3>
      <div class="header-line"></div>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="corner-accents">
      <span></span><span></span><span></span><span></span>
    </div>
  </div>
</template>

<style scoped>
.holo-card {
  background: rgba(5, 10, 16, 0.4);
  border: 1px solid rgba(0, 243, 255, 0.2);
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.holo-card:hover {
  border-color: rgba(0, 243, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
}

.card-header h3 {
  color: var(--neon-blue);
  font-family: var(--font-main);
  font-size: 1.1rem;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-line {
  height: 2px;
  background: linear-gradient(90deg, var(--neon-blue), transparent);
  margin-bottom: 15px;
}

.corner-accents span {
  position: absolute;
  width: 5px;
  height: 5px;
  border: 1px solid var(--neon-blue);
  transition: all 0.3s;
}

.corner-accents span:nth-child(1) { top: 2px; left: 2px; border-right: none; border-bottom: none; }
.corner-accents span:nth-child(2) { top: 2px; right: 2px; border-left: none; border-bottom: none; }
.corner-accents span:nth-child(3) { bottom: 2px; left: 2px; border-right: none; border-top: none; }
.corner-accents span:nth-child(4) { bottom: 2px; right: 2px; border-left: none; border-top: none; }
</style>
