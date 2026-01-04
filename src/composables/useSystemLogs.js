import { ref } from 'vue';

const logs = ref([]);
const MAX_LOGS = 50;

// Shared state for the global alert modal
const alertVisible = ref(false);
const alertMessage = ref('');
const alertType = ref('INFO');

export function useSystemLogs() {

    const addLog = (message, type = 'INFO') => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

        logs.value.push({
            id: Date.now() + Math.random(),
            time: timestamp,
            type,
            message
        });

        if (logs.value.length > MAX_LOGS) {
            logs.value.shift();
        }
    };

    const systemAlert = (message, type = 'INFO') => {
        // 1. Add to logs
        addLog(message, type);

        // 2. Trigger Modal
        alertMessage.value = message;
        alertType.value = type;
        alertVisible.value = true;
    };

    const closeAlert = () => {
        alertVisible.value = false;
    };

    return {
        logs,
        addLog,
        systemAlert,
        alertVisible,
        alertMessage,
        alertType,
        closeAlert
    };
}
