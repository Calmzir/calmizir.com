<script setup>
import { ref } from 'vue';
import DraggableWindow from '../components/UI/DraggableWindow.vue';
import PortfolioView from './PortfolioView.vue';
import ContactView from './ContactView.vue';

// Window States
const showPortfolio = ref(false);
const showContact = ref(false);

const togglePortfolio = () => {
  showPortfolio.value = !showPortfolio.value;
  // Optional: bring to top logic (handled by hover for now, but click-to-focus could be added)
};

const toggleContact = () => {
  showContact.value = !showContact.value;
};
</script>

<template>
  <div class="view-container about-view">
    <div class="grid-layout debug-grid">
      
      <!-- ... (Content remains same until footer) ... -->
      
      <!-- Window Layer (Overlaid on top of grid) -->
      <transition name="fade">
        <Teleport to="#window-layer">
          <!-- Portfolio Window -->
          <DraggableWindow 
            v-if="showPortfolio" 
            title="PROJECT ARCHIVES" 
            width="800px" 
            height="500px"
            :initialX="100"
            :initialY="50"
            @close="showPortfolio = false"
            style="pointer-events: auto;"
          >
            <PortfolioView />
          </DraggableWindow>

          <!-- Contact Window -->
          <DraggableWindow 
            v-if="showContact" 
            title="ESTABLISH UPLINK" 
            width="500px" 
            height="600px"
            :initialX="150"
            :initialY="80"
            @close="showContact = false"
            style="pointer-events: auto;"
          >
            <ContactView />
          </DraggableWindow>
        </Teleport>
      </transition>

      <div class="bio-image-container">
        <div class="image-placeholder">
          <span>[PILOT_IMG]</span>
        </div>
      </div>

      <!-- Header Container -->
      <header class="header-container">
        <div class="header-content">
          <!-- Col 1: Icon -->
          <div class="header-icon-container">
            <svg class="section-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
            </svg>
          </div>

          <!-- Col 2-12: Data -->
          <div class="header-data-wrapper">
            <div class="identity-data primary">
              <span class="label">FULLNAME:</span>
              <span class="value">JOEL FEREIRA</span>
            </div>
            
            <div class="details-grid">
              <div class="identity-data secondary">
                <span class="label">CODENAME:</span>
                <span class="value">CALMIZIR</span>
              </div>
              <div class="identity-data tertiary">
                <span class="label">OCCUPATION:</span>
                <span class="value">FULLSTACK ARCHITECT</span>
              </div>
              
              <!-- RPG Fields -->
              <div class="identity-data rpg-field">
                <span class="label">STATUS:</span>
                <span class="value text-success">OPERATIONAL</span>
              </div>
              <div class="identity-data rpg-field">
                <span class="label">RANK:</span>
                <span class="value">SENIOR OFFICER</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Bio Text Container -->
      <div class="bio-text-container">
        <div class="section-internal-header">
          <svg class="section-header-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <span class="section-title">BIOGRAPHY</span>
        </div>
        
        <div class="bio-stats">
          <div class="stat-item">
            <span class="label">INIT_DATE:</span> 1999.10.18
          </div>
          <div class="stat-item">
            <span class="label">ORIGIN:</span> VENEZUELA
          </div>
        </div>

        <div class="text-content">
          <p class="bio-paragraph">
            A VETERAN ARCHITECT OF DIGITAL SYSTEMS SPECIALIZED IN CONSTRUCTING HIGH-PERFORMANCE WEB INFRASTRUCTURES. 
            I BRIDGE THE GAP BETWEEN CONCEPTUAL DESIGN AND FUNCTIONAL DEPLOYMENT, CRAFTING IMMERSIVE EXPERIENCES THAT RESONATE. 
            MY MISSION IS TO UPGRADE YOUR VISION INTO A TANGIBLE REALITY, OPTIMIZING EVERY PIXEL AND LINE OF CODE FOR MAXIMUM IMPACT.
          </p>
          
          <div class="bio-quote">
            > "IF YOU CAN IMAGINE IT, IT CAN BE CREATED. YOU ONLY HAVE TO TAKE THE FIRST STEP."
          </div>
        </div>
      </div>

      <!-- Skills Container -->
      <div class="skills-container">
        <div class="section-internal-header">
          <svg class="section-header-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m3.31-6.9a5.5 5.5 0 0 0-4.51-3.69v1.73A3.8 3.8 0 0 1 12.92 13h1.86a2 2 0 0 0 2.22-1.78M12 7a5 5 0 0 0-3.31 1.41l1.59 1.59A2.9 2.9 0 0 1 12 9a3 3 0 0 1 2.94 2.37l1.7-1A5 5 0 0 0 12 7Z"/>
          </svg>
          <span class="section-title">SKILL_MATRIX</span>
        </div>
        
        <div class="skills-content">
          <!-- Languages Group -->
          <div class="skill-group">
            <span class="group-label">LANGUAGES:</span>
            <ul class="skills-list">
              <li class="skill-item">ESPAÑOL</li>
              <li class="skill-item">ENGLISH</li>
            </ul>
          </div>

          <!-- Modules Group -->
          <div class="skill-group">
            <span class="group-label">MODULES:</span>
            <ul class="skills-list grid-list">
              <li class="skill-item">HTML</li>
              <li class="skill-item">CSS</li>
              <li class="skill-item">JAVASCRIPT</li>
              <li class="skill-item">TYPESCRIPT</li>
              <li class="skill-item">ANIMATIONS</li>
              <li class="skill-item">VUE</li>
              <li class="skill-item">GIT</li>
              <li class="skill-item">GITHUB</li>
              <li class="skill-item">EXPRESS</li>
              <li class="skill-item">SQL</li>
              <li class="skill-item">AI_SYSTEMS</li>
              <li class="skill-item">BRAND_DESIGN</li>
              <li class="skill-item">UI/UX</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Container -> MAIN NAVIGATION -->
      <footer class="footer-container">
        <nav class="footer-nav">
          <button class="nav-btn footer-btn active">BIOGRAPHY</button>
          <button class="nav-btn footer-btn" @click="togglePortfolio" :class="{ active: showPortfolio }">PORTFOLIO</button>
          <button class="nav-btn footer-btn" @click="toggleContact" :class="{ active: showContact }">CONTACT</button>
        </nav>
      </footer>

      <!-- Side Navigation -> SOCIALS -->
      <nav class="sidebar-nav">
        <!-- LinkedIn -->
        <a href="#" class="nav-btn square-btn social-btn" title="LINKEDIN">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
        </a>
        
        <!-- WhatsApp -->
        <a href="https://wa.me/5699419549?text=Hello!%20I'd%20love%20to%20get%20in%20touch%20with%20you." target="_blank" class="nav-btn square-btn social-btn" title="WHATSAPP">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16-.03-.43-.05-.63-.05c-.2 0-.52.07-.79.37c-.27.29-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.19 2.1 3.21 5.09 4.5c.73.31 1.25.5 1.66.63c.67.22 1.28.19 1.77.12c.54-.08 1.66-.68 1.9-1.34c.24-.66.24-1.22.17-1.34c-.07-.12-.25-.19-.52-.32c-.27-.14-1.61-.79-1.86-.88c-.25-.09-.43-.14-.61.13c-.18.28-.7 .88-.86 1.05c-.16.18-.32.19-.59.06c-.27-.13-1.15-.42-2.19-1.34c-.81-.72-1.36-1.61-1.52-1.88c-.16-.27-.02-.42.11-.55c.12-.12.27-.31.4-.47c.13-.15.18-.26.27-.43c.09-.17.05-.32-.02-.45c-.08-.13-.73-1.77-1.01-2.42c-.25-.57-.5-.5-.69-.51"/></svg>
        </a>

        <!-- GitHub -->
        <a href="#" class="nav-btn square-btn social-btn" title="GITHUB">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 7.18 9.61c.5.09.68-.22.68-.48c0-.24-.01-.88-.01-1.73c-2.78.6-3.37-1.34-3.37-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85c0 1.34-.01 2.42-.01 2.74c0 .26.18.57.69.48A10 10 0 0 0 22 12A10 10 0 0 0 12 2z"/></svg>
        </a>
        
        <div class="nav-spacer"></div>
        
        <!-- External/Settings -->
        <button class="nav-btn square-btn social-btn" title="SETTINGS">
           <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/></svg>
        </button>
      </nav>

      <!-- Visual Column Markers (Hidden) -->
      <template v-if="false">
        <div v-for="c in 12" :key="'c'+c" class="debug-col" :style="{ gridColumn: c }">
          <span class="col-num">{{ c }}</span>
        </div>
        
        <!-- Visual Row Markers (Overlay) -->
        <div v-for="r in 12" :key="'r'+r" class="debug-row" :style="{ gridRow: r }">
          <span class="row-num">{{ r }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  height: 100%;
  width: 100%;
  padding: 20px; /* Matched to gap for 100% symmetry */
  overflow: hidden;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  gap: 20px; /* Equal spacing between all cols/rows */
  width: 100%;
  height: 100%;
  position: relative;
}

