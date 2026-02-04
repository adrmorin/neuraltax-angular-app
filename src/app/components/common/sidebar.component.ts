import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    public modalService = inject(ModalService);
    @Input() isCollapsed = false;
    @Input() portalType: 'agent' | 'free' | 'premium' | 'vip' = 'agent';
    @Output() isCollapsedChange = new EventEmitter<boolean>();

    currentLang = 'es';

    toggleSidebar(): void {
        this.isCollapsed = !this.isCollapsed;
        this.isCollapsedChange.emit(this.isCollapsed);
    }

    toggleLanguage(event: Event): void {
        event.preventDefault();
        this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    }

    logout(event: Event): void {
        event.preventDefault();
        this.authService.logout();
        this.router.navigate(['/']).then(() => {
            this.modalService.openLogin();
        });
    }

    // Translations (simplified for now, will use ngx-translate later)
    t(key: string): string {
        const translations: Record<string, Record<string, string>> = {
            es: {
                'common.portal_of': 'Portal de',
                'common.agents': 'Agentes',
                'common.premium': 'Premium',
                'common.dashboard': 'Dashboard',
                'common.clients': 'Clientes',
                'common.ai_tools': 'Herramientas IA',
                'common.documents': 'Documentos',
                'common.reports': 'Reportes',
                'common.back_to_home': 'Volver al Inicio',
                'common.settings': 'Configuración',
                'common.logout': 'Cerrar Sesión',
                'common.toggle_sidebar': 'Toggle sidebar'
            },
            en: {
                'common.portal_of': 'Portal of',
                'common.agents': 'Agents',
                'common.premium': 'Premium',
                'common.dashboard': 'Dashboard',
                'common.clients': 'Clients',
                'common.ai_tools': 'AI Tools',
                'common.documents': 'Documents',
                'common.reports': 'Reports',
                'common.back_to_home': 'Back to Home',
                'common.settings': 'Settings',
                'common.logout': 'Logout',
                'common.toggle_sidebar': 'Toggle sidebar'
            }
        };
        return translations[this.currentLang][key] || key;
    }
}
