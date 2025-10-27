import { Routes } from '@angular/router';
import { OrdenesComponent } from './features/ordenes/ordenes.component';
import { TestHttpComponent } from './features/test-http.component';
import { OrdenesDetailComponent } from './features/ordenes/ordenes-detail.component';
import { OrdenesEditComponent } from './features/ordenes/ordenes-edit.component';
import { OrdenesCreateComponent } from './features/ordenes/ordenes-create.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./shared/empty.component').then(m => m.EmptyComponent) },
      { path: 'clientes', loadComponent: () => import('./shared/empty.component').then(m => m.EmptyComponent) },
      { path: 'ordenes', component: OrdenesComponent },
      { path: 'ordenes/create', component: OrdenesCreateComponent },
      { path: 'ordenes/:id', component: OrdenesDetailComponent },
      { path: 'ordenes/:id/edit', component: OrdenesEditComponent },
      { path: 'usuarios', loadComponent: () => import('./shared/empty.component').then(m => m.EmptyComponent) },
      { path: 'reportes', loadComponent: () => import('./shared/empty.component').then(m => m.EmptyComponent) },
      { path: 'test-http', component: TestHttpComponent },
      {
        path: 'prensa',
        loadComponent: () => import('./features/prensa').then(m => m.PrensaComponent),
        title: 'Prensa',
        data: { icon: 'print', sidebar: true }
      },
      {
        path: 'preprensa',
        loadComponent: () => import('./features/preprensa/preprensa-list.component').then(m => m.PreprensaListComponent),
        title: 'PrePrensa',
        data: { icon: 'layers', sidebar: true }
      },
      {
        path: 'preprensa/:id',
        loadComponent: () => import('./features/preprensa/preprensa-detail').then(m => m.PreprensaDetailComponent),
        title: 'PrePrensa Detalle',
        data: { icon: 'layers' }
      },
      {
        path: 'planificacion',
        loadComponent: () => import('./features/planificacion/planificacion.component').then(m => m.PlanificacionComponent),
        title: 'Planificación',
        data: { icon: 'event_note', sidebar: true }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
