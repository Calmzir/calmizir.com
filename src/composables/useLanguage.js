import { ref, computed, watch } from 'vue';

const currentLang = ref('EN');

// Cookie Helper
const setCookie = (name, value, days = 365) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Initialize from Cookie
const saved = getCookie('calmizir_lang');
if (saved && (saved === 'EN' || saved === 'ES')) {
    currentLang.value = saved;
}

watch(currentLang, (newVal) => {
    setCookie('calmizir_lang', newVal);
});

// Dictionary
const translations = {
    EN: {
        // HUD & Nav
        DASHBOARD: 'DASHBOARD',
        BIO_DATA: 'BIO_DATA',
        PROJECTS: 'PROJECTS',
        COMM_LINK: 'COMM_LINK',
        SYSTEM_ONLINE: 'SYSTEM ONLINE',

        // HomeView
        WELCOME_PILOT: 'WELCOME PILOT',
        ACCESS_GRANTED: 'ACCESS GRANTED',
        INITIALIZING_INTERFACE: 'INITIALIZING INTERFACE...',
        ENTER_SYSTEM: 'ENTER SYSTEM',

        // AboutView
        FULLNAME: 'FULLNAME',
        CODENAME: 'CODENAME',
        OCCUPATION: 'OCCUPATION',
        STATUS: 'STATUS',
        RANK: 'RANK',
        OPERATIONAL: 'OPERATIONAL',
        SENIOR_OFFICER: 'SENIOR OFFICER',
        BIOGRAPHY: 'BIOGRAPHY',
        SKILL_MATRIX: 'SKILL_MATRIX',
        LANGUAGES: 'LANGUAGES',
        MODULES: 'MODULES',
        ESPANOL: 'ESPAÑOL',
        ENGLISH: 'ENGLISH',
        BIO_PARAGRAPH: "A VETERAN ARCHITECT OF DIGITAL SYSTEMS SPECIALIZED IN CONSTRUCTING HIGH-PERFORMANCE WEB INFRASTRUCTURES. I BRIDGE THE GAP BETWEEN CONCEPTUAL DESIGN AND FUNCTIONAL DEPLOYMENT, CRAFTING IMMERSIVE EXPERIENCES THAT RESONATE. MY MISSION IS TO UPGRADE YOUR VISION INTO A TANGIBLE REALITY, OPTIMIZING EVERY PIXEL AND LINE OF CODE FOR MAXIMUM IMPACT.",
        BIO_QUOTE: "IF YOU CAN IMAGINE IT, IT CAN BE CREATED. YOU ONLY HAVE TO TAKE THE FIRST STEP.",
        BTN_BIOGRAPHY: 'BIOGRAPHY',
        BTN_PORTFOLIO: 'PORTFOLIO',
        BTN_CONTACT: 'CONTACT',

        // PortfolioView
        PROJECT_ARCHIVE: 'PROJECT ARCHIVE',
        ARCHIVES_OFFLINE: 'ARCHIVES OFFLINE',
        NO_PROJECT_DATA: 'NO PROJECT DATA RETRIEVED FROM SERVER.',
        WAITING_UPLINK: '[WAITING FOR UPLINK...]',
        OPEN: 'OPEN',
        ACCESS: 'ACCESS',

        // ContactView
        CONTACT_INTRO: 'Contact me directly via phone or send me an encrypted email packet. I will respond as soon as possible.',
        WHATSAPP_LINK: 'WHATSAPP DIRECT UPLINK',
        OR_SECURE_FORM: 'OR SECURE FORM',
        IDENTIFICATION: 'IDENTIFICATION',
        RETURN_SIGNAL: 'RETURN SIGNAL (EMAIL)',
        DATA_PACKET: 'DATA PACKET',
        ENTER_NAME: 'Enter your name',
        ENTER_EMAIL: 'Enter your email',
        ENTER_MESSAGE: 'Enter your message...',
        INITIALIZE_TRANSMISSION: 'INITIALIZE TRANSMISSION',
        FOOTER_QUOTE: '"Take the first step to make your idea a reality!"',
        Alert_Sent: 'TRANSMISSION SENT TO SECTOR 7G',

        // New Keys
        JOB_TITLE: 'FULLSTACK ARCHITECT',
        INIT_DATE_LABEL: 'INIT_DATE',
        ORIGIN_LABEL: 'ORIGIN',
        COUNTRY_NAME: 'VENEZUELA',
        SYSTEM_NAV: 'SYSTEM_NAV',
        ESTABLISH_UPLINK: 'ESTABLISH UPLINK',
    },
    ES: {
        // HUD & Nav
        DASHBOARD: 'PANEL',
        BIO_DATA: 'BIO_DATOS',
        PROJECTS: 'PROYECTOS',
        COMM_LINK: 'ENLACE',
        SYSTEM_ONLINE: 'SISTEMA ONLINE',

        // HomeView
        WELCOME_PILOT: 'BIENVENIDO PILOTO',
        ACCESS_GRANTED: 'ACCESO CONCEDIDO',
        INITIALIZING_INTERFACE: 'INICIALIZANDO INTERFAZ...',
        ENTER_SYSTEM: 'ENTRAR AL SISTEMA',

        // AboutView
        FULLNAME: 'NOMBRE',
        CODENAME: 'ALIAS',
        OCCUPATION: 'OCUPACIÓN',
        STATUS: 'ESTADO',
        RANK: 'RANGO',
        OPERATIONAL: 'OPERATIVO',
        SENIOR_OFFICER: 'OFICIAL SUPERIOR',
        BIOGRAPHY: 'BIOGRAFÍA',
        SKILL_MATRIX: 'MATRIZ DE HAB.',
        LANGUAGES: 'IDIOMAS',
        MODULES: 'MÓDULOS',
        ESPANOL: 'ESPAÑOL',
        ENGLISH: 'INGLÉS',
        BIO_PARAGRAPH: "UN VETERANO ARQUITECTO DE SISTEMAS DIGITALES ESPECIALIZADO EN CONSTRUIR INFRAESTRUCTURAS WEB DE ALTO RENDIMIENTO. UNO LA BRECHA ENTRE EL DISEÑO CONCEPTUAL Y EL DESPLIEGUE FUNCIONAL, CREANDO EXPERIENCIAS INMERSIVAS QUE RESUENAN. MI MISIÓN ES ACTUALIZAR TU VISIÓN A UNA REALIDAD TANGIBLE, OPTIMIZANDO CADA PÍXEL Y LÍNEA DE CÓDIGO PARA EL MÁXIMO IMPACTO.",
        BIO_QUOTE: "SI PUEDES IMAGINARLO, PUEDE SER CREADO. SOLO TIENES QUE DAR EL PRIMER PASO.",
        BTN_BIOGRAPHY: 'BIOGRAFÍA',
        BTN_PORTFOLIO: 'PORTFOLIO',
        BTN_CONTACT: 'CONTACTO',

        // PortfolioView
        PROJECT_ARCHIVE: 'ARCHIVO DE PROYECTOS',
        ARCHIVES_OFFLINE: 'ARCHIVOS OFFLINE',
        NO_PROJECT_DATA: 'NO SE RECUPERARON DATOS DEL SERVIDOR.',
        WAITING_UPLINK: '[ESPERANDO ENLACE...]',
        OPEN: 'ABRIR',
        ACCESS: 'ACCESO',

        // ContactView
        CONTACT_INTRO: 'Contáctame directamente por teléfono o envíame un paquete de correo encriptado. Responderé lo antes posible.',
        WHATSAPP_LINK: 'ENLACE DIRECTO WHATSAPP',
        OR_SECURE_FORM: 'O FORMULARIO SEGURO',
        IDENTIFICATION: 'IDENTIFICACIÓN',
        RETURN_SIGNAL: 'SEÑAL DE RETORNO (EMAIL)',
        DATA_PACKET: 'PAQUETE DE DATOS',
        ENTER_NAME: 'Ingresa tu nombre',
        ENTER_EMAIL: 'Ingresa tu email',
        ENTER_MESSAGE: 'Ingresa tu mensaje...',
        INITIALIZE_TRANSMISSION: 'INICIAR TRANSMISIÓN',
        FOOTER_QUOTE: '"¡Da el primer paso para hacer realidad tu idea!"',
        Alert_Sent: 'TRANSMISIÓN ENVIADA AL SECTOR 7G',

        // New Keys
        JOB_TITLE: 'ARQUITECTO FULLSTACK',
        INIT_DATE_LABEL: 'FECHA_INICIO',
        ORIGIN_LABEL: 'ORIGEN',
        COUNTRY_NAME: 'VENEZUELA',
        SYSTEM_NAV: 'NAVEGACIÓN',
        ESTABLISH_UPLINK: 'ESTABLECER ENLACE',
    }
};

export function useLanguage() {
    const t = (key) => {
        return translations[currentLang.value][key] || key;
    };

    return {
        currentLang,
        t,
        translations
    };
}
