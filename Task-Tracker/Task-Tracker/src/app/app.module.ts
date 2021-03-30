import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskTrackerComponent } from './task-tracker/task-tracker.component';

import * as button from '@angular/material/button';
import * as input from '@angular/material/input';
import * as formField from '@angular/material/form-field';
import * as toolbar from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as divider from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import * as table from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    TaskTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    button.MatButtonModule,
    input.MatInputModule,
    formField.MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    toolbar.MatToolbarModule,
    divider.MatDividerModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    table.MatTableModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
