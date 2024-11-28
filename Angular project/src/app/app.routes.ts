import { Routes } from '@angular/router';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { PageNotFoundComponent } from './error/error.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MainComponent } from './main/main.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: MainComponent },
    {path: 'catalog', component: CatalogComponent},
    { path: 'error', component: ErrorMsgComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
