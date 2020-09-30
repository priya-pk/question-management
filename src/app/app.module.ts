import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationModalComponent } from "./lib/components/confirmation/confirmation-modal.component";
import { ProcedureModalComponent } from "./lib/components/confirmation/procedure-modal.component";

import { QuestionManagementModule } from './question-management/question-management.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationModalService } from './lib/components/confirmation/confirmation-modal-service';
import { DbService } from './services/db.service';
// import { BSModelService } from 'ngx-bootstrap/model';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    ProcedureModalComponent,
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    QuestionManagementModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    // BSModelService
  ],
  providers: [ConfirmationModalService,DbService   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
