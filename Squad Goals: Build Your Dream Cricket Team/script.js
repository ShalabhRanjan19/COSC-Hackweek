const rcbPlayers = [
    {
        id: 1,
        name: "Virat Kohli",
        role: "Batsman (Captain)",
        image: "hhttps://static.tnn.in/thumb/msid-99203776,updatedat-1680503873862,width-1280,height-720,resizemode-75/99203776.jpg",
        strikeRate: "129.94",
        matches: "237",
        jersey: "18",
        bestPerformance: "973 runs (2016)",
        description: "Former RCB captain and one of the greatest batsmen in cricket history. Known for his aggressive batting style and exceptional fitness. Kohli has been the backbone of RCB's batting lineup for over a decade."
    },
    {
        id: 2,
        name: "AB de Villiers",
        role: "Wicket-keeper Batsman",
        image: "https://w0.peakpx.com/wallpaper/392/642/HD-wallpaper-abd-rcb-thumbnail.jpg",
        strikeRate: "151.68",
        matches: "184",
        jersey: "17",
        bestPerformance: "133* vs MI (2015)",
        description: "Mr. 360 - One of the most innovative and explosive batsmen in T20 cricket. Known for his ability to hit the ball in every direction and his incredible finishing abilities. A fan favorite at RCB."
    },
    {
        id: 3,
        name: "Glenn Maxwell",
        role: "All-rounder",
        image: "https://media.crictracker.com/media/attachments/1685394467279_Glenn-Maxwell.jpeg",
        strikeRate: "154.67",
        matches: "68",
        jersey: "32",
        bestPerformance: "78 vs CSK (2021)",
        description: "The Big Show - A dynamic all-rounder who can change the game with both bat and ball. Known for his innovative stroke play and effective off-spin bowling. A key player in RCB's middle order."
    },
    {
        id: 4,
        name: "Mohammed Siraj",
        role: "Fast Bowler",
       
        strikeRate: "N/A",
        matches: "93",
        jersey: "73",
        bestPerformance: "4/21 vs KKR (2022)",
        description: "RCB's pace spearhead who has developed into one of India's premier fast bowlers. Known for his ability to swing the new ball and bowl effective yorkers at the death. A local Hyderabad talent."
    },
    {
        id: 5,
        name: "Yuzvendra Chahal",
        role: "Spin Bowler",
       
        strikeRate: "N/A",
        matches: "113",
        jersey: "3",
        bestPerformance: "6/25 vs DC (2022)",
        description: "Leg-spin wizard who was RCB's leading wicket-taker for many seasons. Known for his variations and ability to pick up wickets in the middle overs. Currently plays for Rajasthan Royals but remains an RCB legend."
    },
    {
        id: 6,
        name: "Faf du Plessis",
        role: "Batsman (Captain)",
       
        strikeRate: "127.87",
        matches: "34",
        jersey: "19",
        bestPerformance: "96 vs GT (2022)",
        description: "Current RCB captain and experienced South African batsman. Known for his elegant stroke play and excellent fielding. Brings valuable leadership experience and stability to the top order."
    },
    {
        id: 7,
        name: "Dinesh Karthik",
        role: "Wicket-keeper",
        
        strikeRate: "183.33",
        matches: "32",
        jersey: "5",
        bestPerformance: "44* vs DC (2022)",
        description: "Veteran wicket-keeper batsman known for his finishing abilities. DK has been instrumental in RCB's lower order, often playing crucial cameos in tight situations. His experience is invaluable for the team."
    },
    {
        id: 8,
        name: "Wanindu Hasaranga",
        role: "All-rounder",
        
        strikeRate: "144.44",
        matches: "26",
        jersey: "4",
        bestPerformance: "4/20 vs SRH (2022)",
        description: "Sri Lankan mystery spinner and handy batsman. Known for his variations in leg-spin and googly. Can contribute with the bat lower down the order and is an excellent fielder."
    }
];

// DOM Elements
const playersGrid = document.getElementById('playersGrid');
const modal = document.getElementById('playerModal');
const closeModal = document.getElementById('closeModal');

// Modal elements
const modalPlayerImage = document.getElementById('modalPlayerImage');
const modalPlayerName = document.getElementById('modalPlayerName');
const modalPlayerRole = document.getElementById('modalPlayerRole');
const modalStrikeRate = document.getElementById('modalStrikeRate');
const modalMatches = document.getElementById('modalMatches');
const modalJersey = document.getElementById('modalJersey');
const modalBestPerformance = document.getElementById('modalBestPerformance');
const modalDescription = document.getElementById('modalDescription');

// Initialize the application
function init() {
    renderPlayers();
    setupEventListeners();
    addLoadingAnimation();
}

// Render players grid
function renderPlayers() {
    playersGrid.innerHTML = '';
    
    rcbPlayers.forEach((player, index) => {
        const playerCard = createPlayerCard(player, index);
        playersGrid.appendChild(playerCard);
    });
}

// Create individual player card
function createPlayerCard(player, index) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${player.image}" alt="${player.name}" class="player-image" loading="lazy">
        <h3 class="player-name">${player.name}</h3>
        <p class="player-role">${player.role}</p>
        <div class="player-stats">
            <div class="stat">
                <div class="stat-label">Jersey</div>
                <div class="stat-value">#${player.jersey}</div>
            </div>
            <div class="stat">
                <div class="stat-label">Matches</div>
                <div class="stat-value">${player.matches}</div>
            </div>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', () => openModal(player));
    
    // Add entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
    
    return card;
}

// Open modal with player details
function openModal(player) {
    modalPlayerImage.src = player.image;
    modalPlayerImage.alt = player.name;
    modalPlayerName.textContent = player.name;
    modalPlayerRole.textContent = player.role;
    modalStrikeRate.textContent = player.strikeRate;
    modalMatches.textContent = player.matches;
    modalJersey.textContent = `#${player.jersey}`;
    modalBestPerformance.textContent = player.bestPerformance;
    modalDescription.textContent = player.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add opening animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.7) translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
    }, 10);
}

// Close modal
function closeModalFunction() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.7) translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Setup event listeners
function setupEventListeners() {
    // Close modal events
    closeModal.addEventListener('click', closeModalFunction);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
    
    // Add scroll animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            img.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=200&fit=crop';
        });
    });
}

// Handle scroll animations
function handleScrollAnimations() {
    const cards = document.querySelectorAll('.player-card');
    const triggerBottom = window.innerHeight * 0.8;
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerBottom) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Add loading animation
function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .player-card {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .stat-card:hover {
            animation: pulse 0.6s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Add smooth scrolling for better UX
function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Performance optimization - Lazy loading
function observeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    addSmoothScrolling();
    observeImages();
    
    // Add some interactive features
    addInteractiveFeatures();
});

// Add interactive features
function addInteractiveFeatures() {
    // Add particle effect on card hover
    const cards = document.querySelectorAll('.player-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', createParticleEffect);
    });
}

// Create particle effect
function createParticleEffect(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #dc2626;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particle-float 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Add PWA-like features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here in a real app
        console.log('App loaded successfully');
    });
}
