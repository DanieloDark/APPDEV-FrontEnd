// ==================== DATA ==================== 
const inboxData = [
    {
        id: 1,
        type: 'ai-suggestion',
        icon: 'brain',
        title: '90-minute free block detected',
        message: 'You have a 90-minute free block between 2–3:30 PM. Want me to fit your "Research Paper Draft" there?',
        timestamp: '2 hours ago',
        category: 'AI Suggestions',
        badge: 'AI Insight'
    },
    {
        id: 2,
        type: 'reminder',
        icon: 'bell',
        title: 'Math Homework due soon',
        message: 'Reminder: Math Homework due in 2 days.',
        timestamp: '5 hours ago',
        category: 'Reminders & Alerts',
        badge: 'Reminder'
    },
    {
        id: 3,
        type: 'conflict',
        icon: 'alert',
        title: 'Schedule conflict detected',
        message: 'Two tasks overlap at 4 PM. Suggest moving "Lab Review" earlier.',
        timestamp: '1 day ago',
        category: 'AI Suggestions',
        badge: 'Conflict'
    },
    {
        id: 4,
        type: 'detected-task',
        icon: 'clipboard',
        title: 'Task detected from browser',
        message: 'Detected potential task: "Read Chapter 5 and prepare summary." Add to task list?',
        timestamp: '3 hours ago',
        category: 'Detected Tasks',
        badge: 'New Task'
    },
    {
        id: 5,
        type: 'course',
        icon: 'book',
        title: 'Repeated topic in notes',
        message: 'You mentioned "Machine Learning Quiz" three times. Should I create a task?',
        timestamp: '6 hours ago',
        category: 'AI Suggestions',
        badge: 'Course'
    },
    {
        id: 6,
        type: 'insight',
        icon: 'brain',
        title: 'Daily productivity summary',
        message: 'You completed 4 tasks today. Great job!',
        timestamp: '8 hours ago',
        category: 'AI Suggestions',
        badge: 'Summary'
    },
    {
        id: 7,
        type: 'reminder',
        icon: 'bell',
        title: 'Study block starting soon',
        message: 'Your scheduled study block starts in 10 minutes.',
        timestamp: '15 minutes ago',
        category: 'Reminders & Alerts',
        badge: 'Reminder'
    },
    {
        id: 8,
        type: 'ai-suggestion',
        icon: 'brain',
        title: 'Heavy workload tomorrow',
        message: 'Your workload tomorrow is heavy. Recommend moving 1 task to Saturday.',
        timestamp: '4 hours ago',
        category: 'AI Suggestions',
        badge: 'AI Insight'
    },
    {
        id: 9,
        type: 'detected-task',
        icon: 'clipboard',
        title: 'Assignment from Canvas',
        message: 'Detected from Canvas: "Submit final project proposal by Friday 11:59 PM."',
        timestamp: '1 hour ago',
        category: 'Detected Tasks',
        badge: 'New Task'
    },
    {
        id: 10,
        type: 'conflict',
        icon: 'alert',
        title: 'Overlapping deadlines',
        message: 'You have 3 tasks due tomorrow with more than 4 hours required. Recommend reducing workload or rescheduling.',
        timestamp: '30 minutes ago',
        category: 'AI Suggestions',
        badge: 'Alert'
    }
];

// ==================== STATE ==================== 
let currentTab = 'all';
let currentFilters = [];
let currentSearch = '';
let items = [...inboxData];

// ==================== ICONS ==================== 
const icons = {
    brain: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
    clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
    alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',
    check: '<polyline points="20 6 9 17 4 12"></polyline>',
    close: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
};

