import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuditModel } from "../../../../models/audit.model";
import { AuditService } from "../../../../services/AuditServices/audit.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Modal } from 'bootstrap';
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-list-audit',
  templateUrl: './list-audit.component.html',
  styleUrls: ['./list-audit.component.scss']
})
export class ListAuditComponent {
  @ViewChild('addAuditModal') addModal: ElementRef;
  @ViewChild('updateAuditModal') updateModal: ElementRef;

  formulaireRecherche: FormGroup;
  typeAuditList: any;
  addAudit: AuditModel;
  selectedAudit: AuditModel;
  audits: AuditModel[] = []; // Initialize as an empty array
  is_loading: boolean = true;

  constructor(
    private auditService: AuditService,
    private fb: FormBuilder
  ) {
    this.formulaireRecherche = this.fb.group({
      typeAudit: [''],
      annee: ['']
    });
  }

  ngOnInit(): void {
    this.loadAudits();
  }

  searchAudits() {
      const formValues = this.formulaireRecherche.value;
      const selectedDate: Date = formValues.annee;
      const selectedType: string = formValues.typeAudit;

      if (selectedDate) {
          // Convertir la date en une chaîne de caractères au format ISO 8601
          const formattedDate: string = selectedDate.toISOString();

          // Appeler la méthode getAuditsByDate du service d'audit en passant la date formatée
          this.auditService.getAuditsByDate(formattedDate).subscribe(
              audits => {
                  this.audits = audits;
                  this.is_loading = false;
              },
              error => {
                  console.error('Error fetching audits by date:', error);
                  this.is_loading = false;
              }
          );
      } else if (selectedType) {
          // Appeler la méthode getAuditsByType du service d'audit en passant le type sélectionné
          this.auditService.getAuditsByType(selectedType).subscribe(
              audits => {
                  this.audits = audits;
                  this.is_loading = false;
              },
              error => {
                  console.error('Error fetching audits by type:', error);
                  this.is_loading = false;
              }
          );
      } else {
          // Si aucun filtre n'est sélectionné, charger tous les audits
          this.loadAudits();
      }
  }

  openAddAuditModal() {
    const modal = new Modal(this.addModal.nativeElement);
    modal.show();
  }

  openUpdateDialog(audit: AuditModel): void {
    console.log('Selected checklist:', audit);
    this.selectedAudit = audit;
    const modal = new Modal(this.updateModal.nativeElement);
    modal.show();
  }

  closeUpdateDialog(): void {
    const modal = Modal.getInstance(this.updateModal.nativeElement);
    modal.hide();
    this.selectedAudit = null;
    this.loadAudits();
  }

  clearSearch() {
      this.formulaireRecherche.reset();
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

  deleteAudit(AuditData: AuditModel): void {
    this.auditService.deleteAudit(AuditData).subscribe(
      response => {
        console.log('Audit deleted successfully', response);
        this.loadAudits(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting Audit', error);
      }
    );
  }

  closeAddAuditDialog(): void {
    const modal = Modal.getInstance(this.addModal.nativeElement);
    modal.hide();
    this.loadAudits();
  }

    protected readonly dateTimestampProvider = dateTimestampProvider;
}
