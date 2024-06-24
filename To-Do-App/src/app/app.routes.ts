import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { authGuard } from './RouteGuards/authGuards';
import { Statuses } from './Models/StatusModels';
import { TasksContainerComponent } from './home/tasks-container/tasks-container.component';

export const routes: Routes = [
    {path: 'login', component: AuthComponent, data: {mode: 'login'}},
    {path: 'signup', component: AuthComponent, data: {mode: 'signup'}},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: '', component: HomeComponent, canActivate: [authGuard] ,children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: 'active', component: TasksContainerComponent, data: {taskType: Statuses.Active} },
        { path: 'completed', component: TasksContainerComponent, data: {taskType: Statuses.Completed} }
    ]}
];
