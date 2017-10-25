import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {effects} from './app.effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {CustomSerializer} from './utils/custom-route-serializer.util';
import {HttpClientService} from './services/http-client.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { HomeComponent } from './pages/home/home.component';
import {MenuModule} from './modules/menu/menu.module';
import {InterpretationModule} from './modules/interpretation/interpretation.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    InterpretationModule,
    /**
     * Module for http requests
     */
    HttpClientModule,

    /**
     * Module for routing
     */
    AppRoutingModule,

    /**
     * Reducers
     */
    StoreModule.forRoot(reducers, { metaReducers}),

    /**
     * Effects
     */
    EffectsModule.forRoot(effects),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store
     */
    StoreRouterConnectingModule,

    /**
     * Dev tool, enabled only in development mode
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
    providers: [
      { provide: RouterStateSerializer, useClass: CustomSerializer },
      HttpClientService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
