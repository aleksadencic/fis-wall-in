import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserEntitlementsComponent } from './user-entitlements.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

@NgModule({
  declarations: [UserEntitlementsComponent, DialogFormComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [UserEntitlementsComponent],
})
export class UserEntitlementsModule {}
