<script setup>
import { useWindowManager } from '../composables/useWindowManager';
import { useSystemLogs } from '../composables/useSystemLogs';
import { useLanguage } from '../composables/useLanguage'; // Import
import PortfolioView from './PortfolioView.vue';
import ContactView from './ContactView.vue';
import WindowLayer from '../components/UI/WindowLayer.vue';
import LangSwitch from '../components/UI/LangSwitch.vue'; // Import Switch

const { openWindow } = useWindowManager();
const { addLog } = useSystemLogs(); 
const { t } = useLanguage(); // Init

const openPortfolio = () => {
  addLog('OPEN_WINDOW: PORTFOLIO_MODULE', 'ACTION');
  openWindow(PortfolioView, {}, t('PROJECTS'));
};

const openContact = () => {
  addLog('OPEN_WINDOW: COMM_UPLINK', 'ACTION');
  openWindow(ContactView, {}, t('ESTABLISH_UPLINK'));
};
</script>

<template>
  <div class="view-container about-view">
    <div class="grid-layout debug-grid">
      
      <!-- Window Layer (Overlaid on top of grid) -->
      <Teleport to="#window-layer">
        <WindowLayer />
      </Teleport>

      <div class="bio-image-container">
        <img src="/images/pilot-profile.jpg" alt="Pilot Profile" class="pilot-image" />
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
              <span class="label">{{ t('FULLNAME') }}:</span>
              <span class="value">JOEL FEREIRA</span>
            </div>
            
            <div class="details-grid">
              <div class="identity-data secondary">
                <span class="label">{{ t('CODENAME') }}:</span>
                <span class="value">CALMIZIR</span>
              </div>
              <div class="identity-data tertiary">
                <span class="label">{{ t('OCCUPATION') }}:</span>
                <span class="value">{{ t('JOB_TITLE') }}</span>
              </div>
              
              <!-- RPG Fields -->
              <div class="identity-data rpg-field">
                <span class="label">{{ t('STATUS') }}:</span>
                <span class="value text-success">{{ t('OPERATIONAL') }}</span>
              </div>
              <div class="identity-data rpg-field">
                <span class="label">{{ t('RANK') }}:</span>
                <span class="value">{{ t('SENIOR_OFFICER') }}</span>
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
          <span class="section-title">{{ t('BIOGRAPHY') }}</span>
        </div>
        
        <div class="bio-stats">
          <div class="stat-item">
            <span class="label">{{ t('INIT_DATE_LABEL') }}:</span> 1999.10.18
          </div>
          <div class="stat-item">
            <span class="label">{{ t('ORIGIN_LABEL') }}:</span> {{ t('COUNTRY_NAME') }}
          </div>
        </div>

        <div class="text-content">
          <p class="bio-paragraph">
            {{ t('BIO_PARAGRAPH') }}
          </p>
          
          <div class="bio-quote">
            > {{ t('BIO_QUOTE') }}
          </div>
        </div>
      </div>

      <!-- Skills Container -->
      <div class="skills-container">
        <div class="section-internal-header">
          <svg class="section-header-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m3.31-6.9a5.5 5.5 0 0 0-4.51-3.69v1.73A3.8 3.8 0 0 1 12.92 13h1.86a2 2 0 0 0 2.22-1.78M12 7a5 5 0 0 0-3.31 1.41l1.59 1.59A2.9 2.9 0 0 1 12 9a3 3 0 0 1 2.94 2.37l1.7-1A5 5 0 0 0 12 7Z"/>
          </svg>
          <span class="section-title">{{ t('SKILL_MATRIX') }}</span>
        </div>
        
        <div class="skills-content">
          <!-- Languages Group -->
          <div class="skill-group">
            <span class="group-label">{{ t('LANGUAGES') }}:</span>
            <ul class="skills-list">
              <li class="skill-item">{{ t('ESPANOL') }}</li>
              <li class="skill-item">{{ t('ENGLISH') }}</li>
            </ul>
          </div>

          <!-- Modules Group -->
          <div class="skill-group">
            <span class="group-label">{{ t('MODULES') }}:</span>
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
          <button class="nav-btn footer-btn active">{{ t('BTN_BIOGRAPHY') }}</button>
          <button class="nav-btn footer-btn" @click="openPortfolio">{{ t('BTN_PORTFOLIO') }}</button>
          <button class="nav-btn footer-btn" @click="openContact">{{ t('BTN_CONTACT') }}</button>
        </nav>
      </footer>

      <!-- Side Navigation -> SOCIALS -->
      <nav class="sidebar-nav">
        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/in/joel-fereira-179298161/" target="_blank" class="nav-btn square-btn social-btn" title="LINKEDIN">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
        </a>
        
        <!-- WhatsApp -->
        <a href="https://wa.me/5699419549?text=Hello!%20I'd%20love%20to%20get%20in%20touch%20with%20you." target="_blank" class="nav-btn square-btn social-btn" title="WHATSAPP">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>

        <!-- GitHub -->
        <a href="https://github.com/Calmzir" target="_blank" class="nav-btn square-btn social-btn" title="GITHUB">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 7.18 9.61c.5.09.68-.22.68-.48c0-.24-.01-.88-.01-1.73c-2.78.6-3.37-1.34-3.37-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85c0 1.34-.01 2.42-.01 2.74c0 .26.18.57.69.48A10 10 0 0 0 22 12A10 10 0 0 0 12 2z"/></svg>
        </a>
        
        <div class="nav-spacer"></div>

        <!-- Language Switcher -->
        <LangSwitch />
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
  background: rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center; /* Center horizontally and vertically */
  z-index: 2; /* Content layer */
}

