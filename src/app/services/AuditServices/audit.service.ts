import { Injectable } from '@angular/core';
import {AuditModel} from "../../models/audit.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
const httpOptions ={
    headers:new HttpHeaders({
        'content-Type':'application/json'
    })

};
@Injectable({
  providedIn: 'root'
})
export class AuditService {
    private apiUrl = 'https://localhost:44305/api/Audit';
    private apiauth='https://localhost:44305/api/Auth/GetAllAuditeur'




    audits :AuditModel[];
  audit! :AuditModel;
  constructor(private http: HttpClient) {

  }
  auditList(){
    //return this.audits;
     // return this.http.get<AuditModel[]>(this.apiUrl+"/audits", httpOptions);}
      return this.http.get<AuditModel[]>(this.apiUrl);}


  addAudit(newAudit : AuditModel){
      console.log('creation audit',newAudit);
   // this.audits.push(newAudit);
      //return this.http.post<ProductModel>(this.apiURL+"/products/save",product,httpOptions);
      return this.http.post<AuditModel>( this.apiUrl, newAudit);

  }
    /*deleteAudit(id: number){
    //const index =this.audits.indexOf(audit,0);
    //this.audits.splice(index,1);
        console.log('supression d audit');
        //const url = `${this.apiUrl}/${id}`;
        return this.http.delete<AuditModel>(`${this.apiUrl}/${id}`);
}*/
/*2
    deleteAudit(auditData: AuditModel) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<AuditModel>(`${this.apiUrl}/DeleteAudit`, auditData, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
*/
    deleteAudit(auditData: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<any>(`${this.apiUrl}/DeleteAudit`, auditData, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error);
    }
    /*deleteAudit(auditData: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<any>(`${this.apiUrl}/DeleteAudit`, auditData, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(error);
    }*/
    /*deleteAudit(id: number){
        //const url = `${this.apiUrl}/Audit/Delete`;
        //return this.http.post<any>(url, { id: id });

            const url = `${this.apiUrl}/DeleteAudit`;
            return this.http.post<any>,(url);

    }*/

    /*


    deleteAudit(id: number){
        const url = `${this.apiUrl}/Delete`;
        return this.http.post<any>(url, {});
    }
    deleteAudit(id: number) {
        console.log('supression d audit');
        //return this.http.delete<any>(`${this.apiUrl}/${id}`);
        return this.http.post<any>(`${this.apiUrl}/Delete`);
    }*/
   editAudit(id:number){
      //this.audit=this.audits.find(p=> p.id==id)!;
      //return this.audit;
       return this.http.get<AuditModel>(`${this.apiUrl}/${id}`);

   }
   /*updateAudit(id: number, newAudit: AuditModel) {
      //this.deleteAudit(audit);
      //this.addAudit(audit);

       return this.http.put<any>(this.apiUrl, newAudit);


   }*/
   updateAudit(id: number, newAudit: AuditModel) {
    console.log('update audit', newAudit);
    return this.http.put<any>(`${this.apiUrl}/${id}`, newAudit, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }


    getAuditsByDate(date:string) {
        const parsedDate = new Date(date);
        const formattedDate = parsedDate.toISOString();
        return this.http.get<AuditModel[]>(`${this.apiUrl}/byDate?date=${formattedDate}`);


    }


    getAuditsByType(type: string) {
        return this.http.get<AuditModel[]>(`${this.apiUrl}/byType?type=${type}`);
    }


    GetAllAuditeur(){
        return this.http.get<any>(this.apiauth);

    }





}
