import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnquiryService } from '../../../service/enquiry.service';
//import { EnquiryService } from '../../services/enquiry.service';
//import { Enquiryservice } from '../service/enquiryservice';
//import { EnquiryService } from '../../../../service/enquiry.service';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent {
 constructor(private enquiryservice: EnquiryService) {}

  Enquiryform:FormGroup=new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(2)]),
    email:new FormControl("",[Validators.required,Validators.minLength(2)]),
    mobile:new FormControl("",[Validators.required,Validators.minLength(2)]),
    subject:new FormControl("",[Validators.required,Validators.minLength(2)]),
    message:new FormControl("",[Validators.required,Validators.minLength(10)])
  });
  formsvalue:any;
  save() {
  if (this.Enquiryform.valid) {
    this.enquiryservice.submit(this.Enquiryform.value).subscribe({
      next: () => {
        alert("Enquiry Submitted!");
        this.Enquiryform.reset();
      },
      error: () => {
        alert("Failed to submit");
      }
    });
  }
}
}
