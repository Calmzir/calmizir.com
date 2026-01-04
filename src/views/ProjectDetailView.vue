<script setup>
import { ref, onMounted } from 'vue';
import { projectService } from '../services/projectService';
import { useSystemLogs } from '../composables/useSystemLogs';
import { useWindowManager } from '../composables/useWindowManager';

const props = defineProps(['projectId', 'windowId']);
const project = ref(null);
const loading = ref(true);
const { addLog } = useSystemLogs();
const { closeWindow } = useWindowManager();

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
</script>

<template>
  <div class="project-detail">
    <div v-if="loading" class="loading-state">
      LOADING DATA FRAGMENTS...
    </div>

    <div v-else class="content">
      <div class="nav-header">
        <button @click="goBack" class="back-btn" title="RETURN TO ARCHIVE">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z"/></svg>
          BACK
        </button>
      </div>

      <img :src="project.thumbnail" class="hero-image" />
      
      <div class="info-panel">
        <div class="meta-row">
          <div class="meta">
            <span class="label">DATE:</span> {{ project.date }}
          </div>
          <a v-if="project.project_url" :href="project.project_url" target="_blank" class="visit-btn">
            VISIT SITE
            <svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/></svg>
          </a>
        </div>
        <p class="description">{{ project.description }}</p>
      </div>

      <div class="gallery-grid">
        <div v-for="(img, idx) in project.images" :key="idx" class="gallery-item">
          <img :src="img" />
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
</style>
