import { ref, onMounted } from 'vue';

const isPlaying = ref(false);
const isMuted = ref(false); // Default to unmuted
const volume = ref(0.2); // Low background volume
let audio = null;

const metadata = {
    artist: 'Cyberpunk',
    song: 'Odyssey'
};

export function useAudioSystem() {

    const initAudio = () => {
        if (audio) return; // Already initialized

        audio = new Audio('/sounds/Cyberpunk Odyssey.mp3');
        audio.loop = true;
        audio.volume = volume.value;

        // Load saved mute preference
        const savedMuted = localStorage.getItem('background_audio_muted');
        if (savedMuted !== null) {
            isMuted.value = savedMuted === 'true';
        }

        audio.muted = isMuted.value;

        // Attempt autoplay
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying.value = true;
            }).catch(error => {
                isPlaying.value = false;
                console.log("Autoplay prevented. User interaction required.");
            });
        }
    };

    const toggleMute = () => {
        if (!audio) {
            initAudio();
        }

        if (isMuted.value) {
            // Unmuting
            isMuted.value = false;
            audio.muted = false;
            localStorage.setItem('background_audio_muted', 'false'); // Save

            if (audio.paused) {
                audio.play().then(() => isPlaying.value = true);
            }
        } else {
            // Muting
            isMuted.value = true;
            audio.muted = true;
            localStorage.setItem('background_audio_muted', 'true'); // Save
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
