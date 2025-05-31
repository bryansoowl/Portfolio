document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#about, #projects, #experience, #contacts');
    const navLinks = document.querySelectorAll('.nav a');
    const navCircle = document.querySelectorAll('.nav-circle');
    const rightContainer = document.querySelector('.slipt.right');

    function activateLink(id) {
        navLinks.forEach(link => {
            const isActive = link.dataset.link === id;
            link.classList.toggle('active', isActive);
        });

        navCircle.forEach(link => {
            const isActive = link.dataset.circle === id;
            link.classList.toggle('active', isActive);
        });
    }

    // Set "About" as active by default on page load
    activateLink('about');

    // Listen to scroll on the right container instead of window
    rightContainer.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const containerRect = rightContainer.getBoundingClientRect();
            
            // Adjust the detection logic for the container
            if (rect.top <= containerRect.top + 150 && rect.bottom > containerRect.top + 130) {
                current = section.id;
            }
        });
        
        if (current) {
            activateLink(current);
        }
    });

    // Optional: Add click functionality to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.link;
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const light = document.getElementById('light');
    const cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', e => {
      const x = e.clientX;
      const y = e.clientY;

      light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.99) 40%)`;

      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    });
});