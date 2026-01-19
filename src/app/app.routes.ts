import { Routes } from '@angular/router';

// Layouts
import { LayoutComponent } from './layouts/layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';

// Pages
import { HomeComponent } from './pages/home.component';
import { BlogComponent } from './pages/blog.component';
import { LoginComponent } from './pages/login.component';
import { WizardComponent } from './pages/wizard.component';
import { DashboardComponent } from './pages/dashboard.component';
import { ClientsComponent } from './pages/clients.component';
import { ReturnsComponent } from './pages/returns.component';
import { UploadComponent } from './pages/upload.component';
import { CalculatorComponent } from './pages/calculator.component';
import { ProfileComponent } from './pages/profile.component';
import { SettingsComponent } from './pages/settings.component';
import { AgentComponent } from './pages/agent.component';

export const routes: Routes = [
    // Public Routes with Main Layout
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'blog', component: BlogComponent }
        ]
    },

    // Standalone Routes
    { path: 'login', component: LoginComponent },
    { path: 'wizard', component: WizardComponent },

    // Dashboard Routes with Dashboard Layout
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'clients', component: ClientsComponent },
            { path: 'returns', component: ReturnsComponent },
            { path: 'upload', component: UploadComponent },
            { path: 'calculator', component: CalculatorComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'agent', component: AgentComponent }
        ]
    },

    // Fallback
    { path: '**', redirectTo: '' }
];
