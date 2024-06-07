import { Component } from '@angular/core';
import {ProgrammeAuditService} from "../../../../services/AuditServices/programme-audit.service";
import {ProgrammeAuditModel} from "../../../../models/ProgrammeAudit";
import {AuditModel} from "../../../../models/audit.model";
import {AuditService} from "../../../../services/AuditServices/audit.service";

@Component({
  selector: 'app-programme-audit',
  templateUrl: './programme-audit.component.html',
  styleUrls: ['./programme-audit.component.scss']
})
export class ProgrammeAuditComponent {
    audits: AuditModel[] = [];
    programmeAudits: ProgrammeAuditModel[] = [];
    selectedAuditId: number | undefined;
    is_loading: boolean = false;

    constructor(
        private auditService: AuditService,
        private programmeAuditService: ProgrammeAuditService
    ) { }

    ngOnInit(): void {
        this.loadAudits();
    }

    loadAudits(): void {
        this.auditService.auditList().subscribe(
            audits => {
                this.audits = audits;
                this.is_loading = false;
            },
            error => {
                console.error('Error fetching Audits:', error);
                this.is_loading = false;
            }
        );
    }


    onAuditChange(): void {
        if (this.selectedAuditId) {
            this.loadProgrammeAuditsForAudit(this.selectedAuditId);
        } else {
            this.programmeAudits = []; // Efface les données précédentes si aucun audit sélectionné
        }
    }

    loadProgrammeAuditsForAudit(auditId: number): void {
        this.is_loading = true;
        this.programmeAuditService.getProgrammeAuditsForAudit(auditId)
            .subscribe(programmeAudits => {
                this.programmeAudits = programmeAudits;
                this.is_loading = false;
            });
    }
}

