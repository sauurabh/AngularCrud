import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icontact } from 'src/app/models/Icontact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: Icontact = {} as Icontact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];


  constructor(private contactService: ContactService, private router: Router) { }
  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data) => {
      this.groups = data;


    }, (error) => {
      this.errorMessage = error;
    })

  }
  public createSubmit() {
    this.contactService.createContact(this.contact).subscribe((data) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    })
  }

}
