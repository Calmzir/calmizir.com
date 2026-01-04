<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { projectService } from '../services/projectService';
import { useWindowManager } from '../composables/useWindowManager';
import ProjectDetailView from './ProjectDetailView.vue';
import AdminLogin from './AdminLogin.vue';
import HoloCard from '../components/UI/HoloCard.vue';
import { useSystemLogs } from '../composables/useSystemLogs'; // Import

const projects = ref([]);
const { openWindow } = useWindowManager();
const { addLog } = useSystemLogs(); // Init

// Real-time updates
const channel = new BroadcastChannel('cms_updates');

const loadProjects = async () => {
    projects.value = await projectService.getAll();
};

onMounted(async () => {
  await loadProjects();
  
  channel.onmessage = (event) => {
    if (event.data.type === 'UPDATE') {
        addLog('DATABASE UPDATE DETECTED', 'INFO');
        loadProjects();
    }
  };
});

onUnmounted(() => {
    channel.close();
});

const openProject = (project) => {
  addLog(`ACCESSING_FILE: ${project.title}`, 'ACTION');
  openWindow(ProjectDetailView, { projectId: project.id }, `PROJECT: ${project.title.toUpperCase()}`);
};

const openAdmin = () => {
    openWindow(AdminLogin, {}, 'SYSTEM ACCESS');
};

</script>

<template>
  <div class="portfolio-list">
    <div class="header-section">
      <div class="header-row">
        <h2>PROJECT ARCHIVE</h2>
        <button @click="openAdmin" class="admin-btn">π</button>
      </div>
      <div class="line"></div>
    </div>

    <div class="projects-grid">
      <div 
        v-for="project in projects" 
        :key="project.id" 
        class="project-item"
        @click="openProject(project)"
      >
        <div class="thumb-container">
          <img :src="project.thumbnail" />
          <div class="overlay">OPEN</div>
        </div>
        <div class="info">
          <h3>{{ project.title }}</h3>
          <button class="open-btn">ACCESS</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portfolio-list {
  padding: 20px;
  height: 100%;
}


.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-section h2 {
  color: var(--neon-blue);
  font-family: var(--font-header);
  letter-spacing: 2px;
  margin-bottom: 5px;
}

.admin-btn {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.1);
  font-family: var(--font-code);
  font-size: 0.8rem;
  cursor: pointer;
}

.admin-btn:hover {
  color: var(--neon-blue);
}

.line {
  height: 1px;
  background: var(--neon-blue);
  width: 50px;
  margin-bottom: 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.project-item {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 243, 255, 0.2);
  padding: 10px;
  transition: all 0.3s;
  cursor: pointer;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
}

.project-item:hover {
  border-color: var(--neon-blue);
  background: rgba(0, 243, 255, 0.05);
}

.thumb-container {
  height: 100px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.thumb-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.project-item:hover img {
  transform: scale(1.1);
}

.info h3 {
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 10px;
  font-family: var(--font-header);
}

.open-btn {
  width: 100%;
  background: transparent;
  border: 1px solid var(--neon-purple);
  color: var(--neon-purple);
  font-size: 0.7rem;
  padding: 4px;
  cursor: pointer;
  font-family: var(--font-main);
  transition: all 0.2s;
  /* Top-Left and Bottom-Right Cuts */
  clip-path: polygon(
    5px 0, 
    100% 0, 
    100% calc(100% - 5px), 
    calc(100% - 5px) 100%, 
    0 100%, 
    0 5px
  );
}

.project-item:hover .open-btn {
  background: var(--neon-purple);
  color: #000;
}
</style>
