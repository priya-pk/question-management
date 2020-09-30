/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DbService } from '../services/db.service';

import { QuestionManagementConstant } from './question-management-constant';
import { QuestionManagementHistoryConstant } from './question-management-history-constant';
import { QuestionManagementHistory } from './question-management-history.model';
import { QuestionManagement } from './question-management.model';


@Injectable()
export class DataService {
  constructor(private dbService: DbService) {}

  getAll(): Observable<any> {
    return new Observable(observer => {
      this.dbService.getAll(QuestionManagementConstant.KEY_DOC_TYPE, QuestionManagementConstant.DOC_TYPE).subscribe(
        (result: any) => {
          observer.next(result);
        },
        (error: any) => {
          console.error('Error in getting all document:', error);
          observer.next(error);
        }
      );
    });
  }

  getAllQuestionHistory(): Observable<any> {
    return new Observable(observer => {
      this.dbService.getAll(QuestionManagementHistoryConstant.KEY_DOC_TYPE, QuestionManagementHistoryConstant.DOC_TYPE).subscribe(
        (result: any) => {
          observer.next(result);
        },
        (error: any) => {
          console.error('Error in getting all document:', error);
          observer.next(error);
        }
      );
    });
  }

  get(_id: string): Observable<any> {
    return new Observable(observer => {
      this.dbService.get(_id).subscribe(
        (result: any) => {
          observer.next(result);
        },
        (error: any) => {
          console.error('Error in getting document:', error);
          observer.next(error);
        }
      );
    });
  }

  create(questionManagement: QuestionManagement): Observable<any> {
    const data = JSON.parse(JSON.stringify(questionManagement));
    return new Observable(observer => {
      this.dbService.create(data).subscribe(
        (result: any) => {
          observer.next(result);
        },
        (error: any) => {
          console.error('Error in creating document:', error);
          observer.next(error);
        }
      );
    });
  }

  createQuestionHistory(questionManagementHistory: QuestionManagementHistory): Observable<any> {
    const data = JSON.parse(JSON.stringify(questionManagementHistory));
    return new Observable(observer => {
      this.dbService.create(data).subscribe(
        (result: any) => {
          observer.next(result);
        },
        (error: any) => {
          console.error('Error in creating document:', error);
          observer.next(error);
        }
      );
    });
  }

  delete(_id: string): Observable<any> {
    return new Observable(observer => {
      this.dbService.remove(_id).subscribe(
        (result: any) => {
          observer.next(result);
        },
        (error: any) => {
          console.error('Error in deleting document:', error);
          observer.next(error);
        }
      );
    });
  }

  update(_id: string, questionManagement: QuestionManagement): Observable<any> {
    const data = JSON.parse(JSON.stringify(questionManagement));
    return new Observable(observer => {
      this.dbService.update(data).subscribe(
        (result: any) => {
          observer.next(result);
        },
        (error: any) => {
          console.error('Error in updating document:', error);
          observer.next(error);
        }
      );
    });
  }

}
