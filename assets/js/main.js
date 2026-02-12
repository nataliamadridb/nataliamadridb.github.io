document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Identificar si estamos en una página con botones de idioma
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');
    const textsToChange = document.querySelectorAll('.lang-text'); 

    // Si no existen los botones (ej. error de carga), detenemos el script para no causar errores
    if (!btnEn || !btnEs) {
        console.warn('Botones de idioma no encontrados en esta página.');
        return;
    }

    // 2. Función principal de cambio de idioma
    function setLanguage(lang) {
        // A) Cambiar los textos
        textsToChange.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.innerHTML = text; // Usamos innerHTML para respetar negritas o iconos
            }
        });

        // B) Cambiar visualmente los botones (Negrita vs Gris)
        if (lang === 'en') {
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
        } else {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
        }

        // C) Guardar preferencia y avisar al navegador
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
    }

    // 3. Inicializar (recuperar memoria o usar inglés por defecto)
    const currentLang = localStorage.getItem('lang') || 'en';
    setLanguage(currentLang);

    // 4. Activar los clicks
    btnEn.addEventListener('click', () => setLanguage('en'));
    btnEs.addEventListener('click', () => setLanguage('es'));
});