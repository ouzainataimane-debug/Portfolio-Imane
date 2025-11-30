document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------------------------
    // 1. LOGIQUE HAMBURGER (Menu Mobile)
    // ---------------------------------------------
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.querySelector(".theme-toggle");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Optionnel : Ajouter une animation de croix au hamburger
        // hamburger.classList.toggle("open");
    });

    // Fermer le menu si un lien est cliqué
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // ---------------------------------------------
    // 2. LOGIQUE THEME CLAIR/SOMBRE
    // ---------------------------------------------

    // Fonction pour définir le thème
    function setTheme(mode) {
        if (mode === 'light') {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').className = 'fas fa-moon';
        }
    }

    // Chargement initial du thème
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Détecter le thème préféré de l'utilisateur
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Écouteur de clic pour le basculement
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // ---------------------------------------------
    // 3. LOGIQUE DU MODAL DE CERTIFICATIONS
    // ---------------------------------------------

    // Définir les éléments
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certImage");
    const certItems = document.querySelectorAll(".cert-item");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Écouter les clics sur les éléments de certification
    certItems.forEach(item => {
        item.addEventListener('click', function() {
            // Récupérer le nom du fichier image (ex: oci-ai-foundation.png)
            const imageName = this.getAttribute('data-image');

            // CONSTRUIRE LE CHEMIN RELATIF : 'images/' + le nom du fichier
            // C'EST CETTE LIGNE QUI UTILISE LE CHEMIN DU HTML ET DOIT ÊTRE CORRECTE.
            modalImg.src = 'image/' + imageName;

            // Afficher le modal
            modal.style.display = "block";
        });
    });

    // Fermer le modal lorsque l'utilisateur clique sur (x)
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Fermer le modal lorsque l'utilisateur clique en dehors de l'image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});