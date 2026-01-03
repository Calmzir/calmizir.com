import { ref, onUnmounted } from 'vue';

export function useDraggable(initialX = 0, initialY = 0) {
    const x = ref(initialX);
    const y = ref(initialY);
    const isDragging = ref(false);

    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    const onDragStart = (e) => {
        // Allows drag from mouse or touch
        const clientX = e.clientX || e.touches?.[0].clientX;
        const clientY = e.clientY || e.touches?.[0].clientY;

        if (!clientX || !clientY) return;

        isDragging.value = true;
        startX = clientX;
        startY = clientY;
        initialLeft = x.value;
        initialTop = y.value;

        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('touchmove', onDragMove);
        window.addEventListener('touchend', onDragEnd);
    };

    const onDragMove = (e) => {
        if (!isDragging.value) return;

        const clientX = e.clientX || e.touches?.[0].clientX;
        const clientY = e.clientY || e.touches?.[0].clientY;

        if (!clientX || !clientY) return;

        const dx = clientX - startX;
        const dy = clientY - startY;

        x.value = initialLeft + dx;
        y.value = initialTop + dy;
    };

    const onDragEnd = () => {
        isDragging.value = false;
        window.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('touchmove', onDragMove);
        window.removeEventListener('touchend', onDragEnd);
    };

    onUnmounted(() => {
        window.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
        window.removeEventListener('touchmove', onDragMove);
        window.removeEventListener('touchend', onDragEnd);
    });

    return {
        x,
        y,
        isDragging,
        onDragStart
    };
}
