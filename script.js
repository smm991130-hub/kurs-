document.addEventListener('DOMContentLoaded', () => {
    // Crypto coins floating animation
    const coinsContainer = document.getElementById('coinsBg');
    
    const coins = [
        { name: 'BTC', icon: '₿', price: '$67,420', change: '+2.45%', class: 'btc', top: '10%', left: '5%' },
        { name: 'ETH', icon: 'Ξ', price: '$3,540', change: '+1.82%', class: 'eth', top: '70%', left: '8%' },
        { name: 'SOL', icon: '◎', price: '$145', change: '+5.23%', class: 'sol', top: '20%', left: '85%' },
        { name: 'XRP', icon: '✕', price: '$0.62', change: '-0.45%', class: 'xrp', top: '60%', left: '90%' },
        { name: 'ADA', icon: '₳', price: '$0.45', change: '+1.15%', class: 'ada', top: '35%', left: '15%' },
        { name: 'DOGE', icon: 'Ð', price: '$0.16', change: '+3.42%', class: 'doge', top: '80%', left: '75%' },
        { name: 'BTC', icon: '₿', price: '$67,420', change: '+2.45%', class: 'btc', top: '45%', left: '45%' },
        { name: 'ETH', icon: 'Ξ', price: '$3,540', change: '+1.82%', class: 'eth', top: '15%', left: '70%' }
    ];
    
    coins.forEach((coin, index) => {
        const coinEl = document.createElement('div');
        coinEl.className = 'coin';
        coinEl.style.top = coin.top;
        coinEl.style.left = coin.left;
        coinEl.style.animationDelay = `${index * -2}s`;
        coinEl.style.animationDuration = `${12 + Math.random() * 6}s`;
        
        const isUp = coin.change.startsWith('+');
        
        coinEl.innerHTML = `
            <div class="coin-icon ${coin.class}">${coin.icon}</div>
            <div class="coin-price">${coin.price}</div>
            <div class="coin-change ${isUp ? 'up' : 'down'}">${coin.change}</div>
        `;
        
        coinsContainer.appendChild(coinEl);
    });

    // Expand/collapse section
    const expandBtn = document.getElementById('expandBtn');
    const expandableLinks = document.getElementById('expandableLinks');

    if (expandBtn && expandableLinks) {
        expandBtn.addEventListener('click', () => {
            expandableLinks.classList.toggle('show');
            expandBtn.classList.toggle('expanded');
            
            const span = expandBtn.querySelector('span');
            if (expandableLinks.classList.contains('show')) {
                span.textContent = 'Kamroq ko\'rsatish';
            } else {
                span.textContent = 'Boshqa aloqalar';
            }
        });
    }

    // Link card interactions
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(link => {
        // Click ripple effect
        link.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(46, 125, 50, 0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                animation: ripple-effect 0.6s ease-out;
            `;
            
            const rect = link.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            link.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            0% { width: 0; height: 0; opacity: 0.5; }
            100% { width: 300px; height: 300px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Stat boxes counter animation
    const statBoxes = document.querySelectorAll('.stat-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    statBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(box);
    });

    // Toast notification
    function showToast(message) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: rgba(46, 125, 50, 0.95);
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(76, 175, 80, 0.5);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // Copy support link
    const whatsappLink = document.querySelector('.link-card.whatsapp');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = '+998901234567';
            navigator.clipboard.writeText(phone).then(() => {
                showToast('Phone number copied!');
            });
        });
    }

    // Keyboard navigation
    linkCards.forEach(link => {
        link.setAttribute('tabindex', '0');
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Live badge blink
    const liveBadge = document.querySelector('.live-badge');
    if (liveBadge) {
        setInterval(() => {
            liveBadge.style.opacity = liveBadge.style.opacity === '0.6' ? '1' : '0.6';
        }, 800);
    }

    // Ticker speed adjustment on hover
    if (ticker) {
        ticker.addEventListener('mouseenter', () => {
            ticker.style.animationPlayState = 'paused';
        });
        ticker.addEventListener('mouseleave', () => {
            ticker.style.animationPlayState = 'running';
        });
    }
});
