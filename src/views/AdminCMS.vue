<script setup>
import { ref, onMounted } from 'vue';
import { projectService } from '../services/projectService';
import { useSystemLogs } from '../composables/useSystemLogs';

const projects = ref([]);
const { addLog } = useSystemLogs();

// Form Data
const isEditing = ref(false);
const showForm = ref(false);
const form = ref({
  id: null,
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  thumbnail: '',
  project_url: '',
  images: [] // Array of strings (URLs)
});

// Broadcast Channel for Real-time
const channel = new BroadcastChannel('cms_updates');

const loadProjects = async () => {
  projects.value = await projectService.getAll();
};

onMounted(async () => {
  const verified = await projectService.verify();
  if (!verified) {
    addLog('SESSION EXPIRED', 'WARNING');
    // Ideally redirect to login, but for now we just log
  }
  await loadProjects();
});

const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    thumbnail: '',
    project_url: '',
    images: []
  };
  isEditing.value = false;
  showForm.value = false;
};

const openCreate = () => {
  resetForm();
  showForm.value = true;
};

const openEdit = (project) => {
  form.value = { ...project, images: project.images || [] };
  isEditing.value = true;
  showForm.value = true;
};

const saveProject = async () => {
  try {
    if (isEditing.value) {
      await projectService.update(form.value.id, form.value);
      addLog(`PROJECT UPDATED: ${form.value.title}`, 'SUCCESS');
    } else {
      await projectService.create(form.value);
      addLog(`PROJECT CREATED: ${form.value.title}`, 'SUCCESS');
    }
    await loadProjects();
    channel.postMessage({ type: 'UPDATE' }); // Notify other windows
    resetForm();
  } catch (e) {
    addLog('OPERATION FAILED', 'ERROR');
  }
};

const deleteProject = async (id) => {
  if (!confirm('Are you sure you want to purge this record?')) return;
  try {
    await projectService.delete(id);
    addLog('PROJECT PURGED', 'WARNING');
    await loadProjects();
    channel.postMessage({ type: 'UPDATE' });
  } catch (e) {
    addLog('DELETE FAILED', 'ERROR');
  }
};
</script>

<template>
  <div class="cms-container">
    <div class="cms-header">
      <h3>DATABASE CONTROLLER</h3>
      <button @click="openCreate" class="action-btn create-btn">+ NEW ENTRY</button>
    </div>

    <!-- PROJECT LIST -->
    <div v-if="!showForm" class="list-view">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>DATE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in projects" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.title }}</td>
            <td>{{ p.date }}</td>
            <td class="actions">
              <button @click="openEdit(p)" class="action-btn edit">EDIT</button>
              <button @click="deleteProject(p.id)" class="action-btn delete">DEL</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- EDIT FORM -->
    <div v-else class="form-view">
      <form @submit.prevent="saveProject">
        <div class="form-row">
          <label>Title</label>
          <input v-model="form.title" required />
        </div>
        <div class="form-row">
          <label>Date</label>
          <input v-model="form.date" type="date" required />
        </div>
        <div class="form-row">
          <label>Thumbnail URL</label>
          <input v-model="form.thumbnail" placeholder="https://..." />
        </div>
         <div class="form-row">
          <label>Project URL</label>
          <input v-model="form.project_url" placeholder="https://..." />
        </div>
        <div class="form-row">
          <label>Description</label>
          <textarea v-model="form.description" rows="5"></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="resetForm" class="action-btn cancel">CANCEL</button>
          <button type="submit" class="action-btn save">SAVE RECORD</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.cms-container {
  padding: 20px;
  color: #fff;
  height: 100%;
  overflow-y: auto;
}

.cms-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.3);
  padding-bottom: 10px;
}

h3 {
  font-family: var(--font-header);
  color: var(--neon-blue);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-code);
  font-size: 0.8rem;
}

th, td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  color: var(--neon-purple);
}

.action-btn {
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  font-family: var(--font-code);
  transition: all 0.2s;
  margin-right: 5px;
}

.create-btn {
  border-color: var(--neon-blue);
  color: var(--neon-blue);
}

.create-btn:hover {
  background: var(--neon-blue);
  color: #000;
}

.edit:hover {
  background: rgba(255, 255, 255, 0.2);
}

.delete {
  border-color: var(--neon-red, red);
  color: var(--neon-red, red);
}

.delete:hover {
  background: var(--neon-red, red);
  color: #000;
}

.form-view {
  background: rgba(0,0,0,0.3);
  padding: 20px;
  border: 1px solid var(--neon-blue);
}

.form-row {
  margin-bottom: 15px;
}

label {
  display: block;
  font-family: var(--font-code);
  color: var(--neon-blue);
  margin-bottom: 5px;
  font-size: 0.8rem;
}

input, textarea {
  width: 100%;
  background: rgba(0,0,0,0.5);
  border: 1px solid #444;
  color: #fff;
  padding: 8px;
  font-family: var(--font-main);
}

input:focus, textarea:focus {
  border-color: var(--neon-blue);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.save {
  background: var(--neon-blue);
  color: #000;
  border: none;
  font-weight: bold;
}
</style>
