// import { HttpClient } from '@angular/common/http';
/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// import moment from 'moment';
import * as moment from 'moment';

import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';
import { DataService } from '../data.service';
import { QuestionManagement } from '../question-management.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  // component
  questionManagementForm: FormGroup = new FormGroup({});
  options: FormArray = new FormArray([]);
  submitted: boolean = false;
  _id: string = '';
  types: boolean | undefined = undefined;
  selectedValue: string | undefined = undefined;
  questionManagement: QuestionManagement = new QuestionManagement();
  optionsData: any[] = [];
  alertMsg: boolean | undefined = undefined;

  levelList: string[] = ['Simple', 'Medium', 'Complex'];
  typeList: string[] = ['Fill in the Blank', 'Match the Following', 'Multiple Choice', 'True or False'];


  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private formBuilder: FormBuilder, private modelService: ConfirmationModalService) {}

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('editId')) {
      // @ts-ignore TS2322
      this._id = this.route.snapshot.queryParamMap.get('editId');
      this.getEditDetailsById(this._id);
    }

    this.questionManagementForm = this.formBuilder.group({
      id: [''],
      shortName: ['', Validators.required],
      groupName: ['', Validators.required],
      groupId: ['', Validators.required],
      suggestionMark: ['', Validators.required],
      timeAllocated: ['', Validators.required],
      level: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      totalOptions: ['', Validators.required],
      answer: ['', Validators.required],
      options: this.formBuilder.array([])
    });

   }

     createOptions(): FormGroup {
    return this.formBuilder.group({
     option: ''
    });

    }

   getControl() {
    return (this.questionManagementForm.controls.options as FormArray).controls;
  }

  addOptions() {
    this.options = this.questionManagementForm.controls.options as FormArray;
    this.options.push(this.createOptions());
  }

  checkType() {
    if (this.selectedValue === 'Multiple Choice') {
      this.types = true;
    } else {
      this.types = false;
    }
  }

  get f() {
    return this.questionManagementForm.controls;
  }

  getEditDetailsById(_id: any) {
    this.dataService.get(_id).subscribe((data: any) => {
      this.questionManagement = data;
      this.updateEditView(data);
    });
  }

  updateEditView(edit: any) {
    this.optionsData = edit.options;
    this.questionManagementForm.patchValue({
      id: edit.id,
      shortName: edit.shortName,
      groupName: edit.groupName,
      groupId: edit.groupId,
      suggestionMark: edit.suggestionMark,
      timeAllocated: edit.timeAllocated,
      level: edit.level,
      type: edit.type,
      description: edit.description,
      totalOptions: edit.totalOptions,
      answer: edit.answer
    });
    this.selectedValue = edit.type;
    this.patchResult();
    this.onHide(edit.type);
  }

  onHide(data: any) {
    if (data === 'Multiple Choice') {
      this.types = true;
    } else {
      this.types = false;
    }
  }

  patchResult() {
    const control = this.questionManagementForm.get('options') as FormArray;
    this.optionsData.forEach((value: any) => {
      control.push(
        this.formBuilder.group({
          option: value.option
        })
      );
    });
  }

  onSubmit(data: any) {
    this.submitted = true;

    if (this.questionManagementForm.invalid) {
      this.alertMsg = false;
      return;
    }

    this.alertMsg = true;
    this.questionManagement.id = data.id;
    this.questionManagement.shortName = data.shortName;
    this.questionManagement.groupName = data.groupName;
    this.questionManagement.groupId = data.groupId;
    this.questionManagement.suggestionMark = data.suggestionMark;
    this.questionManagement.timeAllocated = data.timeAllocated;
    this.questionManagement.level = data.level;
    this.questionManagement.type = data.type;
    this.questionManagement.description = data.description;
    this.questionManagement.totalOptions = data.totalOptions;
    this.questionManagement.answer = data.answer;
    this.questionManagement.options = data.options;
    this.questionManagement.modifiedOn = moment().format('DD-MMM-YYYY hh:mm:ss A');
    this.questionManagement.modifiedBy = 'User';


    this.dataService.update(this._id, this.questionManagement).subscribe(() => {
    this.router.navigateByUrl('/question-management');
    });
  }

  onCancel() {
   const modal = this.modelService.createConfirmationModal();
   modal.content.showConfirmationModal('Cancel confirmation', 'Are you sure want to cancel ' + name + '?');

   modal.content.onClose.subscribe((result: boolean) => {
      if (result === true) {
        // when pressed Yes
       this.router.navigateByUrl('/question-management');

      } else if (result === false) {
        // when pressed No
      } else {
        // When closing the modal without no or yes
      }
    });
  }
}
