import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CompletedComponent } from './home/completed/completed.component';
import { ActiveComponent } from './home/active/active.component';
import { authGuard } from './RouteGuards/authGuards';

export const routes: Routes = [
    {path: 'login', component: AuthComponent},
    // {path: 'signup', component: AuthComponent},
    {path: '', redirectTo: 'dasboard', pathMatch: 'full'},
    {path: '', component: HomeComponent, canActivate: [authGuard] ,children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: 'active', component: ActiveComponent },
        { path: 'completed', component: CompletedComponent }
    ]}
];
