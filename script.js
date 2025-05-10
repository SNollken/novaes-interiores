document.addEventListener('DOMContentLoaded', () => {

    const slides = [
        'images/banheiro1.jpeg',
        'images/banheiro2.jpeg',
        'images/cozinha1.jpeg',
        'images/cozinha2.jpeg',
        'images/cozinha3.jpeg',
        'images/quarto1.jpeg',
        'images/quarto2.jpeg',
        'images/sala1.jpeg',
      ];
      let current = 0;
    
      const slide1 = document.getElementById('slide1');
      const slide2 = document.getElementById('slide2');
      // alternamos entre qual layer está visível
      let showingFirst = true;
    
      // inicializa primeira imagem
      slide1.style.backgroundImage = `url('${slides[0]}')`;
      slide1.classList.add('active');
    
      setInterval(() => {
        // próxima imagem
        current = (current + 1) % slides.length;
        const nextUrl = `url('${slides[current]}')`;
    
        if (showingFirst) {
          // prepara slide2 e fade in
          slide2.style.backgroundImage = nextUrl;
          slide2.classList.add('active');
          slide1.classList.remove('active');
        } else {
          slide1.style.backgroundImage = nextUrl;
          slide1.classList.add('active');
          slide2.classList.remove('active');
        }
        showingFirst = !showingFirst;
      }, 3000);


    // Smooth scroll for navigation links
    document.querySelectorAll('#header nav a[href^="#"], .hero-buttons a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerOffset = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Data
    const projects = [
        {
            title: "Cozinha Galley Moderna",
            description: "Cozinha em estilo galley super moderna, com móveis planejados em tons neutros e madeira, bancada em mármore e iluminação linear embutida.",
            imageUrl: "images/cozinha3.jpeg",
            imageHint: "modern kitchen"
        },
        {
            title: "Sala Comercial",
            description: "Ripas verticais em madeira de carvalho com acabamento acetinado, espaçamento regular que garante leveza visual e permite a passagem de luz entre os ambientes.",
            imageUrl: "images/sala1.jpeg",
            imageHint: "cozy livingroom"
        },
        {
            title: "Quarto Elegante",
            description: "Quarto compacto com painel ripado em MDF e prateleira em madeira natural, roupeiro planejado em L e design clean, priorizando organização, conforto e sofisticação",
            imageUrl: "images/quarto1.jpeg",
            imageHint: "elegant bedroom"
        },
        {
            title: "Banheiro sem Espaço? Eu Resolvo!",
            description: "Bancada de banheiro com armário em laca branca, nicho embutido e tampo em granito preto, unindo funcionalidade, limpeza visual e sofisticação.",
            imageUrl: "images/banheiro1.jpeg",
            imageHint: "functional homeoffice"
        },
    ];

    // Render Project Cards
    const portfolioContainer = document.getElementById('portfolio-projects');
    if (portfolioContainer) {
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card card-scroll-animate';
            card.style.setProperty('--card-delay', `${index * 100}ms`);

            card.innerHTML = `
                <div class="card-image">
                    <img src="${project.imageUrl}" alt="${project.title}" data-ai-hint="${project.imageHint}">
                </div>
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `;
            portfolioContainer.appendChild(card);
        });
    }

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.scroll-animate, .card-scroll-animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.transitionDelay = delay;
                }
                if (entry.target.classList.contains('card-scroll-animate')) {
                    entry.target.classList.add('card-scroll-animate-visible');
                } else {
                    entry.target.classList.add('scroll-animate-visible');
                }
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        // Set initial delay for card animations if specified in HTML data attribute
        if (el.classList.contains('card-scroll-animate') && el.dataset.delay) {
            el.style.setProperty('--card-delay', el.dataset.delay);
        } else if (el.classList.contains('scroll-animate') && el.dataset.delay) {
            el.style.setProperty('--scroll-delay', el.dataset.delay);
        }
        observer.observe(el);
    });


    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
