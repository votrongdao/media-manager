import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './containers/app/app.component';
import { GameOverviewComponent } from './games/components/game-overview/game-overview.component';
import { GameEditComponent } from './games/components/game-edit/game-edit.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RouterModule } from "@angular/router";
import { routes } from './routes';
import { reducer } from './shared/reducers';
import { StoreModule } from "@ngrx/store";
import { RouterStoreModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { GameEffects } from './games/effects/game';
import { GameService } from "app/games/services/game";
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    AppComponent,
    GameOverviewComponent,
    GameEditComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(GameEffects)
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
