import { TypeCheckListModel } from "./type-check-list.model";

export class QuestionModel{
    id !: number ;
    name !: string;
    niveau !: string;
    code !: string;
    description !: string;
    typechecklist_id !: number;
    //Audit?: AuditModel;
    typeCheckListAudit?: TypeCheckListModel;

}