import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { landingGuard } from './guards/landing.guard';

// Layouts
import { LayoutComponent } from './layouts/layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';

export const routes: Routes = [
    // Public Routes with Main Layout (Landing, Home, Blog)
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent),
                canActivate: [landingGuard]
            },
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
                canActivate: [authGuard]
            },
            {
                path: 'blog',
                loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
            }
        ]
    },

    // Special Standalone
    {
        path: 'wizard',
        loadComponent: () => import('./pages/wizard/wizard.component').then(m => m.WizardComponent)
    },

    // Dashboard Routes (Explicitly defined to avoid LayoutComponent collision)
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) }]
    },
    {
        path: 'clients',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/clients/clients.component').then(m => m.ClientsComponent) }]
    },
    {
        path: 'returns',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/returns/returns.component').then(m => m.ReturnsComponent) }]
    },
    {
        path: 'upload',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/upload/upload.component').then(m => m.UploadComponent) }]
    },
    {
        path: 'calculator',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/calculator/calculator.component').then(m => m.CalculatorComponent) }]
    },
    {
        path: 'profile',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) }]
    },
    {
        path: 'settings',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) }]
    },
    {
        path: 'agent',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/agent/agent.component').then(m => m.AgentComponent) }]
    },
    {
        path: 'herramientas-ia',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/ai-tools/ai-tools.component').then(m => m.AiToolsPageComponent) }]
    },
    {
        path: 'reports',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent) }]
    },
    {
        path: 'free-dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/free-dashboard/free-dashboard.component').then(m => m.FreeDashboardComponent) }]
    },
    {
        path: 'premium-dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [{ path: '', loadComponent: () => import('./pages/premium-dashboard/premium-dashboard.component').then(m => m.PremiumDashboardComponent) }]
    },

    // Fallback
    {
        path: 'update',
        loadComponent: () => import('./pages/update/update.component').then(m => m.UpdateComponent)
    },
    { path: '**', redirectTo: '' }
];
