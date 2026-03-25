// // Todo App Class
// class TodoApp {
//     constructor() {
//         this.tasks = this.loadTasks();
//         this.currentFilter = 'all';
//         this.init();
//     }

//     // Initialize the app
//     init() {
//         this.cacheDOMElements();
//         this.bindEvents();
//         this.render();
//     }

//     // Cache DOM elements
//     cacheDOMElements() {
//         this.taskInput = document.getElementById('taskInput');
//         this.addBtn = document.getElementById('addBtn');
//         this.taskList = document.getElementById('taskList');
//         this.totalTasksSpan = document.getElementById('totalTasks');
//         this.completedTasksSpan = document.getElementById('completedTasks');
//         this.pendingTasksSpan = document.getElementById('pendingTasks');
//         this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
//         this.filterBtns = document.querySelectorAll('.filter-btn');
//     }

//     // Bind event listeners
//     bindEvents() {
//         this.addBtn.addEventListener('click', () => this.addTask());
//         this.taskInput.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') this.addTask();
//         });
//         this.clearCompletedBtn.addEventListener('click', () => this.clearCompletedTasks());
//         this.filterBtns.forEach(btn => {
//             btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
//         });
//     }

//     // Load tasks from localStorage
//     loadTasks() {
//         const storedTasks = localStorage.getItem('todoTasks');
//         if (storedTasks) {
//             return JSON.parse(storedTasks);
//         }
//         return [];
//     }

//     // Save tasks to localStorage
//     saveTasks() {
//         localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
//     }

//     // Add new task
//     addTask() {
//         const taskText = this.taskInput.value.trim();
        
//         if (!taskText) {
//             this.showAlert('Please enter a task!', 'warning');
//             return;
//         }

//         if (taskText.length > 100) {
//             this.showAlert('Task cannot exceed 100 characters!', 'warning');
//             return;
//         }

//         const newTask = {
//             id: Date.now(),
//             text: taskText,
//             completed: false,
//             createdAt: new Date().toISOString()
//         };

//         this.tasks.unshift(newTask);
//         this.saveTasks();
//         this.taskInput.value = '';
//         this.render();
//         this.showAlert('Task added successfully!', 'success');
//     }

//     // Delete task
//     deleteTask(id) {
//         this.tasks = this.tasks.filter(task => task.id !== id);
//         this.saveTasks();
//         this.render();
//         this.showAlert('Task deleted!', 'success');
//     }

//     // Toggle task completion
//     toggleTask(id) {
//         const task = this.tasks.find(task => task.id === id);
//         if (task) {
//             task.completed = !task.completed;
//             this.saveTasks();
//             this.render();
//         }
//     }

//     // Edit task
//     editTask(id) {
//         const task = this.tasks.find(task => task.id === id);
//         if (task) {
//             const newText = prompt('Edit your task:', task.text);
//             if (newText && newText.trim()) {
//                 task.text = newText.trim();
//                 this.saveTasks();
//                 this.render();
//                 this.showAlert('Task updated!', 'success');
//             } else if (newText === '') {
//                 this.showAlert('Task cannot be empty!', 'warning');
//             }
//         }
//     }

//     // Clear all completed tasks
//     clearCompletedTasks() {
//         const completedTasks = this.tasks.filter(task => task.completed);
//         if (completedTasks.length === 0) {
//             this.showAlert('No completed tasks to clear!', 'info');
//             return;
//         }
        
//         if (confirm(`Are you sure you want to delete ${completedTasks.length} completed task(s)?`)) {
//             this.tasks = this.tasks.filter(task => !task.completed);
//             this.saveTasks();
//             this.render();
//             this.showAlert('Completed tasks cleared!', 'success');
//         }
//     }

//     // Set current filter
//     setFilter(filter) {
//         this.currentFilter = filter;
//         this.filterBtns.forEach(btn => {
//             if (btn.dataset.filter === filter) {
//                 btn.classList.add('active');
//             } else {
//                 btn.classList.remove('active');
//             }
//         });
//         this.render();
//     }

