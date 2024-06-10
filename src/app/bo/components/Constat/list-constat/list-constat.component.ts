import { Component } from '@angular/core';
import { ConstatModel } from '../../../../models/constat.model';
import { ConstatService } from '../../../../services/AuditServices/constat.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list-constat',
    templateUrl: './list-constat.component.html',
    styleUrls: ['./list-constat.component.scss']
})
export class ListConstatComponent {
    constats: ConstatModel[] = [];

    constructor(private constatService: ConstatService) { }

    ngOnInit(): void {
        this.constatService.constatList().subscribe((data: ConstatModel[])=> {
            this.constats = data;
        });
    }
}
