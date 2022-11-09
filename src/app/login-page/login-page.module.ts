import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LoginPageComponent } from './login-page.component';
import { SolWalletsModule } from 'angular-sol-wallets';
import * as base58 from 'bs58';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SolWalletsModule,
  ],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
