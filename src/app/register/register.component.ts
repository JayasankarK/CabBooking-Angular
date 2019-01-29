import { Component, OnInit } from '@angular/core';
import { CabserviceService } from '../cabservice.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user-model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
    submitted = false;
    loading = false;
  constructor(private cabService: CabserviceService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      empid: ['', Validators.required],
      mob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.registerForm.controls; }
  

onAddUser(form: NgForm){
  this.submitted=true;
  if (this.registerForm.invalid) {
    return;
}
  const user: User = {
    name: form.value.name,
    empid: form.value.empid,
    password: form.value.pwd,
    mobno: form.value.mob,
    emailid: form.value.email
  }
  this.cabService.addUser(user).subscribe(
    (response) => {
      alert("Succesfuly registered the user");
      this.router.navigate(['/']);
    },
    (error) => {
      console.log(error);
      alert("Sorry, could not register the user");
    }
  );
}

}
