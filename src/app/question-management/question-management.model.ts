/*
 * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
 */

import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('QuestionManagement')
export class QuestionManagement {
  // @JsonProperty('_id', String)
  // _id: string | undefined = undefined;

  // @JsonProperty('docType', String)
  // docType: string | undefined = undefined;

  // @JsonProperty('docId', String)
  // docId: string | undefined = undefined;

  @JsonProperty('id', String)
  id: string | undefined = undefined;

  @JsonProperty('shortName', String)
  shortName: string | undefined = undefined;

  @JsonProperty('groupName', String)
  groupName: string | undefined = undefined;

  @JsonProperty('groupId', String)
  groupId: string | undefined = undefined;

  @JsonProperty('suggestionMark', String)
  suggestionMark: string | undefined = undefined;

  @JsonProperty('timeAllocated', String)
  timeAllocated: string | undefined = undefined;

  @JsonProperty('level', String)
  level: string | undefined = undefined;

  @JsonProperty('type', String)
  type: string | undefined = undefined;

  @JsonProperty('description', String)
  description: string | undefined = undefined;

  @JsonProperty('totalOptions', String)
  totalOptions: string | undefined = undefined;

  @JsonProperty('options', String)
  options: string | undefined = undefined;

  @JsonProperty('answer', String)
  answer: string | undefined = undefined;

  @JsonProperty('option1', String)
  option1: string | undefined = undefined;

  @JsonProperty('option2', String)
  option2: string | undefined = undefined;

  @JsonProperty('option3', String)
  option3: string | undefined = undefined;

  @JsonProperty('option4', String)
  option4: string | undefined = undefined;

  @JsonProperty('createdBy', String)
  createdBy: string | undefined = undefined;

  @JsonProperty('createdOn', String)
  createdOn: string | undefined = undefined;

  @JsonProperty('modifiedBy', String, true)
  modifiedBy: string | undefined = undefined;

  @JsonProperty('modifiedOn', String, true)
  modifiedOn: string | undefined = undefined;

}
