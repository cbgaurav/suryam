document.querySelectorAll('.carousel').forEach(carousel => {

    const slides = carousel.querySelectorAll('.slide');
    const dotsContainer = carousel.querySelector('.dots');
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');

    let current = 0;
    let autoplay = null;
    let startX = 0;
    let endX = 0;

    // ✅ Clear dots to prevent duplication
    dotsContainer.innerHTML = '';

    // ✅ Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';

        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            current = index;
            showSlide();
            resetAutoplay();
        });

        dotsContainer.appendChild(dot);
    });

    function getDots() {
        return dotsContainer.querySelectorAll('.dot');
    }

    function showSlide() {
        slides.forEach(s => s.classList.remove('active'));
        getDots().forEach(d => d.classList.remove('active'));

        slides[current].classList.add('active');
        getDots()[current].classList.add('active');
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide();
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    function startAutoplay() {
        stopAutoplay(); // ✅ Prevent duplicates
        autoplay = setInterval(nextSlide, 3000);
    }

    function stopAutoplay() {
        if (autoplay) clearInterval(autoplay);
    }

    function resetAutoplay() {
        startAutoplay();
    }

    startAutoplay();

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // ✅ Swipe handler
    function handleSwipe() {
        let diff = startX - endX;

        if (Math.abs(diff) < 50) return;

        if (diff > 0) nextSlide();
        else prevSlide();

        resetAutoplay();
    }

    // Desktop drag
    carousel.addEventListener('mousedown', e => {
        carousel.classList.add('dragging');
        startX = e.clientX;
    });

    carousel.addEventListener('mouseup', e => {
        carousel.classList.remove('dragging');
        endX = e.clientX;
        handleSwipe();
    });

    // ✅ Fix: cancel drag if leaves area
    carousel.addEventListener('mouseleave', () => {
        carousel.classList.remove('dragging');
    });

    // Mobile touch
    carousel.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

});