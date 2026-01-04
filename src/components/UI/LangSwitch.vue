<script setup>
import { useLanguage } from '../../composables/useLanguage';

const { currentLang } = useLanguage();

const toggleLang = () => {
    currentLang.value = currentLang.value === 'EN' ? 'ES' : 'EN';
};
</script>

<template>
  <div class="lang-switch" @click="toggleLang" :class="currentLang">
    <div class="lang-track">
       <div class="lang-flag top" :class="{ active: currentLang === 'EN' }">
         🇺🇸
       </div>
       <div class="thumb"></div>
       <div class="lang-flag bottom" :class="{ active: currentLang === 'ES' }">
         🇪🇸
       </div>
    </div>
  </div>
</template>

<style scoped>
.lang-switch {
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
}

.lang-track {
  width: 30px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--neon-blue);
  border-radius: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
  transition: all 0.3s;
}

.thumb {
  width: 20px;
  height: 20px;
  background: var(--neon-blue);
  border-radius: 50%;
  position: absolute;
  left: 4px;
  transition: top 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 0 8px var(--neon-blue);
  z-index: 1;
}

/* EN = Top */
.lang-switch.EN .thumb {
  top: 4px;
}

/* ES = Bottom */
.lang-switch.ES .thumb {
  top: 34px;
}

.lang-flag {
  font-size: 14px;
  z-index: 2;
  opacity: 0.3;
  transition: opacity 0.3s;
  filter: grayscale(100%);
}

.lang-flag.active {
  opacity: 1;
  filter: grayscale(0%);
}
</style>
