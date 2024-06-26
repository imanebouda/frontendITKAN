import { TypeAuditModel } from './type-audit.model';
import { SmqModel } from './smq.model';
import { ProcessusModel } from './processus.model';

export interface ChecklistModel {
    id: number;
    typeAuditId: number;
    typeAudit: TypeAuditModel;
    smQ_ID: number;
    smq: SmqModel;
    processusID: number;
    processus: ProcessusModel;
}