/* Debug Styles */
.debug-grid .debug-col {
  border-right: 1px dashed rgba(0, 243, 255, 0.15);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5px;
  color: rgba(0, 243, 255, 0.2);
  grid-row: 1 / -1; 
  pointer-events: none;
  z-index: 0;
}

.debug-grid .debug-row {
  border-bottom: 1px dashed rgba(0, 243, 255, 0.15);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  color: rgba(0, 243, 255, 0.2);
  grid-column: 1 / -1;
  pointer-events: none;
  z-index: 0;
}

.bio-image-container {
  grid-column: 1 / span 3; /* First 3 columns */
  grid-row: 1 / -1; /* Full height */
  border: 1px solid var(--neon-blue);
  background: rgba(0, 243, 255, 0.05);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* Content layer */
}

.image-placeholder {
  color: var(--neon-blue);
  font-family: monospace;
  letter-spacing: 2px;
  animation: pulse-op 2s infinite;
}

@keyframes pulse-op {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.sidebar-nav {
  grid-column: 12 / 13; /* Column 12 */
  grid-row: 1 / -1; /* Full Height */
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding: 20px 0;
  border-left: 1px solid rgba(0, 243, 255, 0.2);
  background: rgba(0, 243, 255, 0.02);
  z-index: 2;
}

.header-container {
  grid-column: 4 / 12; /* Start line 4, End line 12 (Cols 4-11) */
  grid-row: 1 / 4;    /* Start line 1, End line 4 (Rows 1-3) */
  border: 1px solid var(--neon-blue);
  background: rgba(5, 10, 16, 0.4);
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  z-index: 2;
  padding: 0; /* Remove padding to let grid control fit */
}

.header-content {
  display: grid;
  grid-template-columns: 1fr 11fr; /* 1/12 split approximation for icon vs data */
  width: 100%;
  height: 100%;
}

.header-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 243, 255, 0.2);
  background: rgba(0, 243, 255, 0.05);
}

