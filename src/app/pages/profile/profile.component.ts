import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User = new User();
  disabledForm: boolean = true;

  constructor(private formBuilder: FormBuilder, private cakeService: CakeService) {
    this.profileForm = this.formBuilder.group({
      _id: [0],
      firstName: ['',Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.profileForm.disable();
  }

  onEditForm(): void {
    this.profileForm.enable();
    this.disabledForm = false;
  }

  onCancelForm(): void {
    this.onGetUser();
    this.profileForm.disable();
    this.disabledForm = true;
  }

  onEditUser(): void {
    if(!this.profileForm.valid) return;
    const editedUser = this.profileForm.value;
    this.cakeService.editUser(editedUser).subscribe((value) => {
      this.profileForm.disable();
      this.disabledForm = true;
    });
  }

  onGetUser(): void {
    this.cakeService.getUser().subscribe((value) => {
      if(value !== undefined) {
        const user = new User(...value);
        this.profileForm.patchValue(user);
      }
    });
  }

  ngOnInit(): void {
    this.onGetUser();
  }
}
