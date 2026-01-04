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

        let newX = initialLeft + dx;
        let newY = initialTop + dy;

        // Constraints
        const headerHeight = 40; // Approx header height
        const minVisibleWidth = 100; // Keep at least this much visible

        // Prevent going off-screen top
        if (newY < 0) newY = 0;
        // Prevent going off-screen bottom (header must be reachable)
        if (newY > window.innerHeight - headerHeight) newY = window.innerHeight - headerHeight;

        // Prevent going too far left (keep right side visible)
        // Since we don't know width, we just prevent left side from going WAY off screen? 
        // Actually, user standard is usually: keep left edge somewhat on screen.
        // Let's constrain left edge between 0 and window.width - minVisibleWidth

        // Simpler approach: Keep (0,0) somewhat strictly inside?
        // Let's allow partial off-screen but keep header usable.

        if (newX < 0) newX = 0; // Don't go off left
        if (newX > window.innerWidth - minVisibleWidth) newX = window.innerWidth - minVisibleWidth; // Don't go too far right

        x.value = newX;
        y.value = newY;
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
