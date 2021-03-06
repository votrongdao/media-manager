import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

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
import { MovieEffects } from './movies/effects/movie';
import { BookEffects } from './books/effects/book';
import { GameService } from "app/games/services/game";
import { MaterializeModule } from 'angular2-materialize';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BookEditComponent } from './books/components/book-edit/book-edit.component';
import { BookOverviewComponent } from './books/components/book-overview/book-overview.component';
import { MovieEditComponent } from './movies/components/movie-edit/movie-edit.component';
import { MovieOverviewComponent } from './movies/components/movie-overview/movie-overview.component';
import { BookService } from "./books/services/book";
import { MovieService } from "./movies/services/movie";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    GameOverviewComponent,
    GameEditComponent,
    NotFoundComponent,
    BookEditComponent,
    BookOverviewComponent,
    MovieEditComponent,
    MovieOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
        }
    }),
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(GameEffects),
    EffectsModule.run(MovieEffects),
    EffectsModule.run(BookEffects)
  ],
  providers: [
    GameService, BookService, MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
