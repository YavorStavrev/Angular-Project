import { Routes } from '@angular/router';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { PageNotFoundComponent } from './error/error.component';
import { CatalogComponent } from './post/catalog/catalog.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CreateComponent } from './post/create/create.component';
import { DetailsComponent } from './post/details/details.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'create', component: CreateComponent },
    { path: 'details', component: DetailsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: MainComponent },
    {
        path: 'catalog',
        children: [
            {path: '', component: CatalogComponent},
            {path: ':postId', component: DetailsComponent},
        ]
    },
    { path: 'error', component: ErrorMsgComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
