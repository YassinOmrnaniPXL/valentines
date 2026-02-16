// Page navigation system
function changePage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        setTimeout(() => {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }
}

// Initialize content when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTimeline();
    loadPhotos();
    loadMessage();
    loadRoses();
    
    // Handle start button
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            changePage('timeline');
        });
    }
});

// Load timeline content
function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container || !contentData) return;
    
    container.innerHTML = '';
    
    contentData.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        container.appendChild(timelineItem);
    });
}

// Load photos in grid layout
function loadPhotos() {
    const container = document.getElementById('photosContainer');
    if (!container || !contentData) return;
    
    container.innerHTML = '';
    
    contentData.photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.onerror = function() {
            // If image fails to load, show placeholder
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'photo-placeholder';
            placeholder.textContent = '📸';
            photoItem.appendChild(placeholder);
        };
        
        photoItem.appendChild(img);
        container.appendChild(photoItem);
    });
}

// Load message
function loadMessage() {
    const container = document.getElementById('messageCard');
    if (!container || !contentData) return;
    
    const message = contentData.message;
    let messageHTML = `<p class="message-text">${message.greeting}<br><br>`;
    
    message.paragraphs.forEach(paragraph => {
        messageHTML += `${paragraph}<br><br>`;
    });
    
    messageHTML += `${message.closing}<br>
        <span class="signature">${message.signature}</span>
    </p>`;
    
    container.innerHTML = messageHTML;
}

// Load roses in scattered pattern
function loadRoses() {
    const container = document.getElementById('rosesContainer');
    if (!container || !contentData) return;
    
    container.innerHTML = '';
    
    contentData.roseMessages.forEach((message, index) => {
        const rose = document.createElement('div');
        rose.className = `rose rose-scatter-${index + 1}`;
        rose.setAttribute('data-message', message);
        rose.textContent = '🌹';
        
        rose.addEventListener('click', () => {
            handleRoseClick(rose, message);
        });
        
        container.appendChild(rose);
    });
}

// Handle rose click
function handleRoseClick(rose, message) {
    const roseMessage = document.getElementById('roseMessage');
    if (!roseMessage) return;
    
    // Animate the clicked rose
    rose.style.transform = 'scale(1.6) rotate(15deg) translateY(-15px)';
    rose.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    rose.style.zIndex = '100';
    
    setTimeout(() => {
        rose.style.transform = '';
        rose.style.zIndex = '';
    }, 300);
    
    // Display the message
    roseMessage.textContent = message;
    roseMessage.style.opacity = '0';
    roseMessage.style.transform = 'translateY(20px) scale(0.9)';
    
    setTimeout(() => {
        roseMessage.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        roseMessage.style.opacity = '1';
        roseMessage.style.transform = 'translateY(0) scale(1)';
    }, 50);
    
    // Add sparkle effect
    createSparkle(rose);
}

// Create sparkle effect when rose is clicked
function createSparkle(element) {
    const sparkles = ['✨', '💫', '⭐', '🌟', '💖'];
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.fontSize = '2rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            
            const angle = (Math.PI * 2 * i) / 6;
            const distance = 60 + Math.random() * 40;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            sparkle.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            sparkle.style.opacity = '1';
            sparkle.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
            
            document.body.appendChild(sparkle);
            
            // Trigger animation
            requestAnimationFrame(() => {
                sparkle.style.transform = `translate(${endX}px, ${endY}px) scale(0.3) rotate(360deg)`;
                sparkle.style.opacity = '0';
            });
            
            setTimeout(() => {
                sparkle.remove();
            }, 1200);
        }, i * 80);
    }
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
