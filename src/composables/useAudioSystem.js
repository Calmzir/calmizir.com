import { ref, onMounted } from 'vue';

const isPlaying = ref(false);
const isMuted = ref(true); // Default to muted to allow autoplay
const volume = ref(0.2); // Low background volume
let audio = null;

const metadata = {
    artist: 'Luke Melville',
    song: 'Astronic'
};

export function useAudioSystem() {

    const initAudio = () => {
        if (audio) return; // Already initialized

        audio = new Audio('/sounds/Luke Melville - Astronic.mp3');
        audio.loop = true;
        audio.volume = volume.value;
        audio.muted = isMuted.value;

        // Attempt autoplay
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying.value = true;
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                isPlaying.value = false;
                console.log("Autoplay prevented. User interaction required.");
            });
        }
    };

    const toggleMute = () => {
        if (!audio) {
            initAudio(); // Try init if not ready
            // If it was not ready, it might be due to no interaction. 
            // Calling init here on click should work.
        }

        // If we are "muted" (effective state), we want to unmute and play.
        // Or if we are just paused/blocked.

        if (isMuted.value) {
            // Unmuting
            isMuted.value = false;
            audio.muted = false;
            if (audio.paused) {
                audio.play().then(() => isPlaying.value = true);
            }
        } else {
            // Muting
            isMuted.value = true;
            audio.muted = true;
        }
    };

    return {
        isMuted,
        isPlaying,
        metadata,
        initAudio,
        toggleMute
    };
}
