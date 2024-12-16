import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { WebStorage } from "src/app/core/services/storage/web.storage";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;

  form = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    role: new FormControl("CONDICAT"),
    phoneNumber: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage , private authService : UserService , private router : Router) {
    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  ngOnInit() {}

  submit() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      this.isvalidconfirmpassword = true;
    } else {
      this.isvalidconfirmpassword = false;
      const { confirmPassword, ...userData } = this.form.value; // Exclude confirmPassword
      this.authService.addUser2(userData).subscribe(res=>{
        this.router.navigateByUrl('login')
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
