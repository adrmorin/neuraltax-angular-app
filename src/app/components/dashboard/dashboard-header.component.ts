import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ClientConfig {
    title: string;
    subtitle: string;
    brandName: string;
    brandSubtitle: string;
    accentColor: string;
}

@Component({
    selector: 'app-dashboard-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard-header.component.html',
    styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
    @Input() clientType: 'free' | 'premium' | 'vip' | 'agent' = 'agent';
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() showLogo: boolean = true;
    @Input() userName: string = 'Usuario';
    @Input() userAvatar?: string;

    private clientConfigs: Record<string, ClientConfig> = {
        free: {
            title: 'Dashboard',
            subtitle: 'Bienvenido al portal Free',
            brandName: 'Neuraltax',
            brandSubtitle: 'Free',
            accentColor: '#9ca3af'
        },
        premium: {
            title: 'Dashboard',
            subtitle: 'Bienvenido al portal Premium',
            brandName: 'Neuraltax',
            brandSubtitle: 'Premium',
            accentColor: '#688071'
        },
        vip: {
            title: 'Dashboard',
            subtitle: 'Bienvenido al portal VIP',
            brandName: 'Neuraltax',
            brandSubtitle: 'VIP',
            accentColor: '#fbbf24'
        },
        agent: {
            title: 'Dashboard',
            subtitle: 'Bienvenido al portal de agentes',
            brandName: 'Neuraltax',
            brandSubtitle: 'Agente',
            accentColor: '#688071'
        }
    };

    get config(): ClientConfig {
        return this.clientConfigs[this.clientType];
    }

    get displayTitle(): string {
        return this.title || this.config.title;
    }

    get displaySubtitle(): string {
        return this.subtitle || this.config.subtitle;
    }

    get userInitials(): string {
        return this.userName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }
}
