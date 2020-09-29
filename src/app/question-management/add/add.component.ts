// import { HttpClient } from '@angular/common/http';
/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationModalService } from '../../lib/components/confirmation/confirmation-modal-service';
import { DataService } from '../data.service';
import { QuestionManagementObjectBuilder } from '../question-management-object-builder';
import { QuestionManagement } from '../question-management.model';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  // component
  options: FormArray = new FormArray([]);

  questionManagementForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  types: boolean  | undefined = undefined;
  selectedValue: string | undefined = undefined;
  levelList: string[] = ['Simple', 'Medium', 'Complex'];
  typeList: string[] = ['Fill in the Blank', 'Match the Following', 'Multiple Choice', 'True or False'];
  count: any;
  alertMsg: boolean | undefined = undefined;

   // id generation
  idPrefix: string = '';
  autoId: string = '';


  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private modelService: ConfirmationModalService) {}


  ngOnInit() {

     this.dataService.getAll().subscribe((response: any) => {
      const idLength = response.length + 1;
      this.autoId = this.idPrefix + '' + idLength;
      this.setPatchvalue(this.autoId);
      });

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
      totalOptions: [''],
      answer: ['', Validators.required],
      options: this.formBuilder.array([])
    });

  }

    setPatchvalue( data: any ) {
     this.questionManagementForm.patchValue({
       id: data
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
      for (let i = 0; i < this.count; i++) {
        this.options = this.questionManagementForm.controls.options as FormArray;
        this.options.push(this.createOptions());
      }
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

  onSubmit(data: any) {
    this.submitted = true;

    if (this.questionManagementForm.invalid) {
      this.alertMsg = false;
      return;
    }

    this.alertMsg = true;
    const questionManagement: QuestionManagement = QuestionManagementObjectBuilder.create(data, this.autoId);
    this.dataService.create(questionManagement).subscribe(() => {});
    this.router.navigateByUrl('/question-management');
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
