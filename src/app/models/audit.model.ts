
import { TypeAuditModel } from "./type-audit.model";

export class AuditModel{
    id !: number ;
    nomAudit !: string;
    dateAudit !: Date ;
    status !: string;
    description !: string;
    typeaudit_id !: number;
    //Audit?: AuditModel;
    typeAudit?: TypeAuditModel;


}
