/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */
import { Component, ViewChild} from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// import moment from 'moment';
import * as moment from 'moment';
import * as UUID from 'uuid';
import { DataService } from '../data.service';

import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { CsvFileParser } from '../../utils/csv-file-parser';
import { QuestionManagementHistoryConstant } from '../question-management-history-constant';
import { Attachment, QuestionManagementHistory } from '../question-management-history.model';
import { QuestionManagementObjectBuilder } from '../question-management-object-builder';
import { QuestionManagement } from '../question-management.model';
import { ValidationUtil } from './validation.util';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  dataList: any[] = [];
  invalidData: any[] = [];
  selectedFile: any | undefined = undefined;
  uploadData: string[] | undefined = undefined;
  uplodedBy: string | undefined = undefined;
  selectedTab = new FormControl(0);

  dataSource: QuestionManagement[] = [];
  templateURL = './assets/data/question_management_template.csv';

   // pagination
  page: number = 1;


  @ViewChild('tabset', { static: true }) tabset: TabsetComponent | null = null;


  constructor(private router: Router, private dataService: DataService) {}
  ngOnInit() { }
  onFileChange(value: any) {
    this.selectedFile = value.target.files[0];
    this.handleFileInput(value);
  }

  handleFileInput(value: any) {
    const fileToUpload: File = value.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.uploadData = event.target.result;
    };
    reader.readAsDataURL(fileToUpload);
  }

  uploadFile(id: number) {
    const parser: CsvFileParser = new CsvFileParser(this.pushDataCallback);
    parser.parseFile(this.selectedFile);
      // @ts-ignore TS2322
    this.tabset.tabs[id].active = true;
  }

  pushDataCallback = (dataArray: Array<any>) => {
      for (const data of dataArray) {
        if (!ValidationUtil.isEmpty(data['Id'])) {
          this.invalidData.push(data);
          continue;
      }
        if (!ValidationUtil.isEmpty(data['Short Name'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Group Name'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Group Id'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Suggestion Mark'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Time Allocated'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Level'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['type'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Description'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Total Options'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Answer'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Option 1'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Option 2'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Option 3'])) {
        this.invalidData.push(data);
        continue;
      }
        if (!ValidationUtil.isEmpty(data['Option 4'])) {
        this.invalidData.push(data);
        continue;
      }

        this.dataList.push(data);
    }
      this.dataSource = this.dataList;
      this.selectedTab = new FormControl(1);
   };

  uploadView() {
    this.selectedTab = new FormControl(0);
  }

  onSave() {
      const referenceId = UUID.v4();
      const  user = 'chandru';

      for (const data of this.dataList) {
       const questionManagement: QuestionManagement = QuestionManagementObjectBuilder.upload(data);
       this.dataService.create(questionManagement).subscribe(() => {});
      }

      const history: QuestionManagementHistory = new QuestionManagementHistory();
      const attachment: Attachment = new Attachment();
      history._id = referenceId;
      history.docType = QuestionManagementHistoryConstant.DOC_TYPE;
      history.docId = referenceId;
      // @ts-ignore TS2322
      attachment.data = this.uploadData;
      attachment.fileName = this.selectedFile.name;
      attachment.contentType = this.selectedFile.type;
      history.uploadedBy = user;
      history.uploadedOn = moment().format('D-MMM-YYYY HH:mm:ss Z');
      history.attachment = attachment;

      this.dataService.createQuestionHistory(history).subscribe(() => {
      this.router.navigate(['/question-management']);
    });
  }

  getExportCsv() {
    const ignoreHeaders = ['docId', '_id', 'docType', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn'];
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: ['Id', 'Short Name', 'Group Name', 'Group Id', 'Suggestion Mark', 'Time Allocated', 'Level', 'type', 'Description', 'Total Options', 'Answer', 'Option 1', 'Option 2', 'Option 3', 'Option 4']
    };
    if (this.invalidData.length > 0) {
      const NearMissKey = Object.keys(this.invalidData[0]).filter(
        a => ignoreHeaders.indexOf(a) === -1
      );
      const data = this.invalidData.map((nearMiss: any) => {
        return NearMissKey.map((index: any) => {
          return nearMiss[index];
        });
      });

      const download = new Angular5Csv(
        data,
        'Customer-invalid-data',
        options
      );
      console.log('Download Succesfully', download);
    } else {
      alert('No data invalid data');
    }
  }
}


