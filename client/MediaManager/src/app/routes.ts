import { Routes } from '@angular/router';

import { GameOverviewComponent } from './games/components/game-overview/game-overview.component';
import { GameEditComponent } from './games/components/game-edit/game-edit.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { BookOverviewComponent } from "./books/components/book-overview/book-overview.component";
import { BookEditComponent } from "./books/components/book-edit/book-edit.component";
import { MovieOverviewComponent } from "./movies/components/movie-overview/movie-overview.component";
import { MovieEditComponent } from "./movies/components/movie-edit/movie-edit.component";

export const routes: Routes = [
    { 
        path: '',
        component: GameOverviewComponent
    },
    {
        path: 'games',
        component: GameOverviewComponent
    }, 
    {
        path: 'games/add',
        component: GameEditComponent
    },
    {
        path: 'books',
        component: BookOverviewComponent
    }, 
    {
        path: 'books/add',
        component: BookEditComponent
    },
    {
        path: 'movies',
        component: MovieOverviewComponent
    }, 
    {
        path: 'movies/add',
        component: MovieEditComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];