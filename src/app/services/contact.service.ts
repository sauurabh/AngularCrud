import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Icontact } from '../models/Icontact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private serverUrl: string = `http://localhost:9000`;

  constructor(private httpClient: HttpClient) { }
  //get all contacts
  public getAllContacts(): Observable<Icontact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<Icontact[]>(dataUrl).pipe(catchError(this.handleError));

  }
  //single contact

  public getContact(contactId: string): Observable<Icontact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`
    return this.httpClient.get<Icontact>(dataUrl).pipe(catchError(this.handleError));

  }
  //create contact
  public createContact(contact: Icontact): Observable<Icontact> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<Icontact>(dataUrl, contact).pipe(catchError(this.handleError));

  }
  //update contact
  public updateContact(contact: Icontact, contactId: string): Observable<Icontact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<Icontact>(dataUrl, contact).pipe(catchError(this.handleError));

  }
  //delete contact
  public deleteContact(contactId: string): Observable<{}> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }
  //Get all the groups
  public getAllGroups(): Observable<IGroup[]> {
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));

  }
  //single group
  public getGroup(contact: Icontact): Observable<IGroup> {
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));

  }


  //error handeling
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error:${error.error.message}`
    }
    else {
      errorMessage = `Status:${error.status}\n Message:${error.message}`;

    }
    return throwError(errorMessage);
  }
}
