/*!
 * Nexstrap v1.0.0
 * Bootstrap 5 Design System - JavaScript
 * MIT License - https://github.com/idavidcarvalho/Nexstrap
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // 🌙 Theme Toggle
    // ═══════════════════════════════════════════════════════════════════════════
    
    const ThemeToggle = {
        init() {
            const toggle = document.querySelector('[data-theme-toggle]');
            if (!toggle) return;

            // Check saved theme
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.setTheme(savedTheme);

            toggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            const toggle = document.querySelector('[data-theme-toggle]');
            if (toggle) {
                toggle.innerHTML = theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔔 Toast Notifications
    // ═══════════════════════════════════════════════════════════════════════════
    
    const Toast = {
        container: null,

        init() {
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.className = 'toast-container';
                document.body.appendChild(this.container);
            }
        },

        show(options = {}) {
            this.init();
            
            const {
                title = '',
                message = '',
                type = 'info',
                duration = 5000
            } = options;

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <i class="toast-icon bi bi-${this.getIcon(type)}"></i>
                <div class="toast-content">
                    ${title ? `<div class="toast-title">${title}</div>` : ''}
                    <p class="toast-message">${message}</p>
                </div>
                <button class="toast-close" aria-label="Fechar">&times;</button>
            `;

            toast.querySelector('.toast-close').addEventListener('click', () => {
                this.remove(toast);
            });

            this.container.appendChild(toast);

            if (duration > 0) {
                setTimeout(() => this.remove(toast), duration);
            }

            return toast;
        },

        remove(toast) {
            toast.style.animation = 'toast-slide-in 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        },

        getIcon(type) {
            const icons = {
                success: 'check-circle-fill',
                danger: 'exclamation-circle-fill',
                warning: 'exclamation-triangle-fill',
                info: 'info-circle-fill'
            };
            return icons[type] || 'info-circle-fill';
        },

        success(message, title = 'Sucesso') {
            return this.show({ message, title, type: 'success' });
        },

        error(message, title = 'Erro') {
            return this.show({ message, title, type: 'danger' });
        },

        warning(message, title = 'Aviso') {
            return this.show({ message, title, type: 'warning' });
        },

        info(message, title = 'Info') {
            return this.show({ message, title, type: 'info' });
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 📑 Sidebar Toggle
    // ═══════════════════════════════════════════════════════════════════════════
    
    const Sidebar = {
        init() {
            const toggle = document.querySelector('[data-sidebar-toggle]');
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            
            if (!toggle || !sidebar) return;

            toggle.addEventListener('click', () => {
                this.toggle(sidebar, overlay);
            });

            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.close(sidebar, overlay);
                });
            }

            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && sidebar.classList.contains('show')) {
                    this.close(sidebar, overlay);
                }
            });
        },

        toggle(sidebar, overlay) {
            if (sidebar.classList.contains('show')) {
                this.close(sidebar, overlay);
            } else {
                this.open(sidebar, overlay);
            }
        },

        open(sidebar, overlay) {
            sidebar.classList.add('show');
            if (overlay) overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        },

        close(sidebar, overlay) {
            sidebar.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔍 Search
    // ═══════════════════════════════════════════════════════════════════════════
    
    const Search = {
        init() {
            const input = document.querySelector('[data-search-input]');
            const results = document.querySelector('[data-search-results]');
            
            if (!input || !results) return;

            let searchTimeout;

            input.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.search(e.target.value, results);
                }, 300);
            });

            // Close on escape
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    results.classList.remove('show');
                    input.value = '';
                }
            });
        },

        search(query, results) {
            if (!query || query.length < 2) {
                results.classList.remove('show');
                return;
            }

            // Simple local search (replace with actual implementation)
            results.classList.add('show');
            results.innerHTML = '<div class="p-3 text-muted">Digite pelo menos 2 caracteres...</div>';
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 📋 Copy Code Button
    // ═══════════════════════════════════════════════════════════════════════════
    
    const CopyCode = {
        init() {
            document.querySelectorAll('.code-block').forEach(block => {
                const button = document.createElement('button');
                button.className = 'copy-code-btn';
                button.innerHTML = '<i class="bi bi-clipboard"></i>';
                button.setAttribute('aria-label', 'Copiar código');
                
                button.addEventListener('click', () => {
                    const code = block.querySelector('code');
                    if (code) {
                        this.copy(code.textContent, button);
                    }
                });

                block.style.position = 'relative';
                block.appendChild(button);
            });
        },

        copy(text, button) {
            navigator.clipboard.writeText(text).then(() => {
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="bi bi-check"></i>';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('copied');
                }, 2000);
            });
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 🎯 Dropdown Menu
    // ═══════════════════════════════════════════════════════════════════════════
    
    const Dropdown = {
        init() {
            document.querySelectorAll('[data-dropdown-toggle]').forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    const menu = document.querySelector(toggle.dataset.dropdownToggle);
                    this.toggle(menu, toggle);
                });
            });

            // Close on click outside
            document.addEventListener('click', (e) => {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    const toggle = document.querySelector(`[data-dropdown-toggle="#${menu.id}"]`);
                    if (!menu.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
                        this.close(menu);
                    }
                });
            });
        },

        toggle(menu, toggle) {
            if (menu.classList.contains('show')) {
                this.close(menu);
            } else {
                this.closeAll();
                menu.classList.add('show');
                toggle.setAttribute('aria-expanded', 'true');
            }
        },

        close(menu) {
            menu.classList.remove('show');
            const toggle = document.querySelector(`[data-dropdown-toggle="#${menu.id}"]`);
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        },

        closeAll() {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                this.close(menu);
            });
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // ⌨️ Keyboard Navigation
    // ═══════════════════════════════════════════════════════════════════════════
    
    const KeyboardNav = {
        init() {
            // Trap focus in modals
            document.querySelectorAll('[role="dialog"]').forEach(modal => {
                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        this.trapFocus(modal, e);
                    }
                });
            });

            // Escape to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const modal = document.querySelector('.modal.show');
                    if (modal) {
                        const bsModal = bootstrap.Modal.getInstance(modal);
                        if (bsModal) bsModal.hide();
                    }
                }
            });
        },

        trapFocus(element, event) {
            const focusable = element.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // 📱 Mobile Menu
    // ═══════════════════════════════════════════════════════════════════════════
    
    const MobileMenu = {
        init() {
            const toggle = document.querySelector('[data-mobile-menu-toggle]');
            const menu = document.querySelector('[data-mobile-menu]');
            
            if (!toggle || !menu) return;

            toggle.addEventListener('click', () => {
                const isOpen = menu.classList.contains('show');
                this.close(menu);
                if (!isOpen) {
                    this.open(menu);
                    toggle.setAttribute('aria-expanded', 'true');
                } else {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        },

        open(menu) {
            menu.classList.add('show');
            menu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        },

        close(menu) {
            menu.classList.remove('show');
            menu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // ⚡ Initialize
    // ═══════════════════════════════════════════════════════════════════════════
    
    document.addEventListener('DOMContentLoaded', () => {
        ThemeToggle.init();
        Sidebar.init();
        Search.init();
        CopyCode.init();
        Dropdown.init();
        KeyboardNav.init();
        MobileMenu.init();
    });

    // Expose to window
    window.Nexstrap = {
        Toast,
        ThemeToggle,
        Sidebar,
        Search,
        Dropdown,
        MobileMenu
    };

})();
