// Carrossel que mostra 3 cards por vez
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = Array.from(document.querySelectorAll('.carousel-track .card'));
    const indicatorsContainer = document.getElementById('indicators');
    
    let currentIndex = 0;
    let cardsPerView = 3;
    let totalSlides = 0;
    let autoSlideInterval;
    
    // Função para atualizar quantos cards mostrar por vez baseado na tela
    function updateCardsPerView() {
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        
        totalSlides = Math.ceil(cards.length / cardsPerView);
        
        // Ajustar currentIndex se necessário
        if (currentIndex >= totalSlides) {
            currentIndex = totalSlides - 1;
        }
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        
        createIndicators();
        updateCarousel();
    }
    
    // Função para criar os indicadores (dots)
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(i);
                startAutoSlide();
            });
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Função para atualizar os indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Função para calcular a largura do card e atualizar o carrossel
    function updateCarousel() {
        const container = document.querySelector('.carousel-container');
        const containerWidth = container.clientWidth;
        const gap = 20; // gap entre os cards
        
        // Calcular largura do card baseado no número de cards por vez
        const cardWidth = (containerWidth - (gap * (cardsPerView - 1))) / cardsPerView;
        
        // Aplicar largura a todos os cards
        cards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
        });
        
        // Mover para o slide atual
        const slideDistance = (cardWidth + gap) * (currentIndex * cardsPerView);
        track.style.transform = `translateX(-${slideDistance}px)`;
        
        updateIndicators();
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    // Função para próximo slide (avança 3 cards)
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta ao início
        }
        updateCarousel();
    }
    
    // Função para slide anterior (volta 3 cards)
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Vai para o final
        }
        updateCarousel();
    }
    
    // Função para iniciar rotação automática
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // Função para parar rotação automática
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners dos botões
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    // Atualizar ao redimensionar a tela
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCardsPerView();
        }, 200);
    });
    
    // Inicializar o carrossel
    updateCardsPerView();
    startAutoSlide();
    
    // Pausar auto-slide quando o mouse estiver sobre o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            stopAutoSlide();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Logo Star Wars
    const logoIntro = document.getElementById('starwars-logo');
    if (logoIntro) {
        setTimeout(() => { 
            logoIntro.style.display = 'none'; 
        }, 13000);
        
        logoIntro.addEventListener('click', () => {
            logoIntro.style.display = 'none';
        });
    }
});