.section-icon {
  width: 40px;
  height: 40px;
  color: var(--neon-cyan);
  filter: drop-shadow(0 0 5px var(--neon-cyan));
}

.header-data-wrapper {
  display: flex;
  flex-direction: column; /* Stack vertically */
  justify-content: center;
  gap: 5px;
  padding: 0 40px; /* Internal padding for data */
  width: 100%;
  align-items: flex-start;
}

.identity-data {
  display: flex;
  align-items: baseline;
  gap: 8px; /* Reduced from 15px */
  font-family: var(--font-header);
}

.identity-data .label {
  color: var(--neon-blue);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  opacity: 0.7;
  min-width: 120px; 
}

/* Base Value Style */
.identity-data .value {
  color: #fff;
  letter-spacing: 2px;
}

/* Primary: Fullname (Big & Bold) */
.identity-data.primary .value {
  font-size: 2.8rem;
  font-weight: 800;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  letter-spacing: 4px;
}
.identity-data.primary .label {
  display: none; 
}

/* Secondary: Codename (Cyan, Medium) */
.identity-data.secondary .value {
  color: var(--neon-cyan);
  font-size: 1.5rem;
  font-weight: 600;
  text-shadow: 0 0 10px var(--neon-cyan);
}

/* Tertiary: Occupation */
.identity-data.tertiary {
  margin: 0;
}
.identity-data.tertiary .value {
  color: var(--neon-purple);
  font-size: 1.2rem;
  font-family: monospace;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, min-content); /* 2 Columns for 2x2 layout */
  column-gap: 60px; /* Balanced gap */
  row-gap: 15px;
  margin-top: 15px;
  padding-left: 5px; 
  width: 100%;
}

/* Ensure secondary/tertiary classes don't interfere with grid placement if they have margins */
.identity-data.secondary, 
.identity-data.tertiary,
.identity-data.rpg-field {
  white-space: nowrap; /* Prevent wrapping within fields */
}

.identity-data.rpg-field .value {
  font-size: 1.1rem;
  font-family: monospace;
  letter-spacing: 1px;
}

