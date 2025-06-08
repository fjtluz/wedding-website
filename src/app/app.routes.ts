import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PresencaComponent} from './pages/presenca/presenca.component';
import {PresentesComponent} from './pages/presentes/presentes.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'presenca',
        component: PresencaComponent
    },
    {
        path: 'presentes',
        component: PresentesComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
