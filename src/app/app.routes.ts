import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { Fotos } from './pages/fotos/fotos';
import { PresencaComponent } from './pages/presenca/presenca.component';
import { Galeria } from './pages/fotos/galeria/galeria';
import { skip } from 'rxjs';
// import {PresencaComponent} from './pages/presenca/presenca.component';
// import {PresentesComponent} from './pages/presentes/presentes.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'fotos',
    component: Fotos,
    children: [
      {
        path: 'lembre-lembre',
        component: Galeria,
        data: {
          fotoGroup: 'lembre-lembre',
          range: {
            from: 1,
            to: 235,
            skipping: []
          } 
        }
      },
      {
        path: 'fotografo',
        component: Galeria,
        data: {
          fotoGroup: 'fotografo',
          range: {
            from: 1,
            to: 770,
            skipping: [
              {
                from: 22,
                to: 111
              }
            ]
          }
        }
      }
    ]
  },
  /*
    {
        path: 'presenca',
        component: PresencaComponent
    },
    {
        path: 'presentes',
        component: PresentesComponent
    },
  */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
