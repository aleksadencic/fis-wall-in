import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserEntitlementsModule } from './user-entitlements/user-entitlements.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginPageModule } from './login-page/login-page.module';
import { AgGridModule } from 'ag-grid-angular';
import { RestApiModule } from './rest-api/rest-api.module';
import { UserEntitlementsFormModule } from './user-entitlements-form/user-entitlements-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    NoopAnimationsModule,
    RouterModule,
    AppRoutingModule,
    UserEntitlementsModule,
    UserEntitlementsFormModule,
    LoginPageModule,
    AgGridModule,
    RestApiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
