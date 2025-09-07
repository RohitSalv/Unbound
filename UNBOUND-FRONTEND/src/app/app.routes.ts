import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Home } from './components/pages/home/home';
import { Landing } from './components/pages/landing/landing';

export const routes: Routes = [
    {path:"landing",component:Landing},
    { path:"",component:Login },
    { path:"register",component:Register},
    { path:"home",component:Home}
];
