/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  // component
  questionManagementForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  options: FormArray = new FormArray([]);
  optionsData: any[] = [];

  types: boolean | undefined = undefined;
  selectedValue: string | undefined = undefined;

   constructor(
     private route: ActivatedRoute,
     private formBuilder: FormBuilder,
     private dataService: DataService) {}

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('viewId')) {
      const viewId = this.route.snapshot.queryParamMap.get('viewId');
      this.getEventDetailsById(viewId);
    }

    this.questionManagementForm = this.formBuilder.group({
      id: [''],
      shortName: [''],
      groupName: [''],
      groupId: [''],
      suggestionMark: [''],
      timeAllocated: [''],
      level: [''],
      type: [''],
      description: [''],
      totalOptions: [''],
      answer: [''],
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

  getEventDetailsById(_id: any) {
    this.dataService.get(_id).subscribe((data: any) => {
      this.updateEditView(data);
    });
  }

  updateEditView(view: any) {
    this.optionsData =  view.options;
    this.questionManagementForm.patchValue({
      id: view.id,
      shortName: view.shortName,
      groupName: view.groupName,
      groupId: view.groupId,
      suggestionMark: view.suggestionMark,
      timeAllocated: view.timeAllocated ,
      level: view.level,
      type: view.type,
      description: view.description,
      totalOptions: view.totalOptions ,
      answer: view.answer,
      options: view.options
    });
    this.patchResult();
    this.checkType(view.type);
  }

  checkType(data: any) {
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
}
