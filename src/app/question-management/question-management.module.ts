/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { VyaPipeModule } from '../lib/pipes/vya.pipe.module';
import { QuestionManagementRouting } from './question-management.routing';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HistoryComponent } from './history/history.component';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';

import { DataService } from './data.service';
// import { DbService } from '../services/db.service';


@NgModule({
  declarations: [ListComponent, AddComponent, UploadComponent, HistoryComponent, EditComponent, ViewComponent ],
  imports: [
     CommonModule,
     FormsModule,
     ReactiveFormsModule,
     NgxPaginationModule,
     BsDropdownModule.forRoot(),
     AlertModule.forRoot(),
     CollapseModule.forRoot(),
     QuestionManagementRouting,
      VyaPipeModule,
     TabsModule.forRoot()
    ],
  providers: [DataService]
})
export class QuestionManagementModule {}
