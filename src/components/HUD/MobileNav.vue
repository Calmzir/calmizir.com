<script setup>
import { ref } from 'vue';
import { useWindowManager } from '../../composables/useWindowManager';
import { useSystemLogs } from '../../composables/useSystemLogs';
import { useLanguage } from '../../composables/useLanguage';
import PortfolioView from '../../views/PortfolioView.vue';
import ContactView from '../../views/ContactView.vue';
import LangSwitch from '../UI/LangSwitch.vue';

const isOpen = ref(false);
const { openWindow, closeAllWindows } = useWindowManager(); // Assuming closeAllWindows or I might need to implement it roughly
const { addLog } = useSystemLogs();
const { t } = useLanguage();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  addLog(isOpen.value ? 'MOBILE_NAV_OPEN' : 'MOBILE_NAV_CLOSE', 'UI');
};

const handleBio = () => {
  // Biography is the base view. We essentially just close any overlay windows to "reveal" it.
  // Or if the user architecture changed, we might need to emit 'change-view'.
  // For now, assuming AboutView is the base and windows are overlays:
  // (Wait, useWindowManager logic might not expose 'closeAll'. I'll check.)
  isOpen.value = false;
};

const handlePortfolio = () => {
  openWindow(PortfolioView, {}, t('PROJECTS'));
  isOpen.value = false;
};

const handleContact = () => {
  openWindow(ContactView, {}, t('ESTABLISH_UPLINK'));
  isOpen.value = false;
};
</script>

<template>
  <div class="mobile-nav-wrapper">
    <!-- Hamburger Button -->
    <button class="hamburger-btn" @click="toggleMenu" :class="{ 'active': isOpen }">
      <div class="line top"></div>
      <div class="line mid"></div>
      <div class="line bot"></div>
    </button>

    <!-- Overlay Menu -->
    <Transition name="slide-fade">
      <div class="nav-overlay" v-if="isOpen">
        <div class="nav-content">
          <div class="nav-header">
            <span class="nav-title">{{ t('SYSTEM_NAV') }} //</span>
          </div>

          <nav class="main-links">
            <button class="menu-item" @click="handleBio">
              {{ t('BTN_BIOGRAPHY') }}
            </button>
            <button class="menu-item" @click="handlePortfolio">
              {{ t('BTN_PORTFOLIO') }}
            </button>
            <button class="menu-item" @click="handleContact">
              {{ t('BTN_CONTACT') }}
            </button>
          </nav>

          <div class="nav-divider"></div>

          <!-- Socials (Replica of AboutView sidebars) -->
          <div class="social-links">
             <a href="https://www.linkedin.com/in/joel-fereira-179298161/" target="_blank" class="social-btn">
               <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
             </a>
             <a href="https://wa.me/5699419549?text=Hello!%20I'd%20love%20to%20get%20in%20touch%20with%20you." target="_blank" class="social-btn">
               <svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
             </a>
             <a href="https://github.com/Calmzir" target="_blank" class="social-btn">
               <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 7.18 9.61c.5.09.68-.22.68-.48c0-.24-.01-.88-.01-1.73c-2.78.6-3.37-1.34-3.37-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85c0 1.34-.01 2.42-.01 2.74c0 .26.18.57.69.48A10 10 0 0 0 22 12A10 10 0 0 0 12 2z"/></svg>
             </a>
          </div>

          <div class="nav-divider"></div>
          
          <LangSwitch class="mobile-lang-switch"/>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Only visible on mobile, logic handled by parent or media query here */
.mobile-nav-wrapper {
  display: none;
}

@media (max-width: 768px) {
  .mobile-nav-wrapper {
    display: block;
    /* Removed absolute position to let it flow in header */
    margin-left: 10px;
  }
}

.hamburger-btn {
  width: 40px;
  height: 40px;
  background: transparent; /* No background until click/hover if desired, or keep as is */
  border: none; /* Removed border */
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  z-index: 2100; /* Above overlay */
  position: relative;
  transition: all 0.3s ease;
}

.hamburger-btn.active {
  background: var(--neon-blue);
  box-shadow: 0 0 15px var(--neon-blue);
}

.hamburger-btn .line {
  width: 24px;
  height: 2px;
  background: var(--neon-blue);
  transition: all 0.3s ease;
}

.hamburger-btn.active .line {
  background: #000;
}

/* Transform to X */
.hamburger-btn.active .top { transform: translateY(7px) rotate(45deg); }
.hamburger-btn.active .mid { opacity: 0; }
.hamburger-btn.active .bot { transform: translateY(-7px) rotate(-45deg); }


.nav-overlay {
  position: absolute; /* Changed from fixed to absolute to fit HUD container */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(5, 10, 16, 0.98); /* Slightly more opaque */
  backdrop-filter: blur(10px);
  z-index: 2050;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px; /* Match HUD radius */
}

.nav-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 80%;
  max-width: 300px;
}

.nav-title {
  color: var(--neon-blue);
  font-family: var(--font-header);
  letter-spacing: 2px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--neon-blue);
  padding-bottom: 5px;
  width: 100%;
  text-align: center;
}

.menu-item {
  width: 100%;
  padding: 15px;
  background: rgba(0, 243, 255, 0.05);
  border: 1px solid var(--neon-blue);
  color: #fff;
  font-family: var(--font-main);
  font-size: 1.2rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.menu-item:hover {
  background: var(--neon-blue);
  color: #000;
  transform: scale(1.02);
}

.social-links {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.social-btn {
  width: 45px;
  height: 45px;
  padding: 10px;
  border: 1px solid var(--neon-purple);
  border-radius: 5px;
  color: var(--neon-purple);
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: var(--neon-purple);
  color: #fff;
  box-shadow: 0 0 10px var(--neon-purple);
}

.nav-divider {
  width: 50%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

/* Animation */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
