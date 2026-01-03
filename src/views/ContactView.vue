<script setup>
import { ref } from 'vue'
import HoloCard from '../components/UI/HoloCard.vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  alert('TRANSMISSION SENT TO SECTOR 7G')
  form.value.name = ''
  form.value.email = ''
  form.value.message = ''
}
</script>

<template>
  <div class="view-container contact-view">
    <p class="contact-intro">
      Contact me directly via phone or send me an encrypted email packet. I will respond as soon as possible.
    </p>

    <!-- WhatsApp Button (Same as Sidebar) -->
    <a href="https://wa.me/5699419549?text=Hello!%20I'd%20love%20to%20get%20in%20touch%20with%20you." target="_blank" class="contact-wa-btn">
      <svg viewBox="0 0 24 24" class="wa-icon"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16-.03-.43-.05-.63-.05c-.2 0-.52.07-.79.37c-.27.29-1.04 1.01-1.04 2.47s1.07 2.86 1.22 3.06c.15.19 2.1 3.21 5.09 4.5c.73.31 1.25.5 1.66.63c.67.22 1.28.19 1.77.12c.54-.08 1.66-.68 1.9-1.34c.24-.66.24-1.22.17-1.34c-.07-.12-.25-.19-.52-.32c-.27-.14-1.61-.79-1.86-.88c-.25-.09-.43-.14-.61.13c-.18.28-.7 .88-.86 1.05c-.16.18-.32.19-.59.06c-.27-.13-1.15-.42-2.19-1.34c-.81-.72-1.36-1.61-1.52-1.88c-.16-.27-.02-.42.11-.55c.12-.12.27-.31.4-.47c.13-.15.18-.26.27-.43c.09-.17.05-.32-.02-.45c-.08-.13-.73-1.77-1.01-2.42c-.25-.57-.5-.5-.69-.51"/></svg>
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
  color: #25D366;
  padding: 12px 20px;
  width: 100%;
  text-decoration: none;
  font-family: var(--font-header);
  letter-spacing: 2px;
  transition: all 0.3s;
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
  color: #fff;
  padding: 10px;
  font-family: var(--font-text);
  outline: none;
  font-size: 0.9rem;
  transition: border-color 0.3s;
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
