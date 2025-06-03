import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'carrusel',
    loadChildren: () => import('./pages/carrusel/carrusel.module').then( m => m.CarruselPageModule)
  },
  {
    path: 'ciudad/:ciudadId',
    loadChildren: () => import('./pages/ciudad/ciudad.module').then( m => m.CiudadPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'step1',
    loadChildren: () => import('./pages/step1/step1.module').then( m => m.Step1PageModule)
  },
  {
    path: 'step2',
    loadChildren: () => import('./pages/step2/step2.module').then( m => m.Step2PageModule)
  },
  {
    path: 'step3',
    loadChildren: () => import('./pages/step3/step3.module').then( m => m.Step3PageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./pages/camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./pages/geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
