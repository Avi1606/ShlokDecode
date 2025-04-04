// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize current date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Scroll reveal animation
    initScrollReveal();
    
    // Initialize event handlers
    initEventHandlers();
});

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const dateDisplay = document.querySelector('.date-display');
    const timeDisplay = document.querySelector('.time-display');
    
    if (dateDisplay) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString(undefined, options);
    }
    
    if (timeDisplay) {
        timeDisplay.textContent = now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }) + ' UTC';
    }
}

// Initialize scroll reveal animation
function initScrollReveal() {
    const sections = document.querySelectorAll('.section-container');
    const revealElements = document.querySelectorAll('.wisdom-post, .event-card, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
    revealElements.forEach(element => observer.observe(element));
}

// Initialize event handlers
function initEventHandlers() {
    // Navigation active state
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Event filters
    const filters = document.querySelectorAll('.filter');
    const eventCards = document.querySelectorAll('.event-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter events
            const filterValue = this.getAttribute('data-filter');
            
            eventCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize calendar
    initCalendar();
}

// Initialize calendar
function initCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthElement = document.querySelector('.current-month');
    const prevButton = document.querySelector('.calendar-nav.prev');
    const nextButton = document.querySelector('.calendar-nav.next');
    
    if (!calendarGrid || !currentMonthElement) return;
    
    let currentDate = new Date(2025, 3, 4); // April 4, 2025
    
    // Generate calendar
    function generateCalendar(year, month) {
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Update month display
        const monthNames = [
            'January', 'February', 'March', 'April', 
            'May', 'June', 'July', 'August', 
            'September', 'October', 'November', 'December'
        ];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before the first of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Check if the day is today
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Add event indicator for demonstration days
            if ((day === 10 || day === 15 || day === 22) && month === 3) {
                dayElement.classList.add('has-event');
            }
            
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Initialize calendar with current month
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    
    // Add event listeners to navigation buttons
    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
    
    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
}