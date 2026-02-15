import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { landingGuard } from './guards/landing.guard';

// Layouts
import { LayoutComponent } from './layouts/layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BlogComponent } from './pages/blog/blog.component';
import { WizardComponent } from './pages/wizard/wizard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AgentComponent } from './pages/agent/agent.component';
import { AiToolsPageComponent } from './pages/ai-tools/ai-tools.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { FreeDashboardComponent } from './pages/free-dashboard/free-dashboard.component';
import { PremiumDashboardComponent } from './pages/premium-dashboard/premium-dashboard.component';

export const routes: Routes = [
    // Public Routes with Main Layout
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: LandingPageComponent,
                canActivate: [landingGuard] // Prevent logged in users from seeing landing
            },
            { path: 'home', component: HomeComponent, canActivate: [authGuard] },
            { path: 'blog', component: BlogComponent }
        ]
    },

    // Standalone Routes
    { path: 'wizard', component: WizardComponent },

    // Dashboard Routes with Dashboard Layout (Protected)
    {
        path: '',
        component: DashboardLayoutComponent,
        canActivate: [authGuard], // Protect all dashboard routes
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'clients', component: ClientsComponent },
            { path: 'returns', component: ReturnsComponent },
            { path: 'upload', component: UploadComponent },
            { path: 'calculator', component: CalculatorComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'agent', component: AgentComponent },
            { path: 'herramientas-ia', component: AiToolsPageComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'free-dashboard', component: FreeDashboardComponent },
            { path: 'premium-dashboard', component: PremiumDashboardComponent }
        ]
    },

    // Fallback
    { path: 'update', loadComponent: () => import('./pages/update/update.component').then(m => m.UpdateComponent) },
    { path: '**', redirectTo: '' }
];