//     // Get filtered tasks based on current filter
//     getFilteredTasks() {
//         switch (this.currentFilter) {
//             case 'pending':
//                 return this.tasks.filter(task => !task.completed);
//             case 'completed':
//                 return this.tasks.filter(task => task.completed);
//             default:
//                 return this.tasks;
//         }
//     }

//     // Update statistics
//     updateStats() {
//         const total = this.tasks.length;
//         const completed = this.tasks.filter(task => task.completed).length;
//         const pending = total - completed;

//         this.totalTasksSpan.textContent = total;
//         this.completedTasksSpan.textContent = completed;
//         this.pendingTasksSpan.textContent = pending;
//     }

//     // Render tasks to DOM
//     render() {
//         const filteredTasks = this.getFilteredTasks();
//         this.updateStats();
        
//         if (filteredTasks.length === 0) {
//             this.taskList.innerHTML = `
//                 <div class="empty-state">
//                     <span class="empty-state-icon">📝</span>
//                     <p>No tasks to display</p>
//                     <small>Add your first task above!</small>
//                 </div>
//             `;
//             return;
//         }

//         this.taskList.innerHTML = filteredTasks.map(task => `
//             <li class="task-item" data-id="${task.id}">
//                 <input 
//                     type="checkbox" 
//                     class="task-checkbox" 
//                     ${task.completed ? 'checked' : ''}
//                     onchange="todoApp.toggleTask(${task.id})"
//                 >
//                 <span class="task-text ${task.completed ? 'completed' : ''}">${this.escapeHtml(task.text)}</span>
//                 <div class="task-actions">
//                     <button class="edit-btn" onclick="todoApp.editTask(${task.id})" title="Edit task">
//                         ✏️
//                     </button>
//                     <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})" title="Delete task">
//                         🗑️
//                     </button>
//                 </div>
//             </li>
//         `).join('');
//     }

//     // Escape HTML to prevent XSS
//     escapeHtml(text) {
//         const div = document.createElement('div');
//         div.textContent = text;
//         return div.innerHTML;
//     }

//     // Show alert message (temporary notification)
//     showAlert(message, type) {
//         // Create alert element
//         const alertDiv = document.createElement('div');
//         alertDiv.className = `alert alert-${type}`;
//         alertDiv.textContent = message;
        
//         // Style the alert
//         alertDiv.style.cssText = `
//             position: fixed;
//             top: 20px;
//             right: 20px;
//             padding: 12px 20px;
//             border-radius: 10px;
//             color: white;
//             font-weight: 500;
//             z-index: 1000;
//             animation: slideInRight 0.3s ease;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//         `;
        
//         // Set colors based on type
//         switch(type) {
//             case 'success':
//                 alertDiv.style.backgroundColor = '#28a745';
//                 break;
//             case 'warning':
//                 alertDiv.style.backgroundColor = '#ffc107';
//                 alertDiv.style.color = '#333';
//                 break;
//             case 'info':
//                 alertDiv.style.backgroundColor = '#17a2b8';
//                 break;
//             default:
//                 alertDiv.style.backgroundColor = '#dc3545';
//         }
        
//         document.body.appendChild(alertDiv);
        
//         // Remove alert after 2 seconds
//         setTimeout(() => {
//             alertDiv.style.animation = 'fadeOut 0.3s ease';
//             setTimeout(() => {
//                 if (alertDiv.parentNode) {
//                     alertDiv.parentNode.removeChild(alertDiv);
//                 }
//             }, 300);
//         }, 2000);
//     }
// }