// ==================== RENDER FUNCTIONS ==================== 
function renderInboxItems() {
    const container = document.getElementById('inboxItems');
    const emptyState = document.getElementById('emptyState');
    
    const filteredItems = getFilteredItems();
    
    if (filteredItems.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = filteredItems.map((item, index) => `
        <div class="inbox-card" data-id="${item.id}" data-type="${item.type}" style="animation-delay: ${index * 0.05}s">
            <div class="card-header">
                <div class="card-icon">
                    <svg viewBox="0 0 24 24">
                        ${icons[item.icon]}
                    </svg>
                </div>
                <div class="card-info">
                    <span class="card-badge">${item.badge}</span>
                    <h3 class="card-title">${item.title}</h3>
                </div>
            </div>
            <p class="card-message">${item.message}</p>
            <div class="card-footer">
                <span class="card-timestamp">${item.timestamp}</span>
                <div class="card-actions">
                    <button class="action-btn accept" data-action="accept" title="Accept">
                        <svg viewBox="0 0 24 24">${icons.check}</svg>
                    </button>
                    <button class="action-btn dismiss" data-action="dismiss" title="Dismiss">
                        <svg viewBox="0 0 24 24">${icons.close}</svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    attachCardEventListeners();
    updateStats();
}

function getFilteredItems() {
    let filtered = items;
    
    // Filter by tab
    if (currentTab !== 'all') {
        const tabMapping = {
            'ai-suggestions': 'AI Suggestions',
            'reminders': 'Reminders & Alerts',
            'detected-tasks': 'Detected Tasks'
        };
        filtered = filtered.filter(item => item.category === tabMapping[currentTab]);
    }
    
    // Filter by selected filters
    if (currentFilters.length > 0) {
        filtered = filtered.filter(item => currentFilters.includes(item.category));
    }
    
    // Filter by search
    if (currentSearch) {
        const search = currentSearch.toLowerCase();
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(search) || 
            item.message.toLowerCase().includes(search)
        );
    }
    
    return filtered;
}

function updateStats() {
    const filteredItems = getFilteredItems();
    const aiCount = filteredItems.filter(i => i.category === 'AI Suggestions').length;
    const reminderCount = filteredItems.filter(i => i.category === 'Reminders & Alerts').length;
    const taskCount = filteredItems.filter(i => i.category === 'Detected Tasks').length;
    
    document.getElementById('statTotal').textContent = filteredItems.length;
    document.getElementById('statAI').textContent = aiCount;
    document.getElementById('statReminders').textContent = reminderCount;
    document.getElementById('statTasks').textContent = taskCount;
}

// ==================== EVENT LISTENERS ==================== 
function attachCardEventListeners() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            const card = btn.closest('.inbox-card');
            const itemId = parseInt(card.dataset.id);
            
            handleAction(itemId, action, card);
        });
    });
}

function handleAction(itemId, action, card) {
    switch(action) {
        case 'accept':
            card.style.animation = 'cardSlideOut 0.3s ease forwards';
            setTimeout(() => {
                removeItem(itemId);
                showNotification('Task accepted and added to schedule', 'success');
            }, 300);
            break;
        case 'dismiss':
            card.style.animation = 'cardSlideOut 0.3s ease forwards';
            setTimeout(() => {
                removeItem(itemId);
                showNotification('Item dismissed', 'info');
            }, 300);
            break;
    }
}

function removeItem(itemId) {
    items = items.filter(item => item.id !== itemId);
    renderInboxItems();
}

function showNotification(message, type = 'info') {
    const colors = {
        success: 'linear-gradient(135deg, #48bb78, #38a169)',
        error: 'linear-gradient(135deg, #fc8181, #f56565)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: ${colors[type]};
        color: white;
        padding: 16px 24px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== INITIALIZE ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    renderInboxItems();
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Animate the button
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    // Tab pills
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentTab = pill.dataset.tab;
            renderInboxItems();
        });
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderInboxItems();
    });
    
    // FAB Menu
    const fabMain = document.getElementById('fabMain');
    const floatingPanel = document.getElementById('floatingPanel');
    
    fabMain.addEventListener('click', (e) => {
        e.stopPropagation();
        floatingPanel.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!floatingPanel.contains(e.target)) {
            floatingPanel.classList.remove('active');
        }
    });
    
    // FAB Actions
    const fabItems = document.querySelectorAll('.fab-item');
    fabItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            
            if (action === 'mark-all-read') {
                showNotification('All items marked as read', 'success');
            } else if (action === 'clear-ai') {
                items = items.filter(item => item.category !== 'AI Suggestions');
                renderInboxItems();
                showNotification('AI suggestions cleared', 'success');
            } else if (action === 'filter') {
                document.getElementById('filterModal').style.display = 'flex';
            }
            
            floatingPanel.classList.remove('active');
        });
    });
    
    // Filter Toggle (mobile)
    document.getElementById('filterToggle').addEventListener('click', () => {
        document.getElementById('filterModal').style.display = 'flex';
    });
    
    // Modal
    const modal = document.getElementById('filterModal');
    const closeModal = document.getElementById('closeModal');
    const applyFilters = document.getElementById('applyFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const value = e.target.value;
            if (e.target.checked) {
                currentFilters.push(value);
            } else {
                currentFilters = currentFilters.filter(f => f !== value);
            }
        });
    });
    
    clearFiltersBtn.addEventListener('click', () => {
        currentFilters = [];
        filterCheckboxes.forEach(cb => cb.checked = false);
        renderInboxItems();
    });
    
    applyFilters.addEventListener('click', () => {
        renderInboxItems();
        modal.style.display = 'none';
        showNotification('Filters applied', 'success');
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes cardSlideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
        }
    }
`;
document.head.appendChild(style);