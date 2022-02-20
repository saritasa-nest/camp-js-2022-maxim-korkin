import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonSharedModule } from './shared/common-shared.module';
import { NavbarModule } from './features/navbar/navbar.module';

/** Root module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonSharedModule,
    BrowserAnimationsModule,
    NavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