// // Add animation styles for alerts
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes slideInRight {
//         from {
//             transform: translateX(100%);
//             opacity: 0;
//         }
//         to {
//             transform: translateX(0);
//             opacity: 1;
//         }
//     }
    
//     @keyframes fadeOut {
//         from {
//             opacity: 1;
//         }
//         to {
//             opacity: 0;
//         }
//     }
// `;
// document.head.appendChild(style);

// // Initialize the app
// let todoApp;
// document.addEventListener('DOMContentLoaded', () => {
//     todoApp = new TodoApp();
// });     




// Todo App Class
class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.bindEvents();
        this.render();
    }

    cacheDOMElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.totalTasksSpan = document.getElementById('totalTasks');
        this.completedTasksSpan = document.getElementById('completedTasks');
        this.pendingTasksSpan = document.getElementById('pendingTasks');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTask());
        
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        this.clearCompletedBtn.addEventListener('click', () => this.clearCompletedTasks());

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Event delegation for task list (best practice)
        this.taskList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;
            
            const id = parseInt(taskItem.dataset.id);

            if (e.target.classList.contains('task-checkbox')) {
                this.toggleTask(id);
            } 
            else if (e.target.classList.contains('edit-btn')) {
                this.editTask(id);
            } 
            else if (e.target.classList.contains('delete-btn')) {
                this.deleteTask(id);
            }
        });
    }

    loadTasks() {
        const storedTasks = localStorage.getItem('todoTasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (!taskText) {
            this.showAlert('Please enter a task!', 'warning');
            return;
        }
        if (taskText.length > 100) {
            this.showAlert('Task cannot exceed 100 characters!', 'warning');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(newTask);   // new task top pe aaye
        this.saveTasks();
        this.taskInput.value = '';
        this.render();
        this.showAlert('Task added successfully!', 'success');
    }

    deleteTask(id) {
        if (confirm('Delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.render();
            this.showAlert('Task deleted!', 'success');
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    editTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (!task) return;

        const newText = prompt('Edit your task:', task.text);
        if (newText === null) return; // user cancelled prompt

        const trimmed = newText.trim();
        if (trimmed === '') {
            this.showAlert('Task cannot be empty!', 'warning');
            return;
        }
        if (trimmed.length > 100) {
            this.showAlert('Task cannot exceed 100 characters!', 'warning');
            return;
        }

        task.text = trimmed;
        this.saveTasks();
        this.render();
        this.showAlert('Task updated!', 'success');
    }

    clearCompletedTasks() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showAlert('No completed tasks to clear!', 'info');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(task => !task.completed);
            this.saveTasks();
            this.render();
            this.showAlert('Completed tasks cleared!', 'success');
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTasks() {
        if (this.currentFilter === 'pending') {
            return this.tasks.filter(task => !task.completed);
        }
        if (this.currentFilter === 'completed') {
            return this.tasks.filter(task => task.completed);
        }
        return this.tasks;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;

        this.totalTasksSpan.textContent = total;
        this.completedTasksSpan.textContent = completed;
        this.pendingTasksSpan.textContent = pending;
    }

    render() {
        const filteredTasks = this.getFilteredTasks();
        this.updateStats();

        if (filteredTasks.length === 0) {
            this.taskList.innerHTML = `
                <div class="empty-state">
                    <span class="empty-state-icon">📝</span>
                    <p>No tasks found</p>
                    <small>${this.currentFilter === 'all' ? 'Add your first task above!' : 'No tasks in this filter'}</small>
                </div>
            `;
            return;
        }

        this.taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                >
                <span class="task-text ${task.completed ? 'completed' : ''}">${this.escapeHtml(task.text)}</span>
                <div class="task-actions">
                    <button class="edit-btn" title="Edit task">✏️</button>
                    <button class="delete-btn" title="Delete task">🗑️</button>
                </div>
            </li>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;

        alertDiv.style.cssText = `
            position: fixed; top: 20px; right: 20px; padding: 12px 20px;
            border-radius: 10px; color: white; font-weight: 500; z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        if (type === 'success') alertDiv.style.backgroundColor = '#28a745';
        else if (type === 'warning') {
            alertDiv.style.backgroundColor = '#ffc107';
            alertDiv.style.color = '#333';
        }
        else if (type === 'info') alertDiv.style.backgroundColor = '#17a2b8';
        else alertDiv.style.backgroundColor = '#dc3545';

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.transition = 'opacity 0.3s';
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 300);
        }, 2500);
    }
}

// Initialize
let todoApp;
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
});