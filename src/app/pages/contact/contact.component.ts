import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private cakeService: CakeService, private router: Router) {
    this.contactForm = this.formBuilder.group({
      _id: [0],
      name: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      
    });
  }

  onSubmit(): void {
    if(!this.contactForm.valid) return;
    const messageForm = this.contactForm.value;
    const newMessage = new Message(messageForm);
    this.cakeService.sendMessage(newMessage).subscribe((value) => {
      this.contactForm.reset();
      this.router.navigate(['/cakes']);
    });
  
  }

  onGetUser(): void {
    this.cakeService.getUser().subscribe((value) => {
      if(value !== undefined) {
        const user = new User(...value);
        this.contactForm.patchValue({
          _id: user._id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          message: '' 
        });
      }
    });
  }

  ngOnInit(): void {
    this.onGetUser();
  }
}
