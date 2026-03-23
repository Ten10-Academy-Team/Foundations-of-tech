// Wait for the DOM to be fully parsed before running.
// This is best practice even when the <script> tag is at the
// end of <body>, as it guarantees all elements are available.
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // RAIN GENERATION
    // ============================================

    // Respect the user's motion preferences.
    // If they have "Reduce motion" enabled in their OS,
    // we skip creating the rain animation entirely.
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        var rain = document.getElementById('rain');
        var numberOfDrops = 60;

        // A DocumentFragment is an off-screen container. Adding
        // elements to it first, then appending once, is faster than
        // appending each drop to the DOM one at a time.
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < numberOfDrops; i++) {
            var drop = document.createElement('div');
            drop.classList.add('drop');
            drop.style.left = Math.random() * 100 + '%';
            drop.style.height = Math.random() * 18 + 8 + 'px';
            drop.style.animationDuration = Math.random() * 1 + 0.6 + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            fragment.appendChild(drop);
        }

        rain.appendChild(fragment);
    }

    // ============================================
    // WEATHER TOGGLE (Rain / Sun)
    // ============================================

    // Get references to the toggle buttons.
    var rainBtn = document.getElementById('rain-btn');
    var sunBtn = document.getElementById('sun-btn');

    // localStorage lets us save data in the browser that
    // persists even after the page is closed. We use it
    // to remember which weather mode the user last chose.
    var savedMode = localStorage.getItem('weather-mode');

    // Apply the saved mode on page load (if any).
    if (savedMode === 'sun') {
        activateSunMode();
    }

    // Event listeners: run a function when a button is clicked.
    rainBtn.addEventListener('click', function () {
        activateRainMode();
    });

    sunBtn.addEventListener('click', function () {
        activateSunMode();
    });

    function activateRainMode() {
        document.body.classList.remove('sun-mode');
        rainBtn.classList.add('active');
        sunBtn.classList.remove('active');
        localStorage.setItem('weather-mode', 'rain');
    }

    function activateSunMode() {
        document.body.classList.add('sun-mode');
        sunBtn.classList.add('active');
        rainBtn.classList.remove('active');
        localStorage.setItem('weather-mode', 'sun');
    }
});
