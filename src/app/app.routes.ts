import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { MenuPageComponent } from './features/menu/menu-page.component';
import { AboutUsComponent } from './features/about/about-us.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'menu', component: MenuPageComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
];
