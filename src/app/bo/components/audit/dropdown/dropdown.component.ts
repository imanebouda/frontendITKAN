import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuditService } from "../../../../services/AuditServices/audit.service";
import {Modal} from "bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ConstatService} from "../../../../services/AuditServices/constat.service";
import {ConstatModel} from "../../../../models/constat.model";
import {AuditModel} from "../../../../models/audit.model";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit{




    addActionForm: FormGroup;
    typeOptions = [
        { label: 'Curative', value: 'Curative' },
        { label: 'Corrective', value: 'Corrective' }
    ];
    errorMessage: string;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.addActionForm = this.fb.group({
            type: ['', Validators.required],
            libelle: ['', Validators.required],
            detail: ['', Validators.required],
            responsableID: ['', Validators.required],
            assignedToID: [null],
            statusID: ['', Validators.required],
            creationBy: ['', Validators.required],
            creationDate: ['', Validators.required]
        });
    }

    submitForm(): void {
        if (this.addActionForm.valid) {
            console.log(this.addActionForm.value);
            // Submit form data
        } else {
            this.errorMessage = 'Veuillez remplir tous les champs';
        }
    }

}