.pilot-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover container while maintaining aspect ratio */
  object-position: center top; /* Focus on face/upper body if cropped */
  opacity: 0.9;
  mix-blend-mode: luminosity; /* Cyberpunk effect */
  transition: all 0.5s ease;
}

.pilot-image:hover {
  mix-blend-mode: normal; /* Reveal colors on hover */
  opacity: 1;
  transform: scale(1.02);
}

/* Remove placeholder styles */

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
  padding: 0 25px; /* Internal padding for data */
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
  font-size: 2.2rem;
  font-weight: 800;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  letter-spacing: 2px;
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
  padding: 15px; /* Reduced padding */
  overflow: hidden; /* Prevent container expand */
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
  line-height: 1.5; /* Reduced line height */
  opacity: 0.9;
  flex-grow: 1;
  overflow-y: auto; /* Enable scrolling if text is too long */
  padding-right: 5px; /* Space for scrollbar */
  
  /* Scrollbar Styling */
  scrollbar-width: thin;
  scrollbar-color: var(--neon-purple) transparent;
}

.text-content::-webkit-scrollbar {
  width: 4px;
}
.text-content::-webkit-scrollbar-track {
  background: transparent;
}
.text-content::-webkit-scrollbar-thumb {
  background-color: var(--neon-purple);
}

.bio-paragraph {
  font-size: 0.85rem; /* Reduced font size */
  letter-spacing: 0.5px;
  margin-bottom: 15px;
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
  /* Top-Left and Bottom-Right Cuts */
  clip-path: polygon(
    15px 0, 
    100% 0, 
    100% calc(100% - 15px), 
    calc(100% - 15px) 100%, 
    0 100%, 
    0 15px
  );
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

@media (max-width: 768px) {
  .about-view {
    overflow-y: auto; /* Allow scrolling on mobile */
    height: 100%; /* Fit within parent viewport */
    min-height: 0; /* Reset min-height */
    padding: 10px;
    padding-bottom: 20px; /* Safe padding for bottom content w/o footer */
  }

  .grid-layout {
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: auto; /* Let content grow */
    padding-bottom: 20px;
  }

  /* Reset Grid Placements */
  .bio-image-container,
  .header-container,
  .bio-text-container,
  .skills-container,
  .footer-container,
  .sidebar-nav {
    grid-column: auto;
    grid-row: auto;
    width: 100%;
  }

  /* HIDE OLD NAVIGATION ON MOBILE */
  .footer-container, 
  .sidebar-nav, 
  .nav-spacer { 
    display: none !important; 
  }

  /* 1. Header */
  .header-container { order: 1; margin-bottom: 0; }
  .bio-image-container { order: 2; height: 200px; }
  .bio-text-container { order: 3; }
  .skills-container { order: 4; }
  
  /* Header Adjustments */
  .header-container {
    padding: 10px;
    order: 2; 
  }
  
  .header-content {
    grid-template-columns: 40px 1fr; /* Reduce icon space */
  }
  
  .header-data-wrapper {
    padding-left: 10px;
    align-items: stretch; /* alignment fix */
  }
  
  .identity-data {
    flex-direction: column; /* Stack Label and Value on mobile */
    align-items: flex-start;
    gap: 0;
    margin-bottom: 5px;
  }
  
  .identity-data .label {
    display: block;
    font-size: 0.6rem;
    margin-bottom: 0;
  }
  
  .identity-data.primary .value { font-size: 1.2rem; white-space: normal; line-height: 1.1; }
  .identity-data.secondary .value { font-size: 1rem; }
  .identity-data.tertiary .value { font-size: 0.9rem; }
  
  .details-grid {
    grid-template-columns: 1fr; /* 1 col for vertical list */
    margin-top: 5px;
    row-gap: 8px; /* Reduced gap */
  }
  
  /* Image Adjustments */
  .bio-image-container {
    border-right: 1px solid var(--neon-blue); /* Add border back */
  }
  
  /* Skills Grid */
  .skills-list.simple-list {
    flex-direction: row; /* Keep languages horizontal */
  }

  /* Hide scrollbars for cleaner look */
  .about-view::-webkit-scrollbar { width: 0; }
}
</style>

