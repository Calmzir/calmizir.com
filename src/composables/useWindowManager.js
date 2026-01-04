import { ref } from 'vue';

const windows = ref([]);
let zIndexCounter = 1000;

export function useWindowManager() {

    const openWindow = (component, props = {}, title = 'System Window', id = null) => {
        const windowId = id || `win_${Date.now()}`;

        // Check if already open
        const existing = windows.value.find(w => w.id === windowId);
        if (existing) {
            focusWindow(windowId);
            return;
        }

        zIndexCounter++;
        windows.value.push({
            id: windowId,
            component,
            props,
            title,
            zIndex: zIndexCounter,
            minimized: false
        });
    };

    const closeWindow = (id) => {
        const index = windows.value.findIndex(w => w.id === id);
        if (index !== -1) {
            windows.value.splice(index, 1);
        }
    };

    const focusWindow = (id) => {
        const win = windows.value.find(w => w.id === id);
        if (win) {
            zIndexCounter++;
            win.zIndex = zIndexCounter;
        }
    };

    return {
        windows,
        openWindow,
        closeWindow,
        focusWindow
    };
}
