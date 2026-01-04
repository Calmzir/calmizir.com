import { ref } from 'vue';

const logs = ref([]);
const MAX_LOGS = 50;

export function useSystemLogs() {

    const addLog = (message, type = 'INFO') => {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

        logs.value.push({
            id: Date.now() + Math.random(),
            time: timestamp,
            type,
            message
        });

        // Rotate logs to prevent memory overflow
        if (logs.value.length > MAX_LOGS) {
            logs.value.shift();
        }
    };

    return {
        logs,
        addLog
    };
}
