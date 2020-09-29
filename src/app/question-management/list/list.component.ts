/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { QuestionManagement } from '../question-management.model';

import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // search & filter
 searchString: string = '';
 displayView: string = 'table';
 groupName: string | undefined = undefined;
 levelFilter: string | undefined  = undefined;
 typeFilter: string | undefined = undefined;

  // component
  questionManagementData: QuestionManagement[] = [];
  optionsList: string = '';
  questionsCount: string = '';
  simpleQuestions: string = '';
  fillInQuestions: string = '';
  multipleQuestions: string = '';

  levelList: string[] = ['Simple', 'Medium', 'Complex'];
  typeList: string[] = ['Fill in the Blank', 'Match the Following', 'Multiple Choice', 'True or False'];

   // pagination
  page: number = 1;

   // checkbox
   isChecked: boolean = false;
   checkedIdList: any[] = [];
   id: string = '';

    // filter
  isCollapsed: boolean = true;
  filterStatus: boolean = false;
  actualList: boolean = true;

  constructor(
    private dataService: DataService,
    private router: Router,
    private modelService: ConfirmationModalService) {}

  ngOnInit() {
    this.getAllDetails();
  }

  getAllDetails() {
    this.dataService.getAll().subscribe((response: any) => {
      this.questionManagementData = response;
      this.questionsCount = response.length;
      const level =  response.filter((value: any) => {
         return value.level === 'Simple';
         });
      this.simpleQuestions = level.length;
      const data =  response.filter((value: any) => {
           return value.type === 'Fill in the Blank';
          });
      this.fillInQuestions = data.length;

      const result =  response.filter((value: any) => {
           return value.type === 'Multiple Choice';
           });

      this.multipleQuestions = result.length;

      this.optionsList = response.map((value: any) => {
            return  value.options;
          });
      });
  }

  getSelectedId(isChecked: boolean, id: string) {
    this.id = id;
    if (isChecked === true) {
      this.checkedIdList.push(this.id);
    } else {
      const index = this.checkedIdList.indexOf(this.id);
      this.checkedIdList.splice(index);
    }
  }

  applyFilter() {
    this.actualList = false;
    this.filterStatus = true;
  }

  reset() {
    this.actualList = true;
    this.filterStatus = false;
  }

  onEdit(_id: string) {
    this.router.navigate(['/question-management/edit'], { queryParams: { editId: _id } });
  }

  onDelete(_id: string) {
    const modal = this.modelService.createConfirmationModal();
    modal.content.showConfirmationModal('Delete confirmation', 'Are you sure want to delete ' + name + '?');

    modal.content.onClose.subscribe((result: boolean) => {
      if (result === true) {
        // when pressed Yes
        this.dataService.delete(_id).subscribe(() => {
          this.getAllDetails();
        });
      } else if (result === false) {
        // when pressed No
      } else {
        // When closing the modal without no or yes
      }
    });
  }

  onView(_id: string) {
    this.router.navigate(['/question-management/view'], { queryParams: { viewId: _id } });
  }

  onRefresh() {
    this.getAllDetails();
  }
}
