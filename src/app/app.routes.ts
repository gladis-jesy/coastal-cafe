import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home-page.component').then(m => m.HomePageComponent) },
    { path: 'menu', loadComponent: () => import('./features/menu/menu-page.component').then(m => m.MenuPageComponent) },
    { path: 'about-us', loadComponent: () => import('./features/about/about-us.component').then(m => m.AboutUsComponent) },
    { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
];
