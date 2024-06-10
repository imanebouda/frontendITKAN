import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GeneralService} from "../../../../services/general/general.service";
import {ProcessusService} from "../../../../services/processus/processus.service";
import {ProcesDocumentsService} from "../../../../services/procesDocuments/procesDocuments.service";
import {PusherService} from "../../../../services/general/pusher.service";
import {MenuVisibilityService} from "../../../../services/dataShared/menu-visibility.service";
import {DataService} from "../../../../services/dataShared/data.service";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment";
import {AuditService} from "../../../../services/AuditServices/audit.service";
import {AuditModel} from "../../../../models/audit.model";
import {ConstatModel} from "../../../../models/constat.model";
import {ConstatService} from "../../../../services/AuditServices/constat.service";
import {Modal} from "bootstrap";

@Component({
    selector: 'app-detail-audit',
    templateUrl: './detail-audit.component.html',
    styleUrls: ['./detail-audit.component.scss']
})
export class DetailAuditComponent  implements  OnInit{
    currentAudit=new AuditModel();
    constats: ConstatModel[] = [];


    addAudit: AuditModel;
    add: AuditModel;

    @ViewChild('updateModal') updateModal: ElementRef;
    @ViewChild('addModal') addModal: ElementRef;


    constructor(
        private  auditService:AuditService,
        private activatedRoute :ActivatedRoute,
        private router : Router,private constatService: ConstatService
    ) {


    }
    ngOnInit() {
        // this.currentAudit=this.auditService.editAudit(this.activatedRoute.snapshot.params['id']);
        this.auditService.editAudit(this.activatedRoute.snapshot.params['id']).subscribe(p=>{
            this.currentAudit=p;
            // this.newCategoryId = this.currentProduct.category?.idCatecory!;
        });
        this.constatService.constatList().subscribe((data: ConstatModel[])=> {
            this.constats = data;
        });
    }



    closeAddDialog(): void {
        const modal = Modal.getInstance(this.addModal.nativeElement);
        modal.hide();
    }


    openAddAuditModal(): void {
        console.log('Add audit:');
        const modal = new Modal(this.addModal.nativeElement);
        modal.show();
    }

    openAddActionModal(): void {
        this.auditService.triggerOpenModal();
    }
}











