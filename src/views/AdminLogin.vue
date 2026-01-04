<script setup>
import { ref } from 'vue';
import { projectService } from '../services/projectService';
import { useSystemLogs } from '../composables/useSystemLogs';
import { useWindowManager } from '../composables/useWindowManager';
import AdminCMS from './AdminCMS.vue';


const props = defineProps({
  windowId: String
});

const username = ref('');
const password = ref('');
const error = ref('');
const { addLog } = useSystemLogs();
const { openWindow, closeWindow } = useWindowManager();

const handleLogin = async () => {
  try {
    error.value = '';
    await projectService.login(username.value, password.value);
    addLog('ADMIN ACCESS GRANTED', 'SUCCESS');
    
    // Open CMS on the right side (assuming standard 1920 width, somewhere clear)
    openWindow(AdminCMS, { initialX: 800, initialY: 100 }, 'SYSTEM CONTROL');
    
    // Close Login Window
    if (props.windowId) {
        closeWindow(props.windowId);
    }
  } catch (e) {
    error.value = 'Invalid Credentials';
    addLog('ADMIN ACCESS DENIED', 'ERROR');
  }
};

</script>

<template>
  <div class="login-container">
    <h2>SYSTEM ACCESS</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>IDENTITY</label>
        <input v-model="username" type="text" required autofocus placeholder="usr_admin" />
      </div>
      <div class="form-group">
        <label>KEY</label>
        <input v-model="password" type="password" required placeholder="•••••••" />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit" class="cyber-btn">AUTHENTICATE</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0,20,40,0.8), rgba(0,0,0,0.95));
}

h2 {
  color: var(--neon-blue);
  font-family: var(--font-header);
  letter-spacing: 4px;
  margin-bottom: 30px;
  text-shadow: 0 0 10px var(--neon-blue);
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

label {
  display: block;
  font-family: var(--font-code);
  color: var(--neon-purple);
  margin-bottom: 5px;
  font-size: 0.8rem;
}

input {
  width: 100%;
  background: rgba(0,0,0,0.5);
  border: 1px solid var(--neon-blue);
  color: #fff;
  padding: 10px;
  font-family: var(--font-code);
  outline: none;
  transition: all 0.3s;
}

input:focus {
  background: rgba(0, 243, 255, 0.1);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
}

.cyber-btn {
  background: transparent;
  border: 2px solid var(--neon-blue);
  color: var(--neon-blue);
  padding: 10px 30px;
  font-family: var(--font-header);
  letter-spacing: 2px;
  cursor: pointer;
  margin-top: 10px;
  transition:all 0.3s;
  width: 100%;
}

.cyber-btn:hover {
  background: var(--neon-blue);
  color: #000;
  box-shadow: 0 0 20px var(--neon-blue);
}

.error {
  color: var(--neon-red, #ff0000);
  font-family: var(--font-code);
  margin-bottom: 15px;
  text-shadow: 0 0 5px red;
}

@media (max-width: 768px) {
  .login-container {
    padding: 20px;
  }
}
</style>
