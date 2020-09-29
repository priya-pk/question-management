/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

// import moment from 'moment';
import * as moment from 'moment';
import * as UUID from 'uuid';

import { QuestionManagementConstant } from './question-management-constant';
import { QuestionManagement } from './question-management.model';

export class QuestionManagementObjectBuilder {
  constructor() {}
  public static create(data: any, id: any): QuestionManagement {
    // const referenceId = UUID.v4();
    const questionManagement: QuestionManagement = new QuestionManagement();

    // questionManagement._id = referenceId;
    // questionManagement.docType = QuestionManagementConstant.DOC_TYPE;
    // questionManagement.docId = referenceId;
    // questionManagement.id = id;
    questionManagement.shortName = data.shortName;
    questionManagement.groupName = data.groupName;
    questionManagement.groupId = data.groupId;
    questionManagement.suggestionMark = data.suggestionMark;
    questionManagement.timeAllocated = data.timeAllocated;
    questionManagement.level = data.level;
    questionManagement.type = data.type;
    questionManagement.description = data.description;
    questionManagement.totalOptions = data.totalOptions;
    questionManagement.answer = data.answer;
    questionManagement.options = data.options;
    questionManagement.createdBy = 'User';
    questionManagement.createdOn = moment().format('DD-MMM-YYYY hh:mm:ss A');


    return questionManagement;
  }

  public static upload(data: any): QuestionManagement {
   const questionManagement: QuestionManagement = new QuestionManagement();
   const referenceId = UUID.v4();
  //  questionManagement._id = referenceId;
  //  questionManagement.docType = QuestionManagementConstant.DOC_TYPE;
  //  questionManagement.docId = referenceId;
   questionManagement.id = data['Id'];
   questionManagement.shortName = data['Short Name'];
   questionManagement.groupName = data['Group Name'];
   questionManagement.groupId = data['Group Id'];
   questionManagement.suggestionMark = data['Suggestion Mark'];
   questionManagement.timeAllocated = data['Time Allocated'];
   questionManagement.level = data['Level'];
   questionManagement.type = data['type'];
   questionManagement.description = data['Description'];
   questionManagement.totalOptions = data['Total Options'];
   questionManagement.answer = data['Answer'];
   questionManagement.option1 = data['Option1'];
   questionManagement.option2 = data['Option2'];
   questionManagement.option3 = data['Option3'];
   questionManagement.option4 = data['Option4'];

   return questionManagement;
  }

}
