import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Attachment')
export class Attachment {
  @JsonProperty('fileName', String)
  fileName: string | undefined = undefined;

  @JsonProperty('contentType', String)
  contentType: string | undefined = undefined;

  @JsonProperty('data', String)
  data: string | undefined = undefined;
}

@JsonObject('QuestionManagementHistory')
export class QuestionManagementHistory {
  @JsonProperty('_id', String)
  _id: string | undefined = undefined;

  @JsonProperty('docType', String)
  docType: string | undefined = undefined;

  @JsonProperty('docId', String)
  docId: string | undefined = undefined;

 @JsonProperty('uploadedBy', String)
  uploadedBy: string | undefined = undefined;

  @JsonProperty('uploadedOn', String)
  uploadedOn: string | undefined = undefined;

  @JsonProperty('attachment', Attachment)
  attachment: Attachment | undefined = undefined;
}
