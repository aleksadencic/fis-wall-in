import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { RestApiComponent } from './rest-api.component';

@NgModule({
  declarations: [RestApiComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [RestApiComponent],
})
export class RestApiModule {}
