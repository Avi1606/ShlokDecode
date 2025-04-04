// Wisdom Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize shloka cards
    initShlokaCards();
    
    // Initialize audio functionality
    initAudioFunctionality();
    
    // Initialize meaning layers
    initMeaningLayers();
});

// Initialize shloka cards
function initShlokaCards() {
    const shlokaCards = document.querySelectorAll('.shloka-card');
    
    shlokaCards.forEach(card => {
        const frontSide = card.querySelector('.card-front');
        const backSide = card.querySelector('.card-back');
        const exploreBtn = card.querySelector('.explore-btn');
        const closeBtn = card.querySelector('.close-btn');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                frontSide.style.transform = 'rotateY(-180deg)';
                backSide.style.transform = 'rotateY(0)';
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                frontSide.style.transform = 'rotateY(0)';
                backSide.style.transform = 'rotateY(180deg)';
            });
        }
    });
}

// Initialize audio functionality
function initAudioFunctionality() {
    const audioButtons = document.querySelectorAll('.audio-btn');
    
    // Sanskrit pronunciation audio files (would need to be created/added)
    const audioSources = {
        'shloka1': 'audio/shloka1.mp3',
        'shloka2': 'audio/shloka2.mp3',
        'shloka3': 'audio/shloka3.mp3'
    };
    
    audioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const shlokaId = this.closest('.shloka-card').id;
            const audioSrc