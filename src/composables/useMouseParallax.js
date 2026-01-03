import { ref, onMounted, onUnmounted } from 'vue'

export function useMouseParallax(intensity = 20) {
  const tiltX = ref(0)
  const tiltY = ref(0)

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2)
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2)

    // Inverse the movement for background feel
    tiltX.value = x * intensity
    tiltY.value = y * intensity
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return { tiltX, tiltY }
}
