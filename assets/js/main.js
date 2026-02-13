document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. REFERENCIAS DOM ---
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');
    const textsToChange = document.querySelectorAll('.lang-text'); 
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;

    // --- 2. LÓGICA DE IDIOMA (Tu código existente) ---
    function setLanguage(lang) {
        textsToChange.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) element.innerHTML = text;
        });

        if (lang === 'en') {
            if(btnEn) btnEn.classList.add('active');
            if(btnEs) btnEs.classList.remove('active');
        } else {
            if(btnEs) btnEs.classList.add('active');
            if(btnEn) btnEn.classList.remove('active');
        }
        
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
    }

    const currentLang = localStorage.getItem('lang') || 'en';
    if(btnEn && btnEs) setLanguage(currentLang);
    if(btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
    if(btnEs) btnEs.addEventListener('click', () => setLanguage('es'));


    // --- 3. LÓGICA DE MODO OSCURO (Nuevo) ---
    
    // Función para actualizar el icono
    const updateIcon = (isDark) => {
        if (isDark) {
            // Si es oscuro, mostramos un SOL (para volver a claro)
            themeButton.classList.replace('fa-circle-half-stroke', 'fa-sun');
        } else {
            // Si es claro, mostramos la LUNA/MEDIO CÍRCULO (para ir a oscuro)
            themeButton.classList.replace('fa-sun', 'fa-circle-half-stroke');
        }
    };

    // A. Verificar preferencia guardada al cargar
    const savedTheme = localStorage.getItem('theme');
    
    // Si guardó 'dark', lo activamos
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    // B. Evento Click
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            // Alternar clase en el body
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');

            // Actualizar icono
            updateIcon(isDarkMode);

            // Guardar en memoria
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
});