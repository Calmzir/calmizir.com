<script setup>
import { ref } from 'vue'
import HoloCard from '../components/UI/HoloCard.vue'
import { useSystemLogs } from '../composables/useSystemLogs'; // Import

const { addLog } = useSystemLogs(); // Init

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  addLog(`TRANSMISSION_INITIATED: [ID:${form.value.name}]`, 'ACTION');
  addLog('ENCRYPTING_DATA_PACKET...', 'SYS');
  setTimeout(() => {
    alert('TRANSMISSION SENT TO SECTOR 7G')
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
    addLog('TRANSMISSION_COMPLETE', 'SYS');
  }, 500);
}
</script>

<template>
  <div class="view-container contact-view">
    <p class="contact-intro">
      Contact me directly via phone or send me an encrypted email packet. I will respond as soon as possible.
    </p>

    <!-- WhatsApp Button (Same as Sidebar) -->
    <a href="https://wa.me/5699419549?text=Hello!%20I'd%20love%20to%20get%20in%20touch%20with%20you." target="_blank" class="contact-wa-btn">
      <svg viewBox="0 0 24 24" class="wa-icon"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      WHATSAPP DIRECT UPLINK
    </a>

    <div class="divider">OR SECURE FORM</div>

    <form @submit.prevent="submitForm" class="cyber-form">
      <div class="form-group">
        <label>IDENTIFICATION</label>
        <input type="text" v-model="form.name" placeholder="Enter your name" required />
        <div class="input-line"></div>
      </div>

      <div class="form-group">
        <label>RETURN SIGNAL (EMAIL)</label>
        <input type="email" v-model="form.email" placeholder="Enter your email" required />
        <div class="input-line"></div>
      </div>
      
      <div class="form-group">
        <label>DATA PACKET</label>
        <textarea v-model="form.message" rows="4" placeholder="Enter your message..." required></textarea>
        <div class="input-line"></div>
      </div>

      <button type="submit" class="transmit-btn">
        INITIALIZE TRANSMISSION
      </button>
    </form>

    <div class="contact-footer-quote">
      "Take the first step to make your idea a reality!"
    </div>
  </div>
</template>

<style scoped>
.contact-view {
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.contact-intro {
  color: #fff;
  font-family: monospace;
  text-align: center;
  margin-bottom: 10px;
  opacity: 0.8;
  width: 100%;
}

.contact-wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(37, 211, 102, 0.1);
  border: 1px solid #25D366;
  border-radius: 0; /* Enforce square */
  color: #25D366;
  padding: 12px 20px;
  width: 100%;
  text-decoration: none;
  font-family: var(--font-header);
  letter-spacing: 2px;
  transition: all 0.3s;
  /* Top-Left and Bottom-Right Cuts */
  clip-path: polygon(
    10px 0, 
    100% 0, 
    100% calc(100% - 10px), 
    calc(100% - 10px) 100%, 
    0 100%, 
    0 10px
  );
}

.contact-wa-btn:hover {
  background: #25D366;
  color: #000;
  box-shadow: 0 0 20px rgba(37, 211, 102, 0.4);
}

.wa-icon {
  width: 24px;
  height: 24px;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--neon-purple);
  font-size: 0.8rem;
  letter-spacing: 2px;
  opacity: 0.6;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--neon-purple);
  margin: 0 10px;
  opacity: 0.3;
}

.cyber-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.form-group {
  position: relative;
}

label {
  display: block;
  color: var(--neon-blue);
  font-size: 0.7rem;
  margin-bottom: 5px;
  font-family: var(--font-main);
  letter-spacing: 1px;
}

input, textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 243, 255, 0.1);
  border-radius: 0; /* Enforce square */
  color: #fff;
  padding: 10px;
  font-family: var(--font-text);
  outline: none;
  font-size: 0.9rem;
  transition: border-color 0.3s;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
}

textarea {
  resize: vertical;
}

input:focus, textarea:focus {
  border-color: var(--neon-blue);
}

.input-line {
  height: 1px;
  width: 0;
  background: var(--neon-blue); /* Changed to blue to match theme */
  transition: width 0.3s ease;
  position: absolute;
  bottom: 0;
  left: 0;
}

input:focus ~ .input-line,
textarea:focus ~ .input-line {
  width: 100%;
}

.transmit-btn {
  background: transparent;
  border: 1px solid var(--neon-blue);
  color: var(--neon-blue);
  padding: 12px;
  font-family: var(--font-main);
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 5px;
  /* Top-Left and Bottom-Right Cuts */
  clip-path: polygon(
    10px 0, 
    100% 0, 
    100% calc(100% - 10px), 
    calc(100% - 10px) 100%, 
    0 100%, 
    0 10px
  );
}

.transmit-btn:hover {
  background: var(--neon-blue);
  color: #000;
  box-shadow: 0 0 20px var(--neon-blue);
}

.contact-footer-quote {
  margin-top: auto;
  color: var(--neon-purple);
  font-style: italic;
  font-family: var(--font-header);
  text-align: center;
  opacity: 0.9;
  letter-spacing: 1px;
}
</style>
