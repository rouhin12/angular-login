import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [

    {
         path: '', redirectTo: 'login', pathMatch: 'full' ,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
         path: 'layout',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'weather',
                component: WeatherComponent,
            }
        ]}
];
