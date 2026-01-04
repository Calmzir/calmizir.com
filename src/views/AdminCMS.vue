<script setup>
import { ref, onMounted, computed } from 'vue';
import { projectService } from '../services/projectService';
import { useSystemLogs } from '../composables/useSystemLogs';
import CyberSwitch from '../components/UI/CyberSwitch.vue';

const projects = ref([]);
const { addLog, systemAlert } = useSystemLogs();

// Form Data
const isEditing = ref(false);
const showForm = ref(false);
const form = ref({
  id: null,
  title: '',
  description: '',
  description_es: '',
  date: new Date().toISOString().split('T')[0],
  thumbnail: '',
  project_url: '',
  images: []
});

const autoTranslate = async (direction) => {
  const isToSpanish = direction === 'toES';
  const sourceText = isToSpanish ? form.value.description : form.value.description_es;
  const langPair = isToSpanish ? 'en|es' : 'es|en';

  if (!sourceText) return;
  addLog(`TRANSLATING PACKET [${langPair}]...`, 'NET');
  
  try {
    const encodedText = encodeURIComponent(sourceText);
    // Using MyMemory Free Translation API
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${langPair}`);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
        if (isToSpanish) {
            form.value.description_es = data.responseData.translatedText;
        } else {
            form.value.description = data.responseData.translatedText;
        }
        addLog('TRANSLATION COMPLETE', 'SUCCESS');
    } else {
        throw new Error('Invalid response');
    }
  } catch (e) {
    addLog('TRANSLATION FAILED', 'ERROR');
    systemAlert("Manual translation required. Uplink failed.", "WARNING");
  }
};

// UI State
const useUrlForThumbnail = ref(false);
const useUrlForGallery = ref(false); // Switch for gallery too
const thumbnailPreview = ref('');

// Broadcast Channel for Real-time
const channel = new BroadcastChannel('cms_updates');

const loadProjects = async () => {
  projects.value = await projectService.getAll();
};

onMounted(async () => {
  const verified = await projectService.verify();
  if (!verified) {
    addLog('SESSION EXPIRED', 'WARNING');
  }
  await loadProjects();
});

// --- HELPER: File to Base64 ---
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (file.size > 2 * 1024 * 1024) {
      systemAlert("File too large! Keep it under 2MB.", "WARNING");
      reject("File too large");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// --- DRAG & DROP HANDLERS ---
const handleDropThumbnail = async (e) => {
  const file = e.dataTransfer.files[0];
  if (!file) return;
  try {
    const base64 = await fileToBase64(file);
    form.value.thumbnail = base64;
    thumbnailPreview.value = base64;
  } catch(e) { console.error(e) }
};

const handleThumbnailUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const base64 = await fileToBase64(file);
    form.value.thumbnail = base64;
    thumbnailPreview.value = base64;
  } catch (e) { console.error(e) }
};

const handleDropGallery = async (e) => {
  const files = Array.from(e.dataTransfer.files);
  for (const file of files) {
    try {
      const base64 = await fileToBase64(file);
      form.value.images.push(base64);
    } catch (e) { console.error(e) }
  }
};

const handleGalleryUpload = async (event) => {
  const files = Array.from(event.target.files);
  for (const file of files) {
    try {
      const base64 = await fileToBase64(file);
      form.value.images.push(base64);
    } catch (e) { console.error(e) }
  }
};

const removeGalleryImage = (index) => {
  form.value.images.splice(index, 1);
};

const dragIndex = ref(null);

const onDragStart = (index, event) => {
  dragIndex.value = index;
  event.dataTransfer.effectAllowed = 'move';
};

const onDropOrder = (dropIndex) => {
  if (dragIndex.value === null || dragIndex.value === dropIndex) return;
  const item = form.value.images.splice(dragIndex.value, 1)[0];
  form.value.images.splice(dropIndex, 0, item);
  dragIndex.value = null;
};

// --- CRUD ---
const resetForm = () => {
  form.value = {
    id: null,
    title: '',
    description: '',
    description_es: '',
    date: new Date().toISOString().split('T')[0],
    thumbnail: '',
    project_url: '',
    images: []
  };
  thumbnailPreview.value = '';
  useUrlForThumbnail.value = false;
  useUrlForGallery.value = false;
  isEditing.value = false;
  showForm.value = false;
};

const openCreate = () => {
  resetForm();
  showForm.value = true;
};

const openEdit = async (projectSummary) => {
  // Fetch full details to get images
  try {
    const fullProject = await projectService.getById(projectSummary.id);
    if (fullProject) {
       form.value = { ...fullProject, images: fullProject.images || [] };
    } else {
       // Fallback if fetch fails (shouldn't happen often)
       form.value = { ...projectSummary, images: [] };
    }
  } catch (e) {
    console.error("Failed to load project details", e);
    form.value = { ...projectSummary, images: [] };
  }

  // Check if thumbnail/images are URL or Base64 (simple heuristic)
  useUrlForThumbnail.value = !form.value.thumbnail.startsWith('data:');
  thumbnailPreview.value = form.value.thumbnail;
  
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
    channel.postMessage({ type: 'UPDATE' }); 
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

const thumbInput = ref(null);
const galleryInput = ref(null);

// Actions Dropdown Logic
const activeDropdownId = ref(null);
const toggleDropdown = (id) => {
  activeDropdownId.value = activeDropdownId.value === id ? null : id;
};
// Close dropdown when clicking elsewhere (basic)
onMounted(() => {
    document.addEventListener('click', (e) => {
        // If click is not on a dots-btn, close
        if (!e.target.closest('.dots-btn')) {
            activeDropdownId.value = null;
        }
    });
});
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
            <td class="actions-cell">
              <!-- Desktop: Icons Side-by-Side -->
              <div class="desktop-actions">
                <button @click="openEdit(p)" class="icon-btn edit" title="Edit">
                  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                </button>
                <button @click="deleteProject(p.id)" class="icon-btn delete" title="Delete">
                  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                </button>
              </div>

              <!-- Mobile: Dropdown -->
              <div class="mobile-actions">
                <button class="dots-btn" @click.stop="toggleDropdown(p.id)">
                  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" /></svg>
                </button>
                <div v-if="activeDropdownId === p.id" class="action-dropdown">
                  <button @click="openEdit(p); activeDropdownId = null">
                    <span class="icon">✏️</span> EDIT
                  </button>
                  <button @click="deleteProject(p.id); activeDropdownId = null" class="danger">
                    <span class="icon">🗑️</span> DELETE
                  </button>
                </div>
              </div>
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

        <!-- 1. Moved Project URL Above -->
        <div class="form-row">
          <label>Project URL</label>
          <input v-model="form.project_url" placeholder="https://..." />
        </div>

        <!-- 2. Thumbnail Section with Switch & DragDrop -->
        <div class="form-row section-box">
          <div class="row-header">
             <label>Thumbnail Image</label>
             <CyberSwitch v-model="useUrlForThumbnail" labelOn="URL MODE" labelOff="LOCAL UPLOAD" />
          </div>
          
          <!-- URL Mode -->
          <div v-if="useUrlForThumbnail" class="url-input-group">
            <input v-model="form.thumbnail" placeholder="Paste Image URL..." @input="thumbnailPreview = form.thumbnail" />
            <div v-if="thumbnailPreview" class="mini-preview">
               <img :src="thumbnailPreview" />
            </div>
          </div>

          <!-- Drag & Drop Mode -->
          <div 
            v-else 
            class="drag-drop-zone" 
            @dragover.prevent 
            @drop.prevent="handleDropThumbnail"
            @click="thumbInput.click()"
          >
            <input 
              type="file" 
              ref="thumbInput"
              hidden 
              @change="handleThumbnailUpload" 
              accept="image/*" 
            />
            
            <div v-if="thumbnailPreview" class="preview-full">
               <img :src="thumbnailPreview" />
               <div class="overlay">CHANGE IMAGE</div>
            </div>
            <div v-else class="placeholder">
               <span class="icon">⬇️</span>
               <p>DROP IMAGE HERE</p>
               <span class="sub">OR CLICK TO UPLOAD</span>
            </div>
          </div>
        </div>

        <!-- 3. Gallery Section with Switch & DragDrop -->
        <div class="form-row section-box">
           <div class="row-header">
             <label>Gallery Images</label>
             <CyberSwitch v-model="useUrlForGallery" labelOn="URL MODE" labelOff="LOCAL UPLOAD" />
          </div>

          <!-- URL Mode (Adder) -->
          <div v-if="useUrlForGallery" class="url-input-group">
             <input 
                placeholder="Paste URL and Hit Enter" 
                @keyup.enter="(e) => { if(e.target.value) { form.images.push(e.target.value); e.target.value=''; } }"
              />
          </div>

           <!-- Drag & Drop Mode -->
          <div 
            v-else 
            class="drag-drop-zone" 
            @dragover.prevent 
            @drop.prevent="handleDropGallery"
            @click="galleryInput.click()"
          >
            <input 
              type="file" 
              ref="galleryInput"
              hidden 
              multiple
              @change="handleGalleryUpload" 
              accept="image/*" 
            />
            <div class="placeholder">
               <span class="icon">📚</span>
               <p>DROP GALLERY IMAGES</p>
               <span class="sub">(APPENDS TO LIST)</span>
            </div>
          </div>

          <!-- Gallery Grid Preview (Shared for both methods) -->
          <div v-if="form.images.length > 0" class="gallery-grid">
            <div 
              v-for="(img, idx) in form.images" 
              :key="idx" 
              class="gallery-thumb"
              draggable="true"
              @dragstart="onDragStart(idx, $event)"
              @dragover.prevent
              @drop="onDropOrder(idx)"
            >
              <img :src="img" />
              <button type="button" class="remove-btn" @click="removeGalleryImage(idx)">×</button>
            </div>
          </div>
        </div>

        <div class="form-row">
           <div class="row-header">
             <label>Description (EN) 🇺🇸</label>
             <button type="button" @click="autoTranslate('toES')" class="action-btn translate-btn" title="Translate EN to ES">
                TRANSLATE TO ES 🇪🇸
             </button>
           </div>
           <textarea v-model="form.description" rows="5" placeholder="English description..."></textarea>
        </div>

        <div class="form-row">
           <div class="row-header">
             <label>Description (ES) 🇪🇸</label>
             <button type="button" @click="autoTranslate('toEN')" class="action-btn translate-btn" title="Translate ES to EN">
                TRANSLATE TO EN 🇺🇸
             </button>
           </div>
           <textarea v-model="form.description_es" rows="5" placeholder="Descripción en Español..."></textarea>
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

/* Section Box for Grouping Image Controls */
.section-box {
  background: rgba(0, 243, 255, 0.02);
  border: 1px solid rgba(0, 243, 255, 0.1);
  padding: 15px;
}

.row-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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

/* DRAG DROP ZONE */
.drag-drop-zone {
  width: 100%;
  height: 150px; /* Specific Height */
  border: 2px dashed var(--neon-blue);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  overflow: hidden;
}

.drag-drop-zone:hover {
  background: rgba(0, 243, 255, 0.05);
  box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.1);
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

.placeholder .icon { font-size: 2rem; }
.placeholder p { font-family: var(--font-header); letter-spacing: 1px; }
.placeholder .sub { font-size: 0.7rem; color: var(--neon-purple); }

.preview-full {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-full img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fill the box */
}

.preview-full .overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
  font-family: var(--font-code);
  pointer-events: none; /* Let click pass to open carousel or re-upload? Wait, user wants to re-upload on click of box */
}

/* User asked: inside box preview. Click triggers input (which is parent) OR Modals.
   Constraint: "Al hacer click en cualquiera de las imagenes... abrir ventana emergente".
   Conflict: Click on box opens file dialog VS click on image opens modal.
   Resolution: We need separate click zones or check event target.
   Since img is inside the drag zone which does @click="input.click()", we need @click.stop on the img to open modal.
*/

.preview-full:hover .overlay {
  opacity: 1; 
  /* If overlay is visible, clicking it triggers parent (file upload). 
     Clicking IMG directly triggers Modal. 
     So overlay should probably say "CLICK TO REPLACE", but we need a way to View.
     Let's make clicking the image view it, and maybe a small button to replace?
     Or just drag to replace.
     Code implemented: @click.stop="openThumbnailCarousel" on IMG.
  */
}


/* URL INPUT MINI PREVIEW */
.url-input-group {
    display: flex;
    gap: 10px;
    align-items: center;
}
.mini-preview {
    width: 50px;
    height: 40px;
    border: 1px solid var(--neon-blue);
    cursor: zoom-in;
}
.mini-preview img {
    width: 100%; height: 100%; object-fit: cover;
}


/* Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.gallery-thumb {
  position: relative;
  height: 60px;
  border: 1px solid #444;
  cursor: zoom-in;
}

.gallery-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.2s;
}

.gallery-thumb:hover img {
   filter: brightness(1.2);
}

.remove-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 10px;
  cursor: pointer;
  z-index: 10;
}

.translate-btn {
  border-color: var(--neon-cyan);
  color: var(--neon-cyan);
  font-size: 0.7rem;
}
.translate-btn:hover {
  background: var(--neon-cyan);
  color: #000;
}

/* --- ACTION BUTTONS (ICONS & DROPDOWN) --- */
.desktop-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.icon-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #fff;
  width: 32px;
  height: 32px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-btn svg { width: 100%; height: 100%; }

.icon-btn.edit:hover { color: var(--neon-blue); border-color: var(--neon-blue); box-shadow: 0 0 5px var(--neon-blue); }
.icon-btn.delete:hover { color: #f00; border-color: #f00; box-shadow: 0 0 5px #f00; }

.mobile-actions {
  display: none; /* Hidden on Desktop */
  position: relative;
}

.dots-btn {
  background: transparent;
  border: none;
  color: var(--neon-blue);
  cursor: pointer;
  padding: 5px;
}
.dots-btn svg { width: 24px; height: 24px; }

.action-dropdown {
  position: absolute;
  right: 0;
  top: 100%; /* Below button */
  background: #0a0f18; /* Solid dark background */
  border: 1px solid var(--neon-blue);
  box-shadow: 0 0 15px rgba(0,0,0,0.8);
  z-index: 9999; /* High Z-Index as requested */
  display: flex;
  flex-direction: column;
  min-width: 140px;
  border-radius: 4px;
  overflow: hidden;
}

.action-dropdown button {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  padding: 12px 15px;
  text-align: left;
  font-family: var(--font-code);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.action-dropdown button:hover {
  background: rgba(0, 243, 255, 0.1);
}

.action-dropdown button.danger {
  color: #ff4444;
}
.action-dropdown button.danger:hover {
  background: rgba(255, 0, 0, 0.1);
}
.action-dropdown button:last-child {
  border-bottom: none;
}

.action-dropdown .icon { font-size: 1.1rem; }

@media (max-width: 768px) {
  .desktop-actions { display: none; }
  .mobile-actions { display: block; margin-left: auto; }
  .actions-cell { width: 50px; text-align: center; }
}
</style>
