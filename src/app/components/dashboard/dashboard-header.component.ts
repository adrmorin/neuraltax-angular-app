import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    imports: [CommonModule, TranslateModule],
    templateUrl: './dashboard-header.component.html',
    styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
    private translate = inject(TranslateService);

    get currentLang(): string {
        return this.translate.currentLang || 'es';
    }

    switchLanguage(lang: string) {
        this.translate.use(lang);
    }

    @Input() showLangSwitcher = false;
    @Input() clientType: 'free' | 'premium' | 'vip' | 'agent' = 'agent';
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() showLogo = true;
    @Input() userName = 'Usuario';
    @Input() userAvatar?: string;

    private clientConfigs: Record<string, ClientConfig> = {
        free: {
            title: 'DASHBOARD.HEADER.TITLE',
            subtitle: 'DASHBOARD.HEADER.SUBTITLE_FREE',
            brandName: 'Neuraltax',
            brandSubtitle: 'COMMON.FREE',
            accentColor: '#9ca3af'
        },
        premium: {
            title: 'DASHBOARD.HEADER.TITLE',
            subtitle: 'DASHBOARD.HEADER.SUBTITLE_PREMIUM',
            brandName: 'Neuraltax',
            brandSubtitle: 'COMMON.PREMIUM',
            accentColor: '#688071'
        },
        vip: {
            title: 'DASHBOARD.HEADER.TITLE',
            subtitle: 'DASHBOARD.HEADER.SUBTITLE_VIP',
            brandName: 'Neuraltax',
            brandSubtitle: 'COMMON.VIP',
            accentColor: '#fbbf24'
        },
        agent: {
            title: 'DASHBOARD.HEADER.TITLE_AGENT',
            subtitle: 'DASHBOARD.HEADER.SUBTITLE_AGENT',
            brandName: 'Neuraltax',
            brandSubtitle: 'COMMON.AGENT',
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
