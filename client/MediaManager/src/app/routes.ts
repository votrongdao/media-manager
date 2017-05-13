import { Routes } from '@angular/router';

import { GameOverviewComponent } from './games/components/game-overview/game-overview.component';
import { GameEditComponent } from './games/components/game-edit/game-edit.component';
import { AppComponent } from "app/containers/app/app.component";
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

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
        path: '**',
        component: NotFoundComponent
    }
];