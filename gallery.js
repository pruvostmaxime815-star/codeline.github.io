
document.addEventListener('DOMContentLoaded', () => {
    // Animation de chargement des images ;)
    const images = document.querySelectorAll('.gallery-scroll img');
    
    images.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            img.style.transition = 'all 0.6s ease-out';
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }, index * 100);
    });

    const galleries = document.querySelectorAll('.gallery-scroll');
    
    galleries.forEach(gallery => {
        gallery.addEventListener('mouseenter', () => {
            gallery.style.animationPlayState = 'paused';
        });
        
        gallery.addEventListener('mouseleave', () => {
            gallery.style.animationPlayState = 'running';
        });
    });

    // effet de zoom aux images 
    images.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
                animation: fadeIn 0.3s ease-out;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(212, 175, 55, 0.5);
                animation: zoomIn 0.3s ease-out;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // fermer au clic
            modal.addEventListener('click', () => {
                modal.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => modal.remove(), 300);
            });
        });
    });

    // ajout d'animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== scroll  =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 55px;
    height: 55px;
    background: linear-gradient(135deg, #D4AF37, #9B7F1A);
    border: none;
    border-radius: 50%;
    color: #0A0A0A;
    font-size: 1.3rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    z-index: 999;
    box-shadow: 0 5px 25px rgba(212, 175, 55, 0.5);
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
    scrollTopBtn.style.boxShadow = '0 10px 35px rgba(212, 175, 55, 0.7)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
    scrollTopBtn.style.boxShadow = '0 5px 25px rgba(212, 175, 55, 0.5)';
});

// ===== la console  =====
console.log('%c 🎨 Graphisme - Maison Lynz ', 'color: #D4AF37; font-size: 20px; font-weight: bold; background: #0A0A0A; padding: 10px;');
console.log('%c ✅ Galerie chargée avec succès ! ', 'color: #4CAF50; font-size: 14px;');