.text-warning { color: #ffd700; text-shadow: 0 0 5px #ffd700; }
.text-success { color: #0f0; text-shadow: 0 0 5px #0f0; }

.bio-text-container {
  grid-column: 4 / 9;   /* Start 4, End 9 (Cols 4-8) */
  grid-row: 4 / 10;     /* Start 4, End 10 (Rows 4-9) */
  border: 1px solid var(--neon-purple);
  background: rgba(188, 19, 254, 0.05); /* Purple tint for bio */
  display: flex;
  flex-direction: column; /* Stack header and text */
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
  box-shadow: inset 0 0 20px rgba(188, 19, 254, 0.1);
  padding: 20px;
}

.section-internal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(188, 19, 254, 0.3);
  padding-bottom: 10px;
  width: 100%;
  margin-bottom: 15px;
}

.section-header-icon {
  width: 20px;
  height: 20px;
  color: var(--neon-purple);
}

.section-title {
  color: var(--neon-purple);
  font-family: var(--font-header);
  font-size: 1rem;
  letter-spacing: 2px;
  font-weight: 600;
}

.text-content {
  text-align: left; /* Reset from center */
  color: #fff;
  font-family: monospace;
  line-height: 1.6;
  opacity: 0.9;
}

.bio-paragraph {
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.bio-stats {
  display: flex;
  gap: 30px;
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed rgba(188, 19, 254, 0.2);
}

.stat-item {
  font-family: monospace;
  color: #fff;
  font-size: 0.9rem;
}

.stat-item .label {
  color: var(--neon-purple);
  font-weight: 600;
  margin-right: 5px;
}

.bio-quote {
  font-family: var(--font-header); /* Changed to header font for emphasis */
  color: var(--neon-cyan);
  font-size: 0.85rem;
  font-style: italic;
  padding: 10px;
  background: rgba(0, 243, 255, 0.05); /* Subtle cyan bg */
  border-left: 2px solid var(--neon-cyan);
  margin-top: auto; /* Push to bottom if space allows, but container is grid constrained */
}

.skills-container {
  grid-column: 9 / 12;  /* Start 9, End 12 (Cols 9-11) */
  grid-row: 4 / 10;     /* Start 4, End 10 (Rows 4-9) */
  border: 1px solid var(--neon-blue);
  background: rgba(0, 243, 255, 0.05); /* Blue tint for skills */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
  box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.1);
  padding: 20px;
}

.skills-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.group-label {
  color: var(--neon-purple);
  font-size: 0.75rem;
  letter-spacing: 1px;
  font-family: var(--font-header);
  opacity: 0.8;
  margin-bottom: 2px;
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Default simple list (vertical) for Languages */
.skills-list.simple-list {
  display: flex;
  gap: 15px; /* Horizontal for languages maybe? Or keep vertical? Let's check user intent. "List of two columns" was for all. Assuming languages can be simple. */
  flex-wrap: wrap;
}

.skills-list:not(.grid-list) .skill-item {
  display: inline-block;
  margin-right: 15px;
}

/* Grid list for Modules */
.skills-list.grid-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  row-gap: 5px;
}

.skill-item {
  color: #fff;
  font-family: monospace;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  position: relative;
  padding-left: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-item::before {
  content: '>';
  position: absolute;
  left: 0;
  color: var(--neon-blue);
  font-weight: bold;
}

.footer-container {
  grid-column: 4 / 12;  /* Start 4, End 12 (Cols 4-11) */
  grid-row: 10 / 13;    /* Start 10, End 13 (Rows 10-12) */
  border: 1px solid var(--neon-purple);
  background: rgba(188, 19, 254, 0.05); /* Purple tint */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.footer-nav {
  display: flex;
  gap: 20px;
  width: 100%;
  padding: 0 40px;
  justify-content: space-around;
}

.footer-btn {
  background: transparent;
  border: 1px solid var(--neon-purple);
  color: var(--neon-purple);
  padding: 10px 30px;
  font-family: var(--font-header);
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1; /* Distribute space */
  max-width: 200px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.footer-btn:hover, .footer-btn.active {
  background: var(--neon-purple);
  color: #000;
  box-shadow: 0 0 15px var(--neon-purple);
}

.nav-btn.social-btn {
  font-size: 0; /* Hide text if any, rely on SVG */
  padding: 8px; /* Padding for icon */
}

.nav-btn.social-btn svg {
  width: 100%;
  height: 100%;
}


.nav-btn {
  width: 40px;
  height: 40px;
  background: rgba(5, 10, 16, 0.8);
  border: 1px solid var(--neon-blue);
  color: var(--neon-blue);
  font-family: var(--font-main);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}

.nav-btn:hover {
  background: var(--neon-blue);
  color: #000;
  box-shadow: 0 0 10px var(--neon-blue);
}

.nav-spacer {
  flex-grow: 1;
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--neon-blue), transparent);
  opacity: 0.3;
}
</style>

