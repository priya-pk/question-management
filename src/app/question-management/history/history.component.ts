import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { mapJsonToObject } from '../../utils/json2object';

import { QuestionManagementHistory } from '../question-management-history.model';


declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  // pagination for grid
  questionManagementList: QuestionManagementHistory[] = [];
  searchText: string | undefined = undefined;
  page: number = 1;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getAllQuestionManagementHistory();
  }

  getAllQuestionManagementHistory() {
    this.dataService.getAllQuestionHistory().subscribe((result: any) => {
      const data = mapJsonToObject(result, QuestionManagementHistory) ;
      this.questionManagementList = data;
    });
  }

  csvDownload(data: any) {
    const fileName = 'Question Management.csv';
    FileSaver.saveAs( data, fileName);
   }

  refreshPage() {
    this.getAllQuestionManagementHistory();
  }
}
