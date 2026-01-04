<script setup>
import { ref, onMounted } from 'vue';
import { projectService } from '../services/projectService';
import { useSystemLogs } from '../composables/useSystemLogs';
import { useWindowManager } from '../composables/useWindowManager';
import { useLanguage } from '../composables/useLanguage'; // Import
import CarouselModal from '../components/UI/CarouselModal.vue';

const props = defineProps(['projectId', 'windowId']);
const project = ref(null);
const loading = ref(true);
const { addLog } = useSystemLogs();
const { closeWindow } = useWindowManager();
const { t, currentLang } = useLanguage(); // Init

// Carousel State
const showCarousel = ref(false);
const carouselImages = ref([]); // Holds array of current gallery (or thumbnail)
const carouselIndex = ref(0);

// Dynamic Description
import { computed } from 'vue';
const description = computed(() => {
    if (!project.value) return '';
    if (currentLang.value === 'ES' && project.value.description_es) {
        return project.value.description_es;
    }
    return project.value.description;
});

onMounted(async () => {
  addLog(`FETCHING_PROJECT_DATA: ID_${props.projectId}...`, 'NET');
  project.value = await projectService.getById(props.projectId);
  loading.value = false;
  addLog('DATA_RENDER_COMPLETE', 'SYS');
});

const goBack = () => {
  if (props.windowId) {
    closeWindow(props.windowId);
  }
};

const openHero = () => {
  if (!project.value) return;
  // If we open hero, we probably want to see hero + gallery images in the carousel?
  // Let's mix them. Hero first, then gallery.
  const imgs = [project.value.thumbnail];
  if (project.value.images && project.value.images.length) {
    imgs.push(...project.value.images);
  }
  carouselImages.value = imgs;
  carouselIndex.value = 0;
  showCarousel.value = true;
};

const openGallery = (index) => {
  if (!project.value) return;
  const imgs = [project.value.thumbnail];
  if (project.value.images && project.value.images.length) {
    imgs.push(...project.value.images);
  }
  carouselImages.value = imgs;
  carouselIndex.value = index + 1; // +1 because index 0 is thumbnail
  showCarousel.value = true;
};
</script>

<template>
  <div class="project-detail">
    <Teleport to="body">
      <CarouselModal 
        :visible="showCarousel" 
        :images="carouselImages" 
        :initial-index="carouselIndex" 
        @close="showCarousel = false" 
      />
    </Teleport>
    
    <div v-if="loading" class="loading-state">
      LOADING DATA FRAGMENTS...
    </div>

    <div v-else class="content">
      <div class="nav-header">
        <button @click="goBack" class="back-btn" title="RETURN TO ARCHIVE">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/></svg>
          {{ t('BACK') }}
        </button>
      </div>

      <img :src="project.thumbnail" class="hero-image" @click="openHero" />
      
      <div class="info-panel">
        <div class="meta-row">
          <div class="meta">
            <span class="label">{{ t('DATE') }}:</span> {{ project.date }}
          </div>
          <a v-if="project.project_url" :href="project.project_url" target="_blank" class="visit-btn">
            {{ t('VISIT_SITE') }}
            <svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/></svg>
          </a>
        </div>
        <p class="description">{{ description }}</p>
      </div>

      <div class="gallery-grid">
        <div v-for="(img, idx) in project.images" :key="idx" class="gallery-item">
          <img :src="img" @click="openGallery(idx)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-detail {
  padding: 20px;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 5px;
  scrollbar-width: thin;
  scrollbar-color: var(--neon-blue) transparent;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--neon-blue);
  font-family: monospace;
  animation: blink 1s infinite;
}

.nav-header {
  margin-bottom: 20px;
}

.back-btn {
  background: transparent;
  border: none;
  color: var(--neon-blue);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: var(--font-header);
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 0;
  transition: transform 0.2s;
}

.back-btn:hover {
  transform: translateX(-5px);
  text-shadow: 0 0 8px var(--neon-blue);
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.hero-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 1px solid var(--neon-blue);
  margin-bottom: 20px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
  cursor: zoom-in;
}

.info-panel {
  margin-bottom: 30px;
  border-left: 2px solid var(--neon-purple);
  padding-left: 15px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.visit-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(188, 19, 254, 0.1);
  border: 1px solid var(--neon-purple);
  color: var(--neon-purple);
  padding: 6px 12px;
  text-decoration: none;
  font-family: var(--font-main);
  font-size: 0.8rem;
  clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
  transition: all 0.3s;
}

.visit-btn:hover {
  background: var(--neon-purple);
  color: #000;
  box-shadow: 0 0 10px var(--neon-purple);
}

.visit-btn .icon {
  width: 16px;
  height: 16px;
}

.meta {
  font-family: var(--font-header);
  color: var(--neon-blue);
  font-size: 0.8rem;
}

.description {
  font-family: var(--font-text);
  line-height: 1.6;
  opacity: 0.9;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.gallery-item img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border: 1px solid rgba(0, 243, 255, 0.3);
  transition: all 0.3s;
  cursor: zoom-in;
}

.gallery-item img:hover {
  border-color: var(--neon-blue);
  transform: scale(1.05);
  box-shadow: 0 0 10px var(--neon-blue);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .project-detail {
    padding: 10px;
  }
  
  .hero-image {
    height: 150px;
  }
  
  .meta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .visit-btn {
    align-self: flex-start;
  }
  
  .description {
    font-size: 0.9rem;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 cols fixed for mobile gallery */
    gap: 5px;
  }
  
  .gallery-item img {
    height: 60px;
  }
}
</style>
