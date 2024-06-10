import {Component, ElementRef, OnInit} from '@angular/core';
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
import { AuditService } from 'src/app/services/AuditServices/audit.service';
import {AuditModel} from "../../../../models/audit.model";

@Component({
    selector: 'app-detail-audit',
    templateUrl: './detail-audit.component.html',
    styleUrls: ['./detail-audit.component.scss']
})
export class DetailAuditComponent  implements  OnInit{
    currentAudit=new AuditModel();

    constructor(
        private  auditService:AuditService,
        private activatedRoute :ActivatedRoute,
        private router : Router
    ) {


    }
    ngOnInit() {
        // this.currentAudit=this.auditService.editAudit(this.activatedRoute.snapshot.params['id']);
        this.auditService.editAudit(this.activatedRoute.snapshot.params['id']).subscribe(p=>{
            this.currentAudit=p;
            // this.newCategoryId = this.currentProduct.category?.idCatecory!;
        });
    }
}










