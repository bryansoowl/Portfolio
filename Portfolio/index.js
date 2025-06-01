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

        light.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(49, 15, 0, 0.97) 0%, rgba(0,0,0,0.99) 80%)`;

        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    });

    const projectTitles = document.querySelectorAll('.project-title');
    
    projectTitles.forEach(projectTitle => {
        // Create wave line element
        const waveLine = document.createElement('div');
        waveLine.className = 'wave-line';
        waveLine.innerHTML = '<svg width="100%" height="2" viewBox="0 0 200 2" preserveAspectRatio="none"><path d="M0,1 Q50,0 100,1 T200,1" stroke="rgba(255,255,255,0.6)" stroke-width="1" fill="none"/></svg>';
        
        // Insert wave line between description and year
        const description = projectTitle.querySelector('.project-description');
        const year = projectTitle.querySelector('.project-year');
        projectTitle.insertBefore(waveLine, year);
        
        const randomOffset = Math.random() * 1000; // 0–1000ms variation
    animateWave(waveLine, true, randomOffset);
    });


    function animateWave(waveElement, isHover, phaseOffset = 0) {
    const path = waveElement.querySelector('path');
    let animationId;
    let startTime = null;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const offset = elapsed + phaseOffset;

        if (isHover) {
            const wave1 = Math.sin(offset * 0.008) * 1.2;
            const wave2 = Math.sin(offset * 0.012 + Math.PI) * 0.8;
            const wave3 = Math.sin(offset * 0.015 + Math.PI / 2) * 0.6;
            const wave4 = Math.sin(offset * 0.020 + Math.PI / 4) * 0.4;

            const pathData = `M0,${1 + wave1} Q25,${0.5 + wave2} 50,${1 + wave3} Q75,${0.5 + wave4} 100,${1 + wave1} Q125,${0.5 + wave2} 150,${1 + wave3} Q175,${0.5 + wave4} 200,${1 + wave1}`;
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', 'rgba(193, 197, 127, 0.9)');
            path.setAttribute('stroke-width', '1.5');

            animationId = requestAnimationFrame(animate);
        } else {
            // Return to straight line (default state)
            const progress = Math.min(elapsed / 400, 1); // 400ms transition
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentWave = (1 - easeOut);
            const wave1 = Math.sin(elapsed * 0.008) * 1.2 * currentWave;
            const wave2 = Math.sin(elapsed * 0.012 + Math.PI) * 0.8 * currentWave;
            const wave3 = Math.sin(elapsed * 0.015 + Math.PI/2) * 0.6 * currentWave;
            const wave4 = Math.sin(elapsed * 0.020 + Math.PI/4) * 0.4 * currentWave;
            
            if (progress < 1) {
                const pathData = `M0,${1 + wave1} Q25,${0.5 + wave2} 50,${1 + wave3} Q75,${0.5 + wave4} 100,${1 + wave1} Q125,${0.5 + wave2} 150,${1 + wave3} Q175,${0.5 + wave4} 200,${1 + wave1}`;
                path.setAttribute('d', pathData);
                animationId = requestAnimationFrame(animate);
            } else {
                // Set to straight line
                path.setAttribute('d', 'M0,1 L200,1');
                path.setAttribute('stroke', 'rgba(193, 197, 127, 0.6)');
                path.setAttribute('stroke-width', '1');
            }
        }
    }
    
        // Cancel any existing animation
        if (waveElement.animationId) {
            cancelAnimationFrame(waveElement.animationId);
        }

        waveElement.animationId = requestAnimationFrame(animate);
    }
});