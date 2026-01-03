<script setup>
import HoloCard from '../components/UI/HoloCard.vue'

const projects = [
  { 
    id: 1, 
    title: 'NEON COMMERCE', 
    desc: 'Next Gen E-commerce platform built with Nuxt.',
    tech: ['Nuxt', 'Stripe', 'Tailwind'] 
  },
  { 
    id: 2, 
    title: 'CYBER DASH', 
    desc: 'Real-time data visualization dashboard.',
    tech: ['Vue', 'D3.js', 'Socket.io'] 
  },
  { 
    id: 3, 
    title: 'ASTRO CLOUD', 
    desc: 'File management system for distributed teams.',
    tech: ['React', 'Firebase', 'AWS'] 
  }
]
</script>

<template>
  <div class="view-container portfolio-view">
    <h2 class="view-title">PROJECT ARCHIVES</h2>
    
    <div class="projects-grid">
      <HoloCard 
        v-for="project in projects" 
        :key="project.id" 
        :title="project.title"
        class="project-card"
      >
        <p class="project-desc">{{ project.desc }}</p>
        <div class="tech-stack">
          <span v-for="t in project.tech" :key="t" class="tech-badge">
            {{ t }}
          </span>
        </div>
        <button class="access-btn">ACCESS DATA</button>
      </HoloCard>
    </div>
  </div>
</template>

<style scoped>
.portfolio-view {
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-title {
  font-family: var(--font-main);
  color: var(--neon-blue);
  margin-bottom: 40px;
  font-size: 2rem;
  text-shadow: 0 0 10px var(--neon-blue);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1200px;
}

.project-desc {
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.tech-stack {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tech-badge {
  font-size: 0.7rem;
  border: 1px solid rgba(188, 19, 254, 0.5);
  padding: 2px 6px;
  color: var(--neon-purple);
}

.access-btn {
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid var(--neon-blue);
  color: var(--neon-blue);
  padding: 8px 16px;
  width: 100%;
  font-family: var(--font-main);
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
}

.access-btn:hover {
  background: var(--neon-blue);
  color: #000;
  box-shadow: 0 0 15px var(--neon-blue);
}
</style>
