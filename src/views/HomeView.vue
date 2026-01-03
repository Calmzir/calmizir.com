<script setup>
import HoloCard from '../components/UI/HoloCard.vue'
</script>

<template>
  <div class="view-container home-view">
    <div class="hero-section">
      <h1 class="glitch-text" data-text="JOEL FERNANDEZ">JOEL FERNANDEZ</h1>
      <h2 class="role-text">FULLSTACK <span class="highlight">ARCHITECT</span></h2>
      <p class="mission-text">
        :: INITIALIZING PORTFOLIO SEQUENCE...<br>
        :: LOADING CREATIVE ASSETS...<br>
        :: SYSTEM READY.
      </p>
    </div>

    <div class="status-grid">
      <HoloCard title="CURRENT STATUS">
        <div class="status-item">
          <span class="label">AVAILABILITY</span>
          <span class="value available">OPEN FOR CONTRACTS</span>
        </div>
        <div class="status-item">
          <span class="label">LOCATION</span>
          <span class="value">REMOTE / PLANET EARTH</span>
        </div>
      </HoloCard>

      <HoloCard title="CORE SUBSYSTEMS">
        <div class="tech-tags">
          <span class="tag">VUE.JS</span>
          <span class="tag">NODE.JS</span>
          <span class="tag">THREE.JS</span>
          <span class="tag">DESIGN</span>
        </div>
      </HoloCard>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero-section {
  margin-bottom: 60px;
}

h1 {
  font-family: var(--font-main);
  font-size: 4rem;
  color: #fff;
  margin-bottom: 10px;
  position: relative;
}

.role-text {
  font-size: 1.5rem;
  color: rgba(255,255,255,0.7);
  letter-spacing: 4px;
  margin-bottom: 20px;
}

.highlight {
  color: var(--neon-purple);
  text-shadow: 0 0 10px var(--neon-purple);
}

.mission-text {
  font-family: monospace;
  color: var(--neon-blue);
  line-height: 1.6;
  opacity: 0.8;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 5px;
}

.value.available {
  color: #0f0;
  text-shadow: 0 0 5px #0f0;
}

.tech-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid var(--neon-blue);
  padding: 2px 8px;
  font-size: 0.8rem;
  color: var(--neon-blue);
}

/* Glitch Effect Simple */
.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-dark);
}

.glitch-text::before {
  left: 2px;
  text-shadow: -1px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: -1px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(10px, 9999px, 30px, 0); }
  20% { clip: rect(80px, 9999px, 100px, 0); }
  40% { clip: rect(10px, 9999px, 50px, 0); }
  60% { clip: rect(40px, 9999px, 80px, 0); }
  80% { clip: rect(80px, 9999px, 100px, 0); }
  100% { clip: rect(20px, 9999px, 60px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(80px, 9999px, 100px, 0); }
  20% { clip: rect(10px, 9999px, 30px, 0); }
  40% { clip: rect(40px, 9999px, 80px, 0); }
  60% { clip: rect(80px, 9999px, 100px, 0); }
  80% { clip: rect(20px, 9999px, 60px, 0); }
  100% { clip: rect(10px, 9999px, 50px, 0); }
}
</style>
