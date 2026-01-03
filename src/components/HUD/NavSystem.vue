<script setup>
const props = defineProps({
  activeView: String
})

const emit = defineEmits(['select'])

const menuItems = [
  { id: 'Home', label: 'DASHBOARD' },
  { id: 'About', label: 'BIO_DATA' },
  { id: 'Portfolio', label: 'PROJECTS' },
  { id: 'Contact', label: 'COMM_LINK' }
]
</script>

<template>
  <nav class="nav-system">
    <div class="nav-track">
      <button 
        v-for="item in menuItems" 
        :key="item.id"
        :class="['nav-btn', { active: activeView === item.id }]"
        @click="emit('select', item.id)"
      >
        <span class="btn-text">{{ item.label }}</span>
        <div class="btn-marker"></div>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav-system {
  margin-top: 20px;
  border-top: 1px solid rgba(0, 243, 255, 0.2);
  padding-top: 15px;
  display: flex;
  justify-content: center;
}

.nav-track {
  display: flex;
  gap: 20px;
}

.nav-btn {
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.5);
  font-family: var(--font-main);
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-btn:hover {
  color: var(--neon-blue);
  border-color: rgba(0, 243, 255, 0.3);
  background: rgba(0, 243, 255, 0.05);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
}

.nav-btn.active {
  color: #050a10;
  background: var(--neon-blue);
  border-color: var(--neon-blue);
  box-shadow: 0 0 15px var(--neon-blue);
  font-weight: 700;
}

.nav-btn.active .btn-text {
  text-shadow: none;
}

.btn-marker {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--neon-blue);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-btn:hover .btn-marker {
  transform: scaleX(1);
}
</style>
