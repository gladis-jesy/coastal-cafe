import { Routes } from '@angular/router';
import {HomePageComponent} from './module/user-view/home-page/home-page.component';
import {MenuPageComponent} from './module/user-view/menu-page/menu-page.component';
import {AboutUsComponent} from './module/user-view/about-us/about-us.component';
import {ContactComponent} from './module/user-view/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'menu', component: MenuPageComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
];
