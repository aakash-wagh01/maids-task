import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
