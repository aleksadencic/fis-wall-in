import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RestApiComponent } from './rest-api/rest-api.component';
import { UserEntitlementsFormComponent } from './user-entitlements-form/user-entitlements-form.component';
import { UserEntitlementsComponent } from './user-entitlements/user-entitlements.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'user-entitlements',
    component: UserEntitlementsComponent,
  },
  {
    path: 'user-entitlements-form',
    component: UserEntitlementsFormComponent,
  },
  {
    path: 'validate',
    component: RestApiComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
