import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { WebStorage } from "src/app/core/services/storage/web.storage";
import { UserService } from "src/app/core/services/user/user.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });
  public CustomControler: any;
  public subscription: Subscription | any;

  constructor(private userService : UserService , private router : Router) { }
  get f() {
    return this.form.controls;
  }
  ngOnInit() {}
  submit() {
    console.log(this.form.value);
    this.userService.forgetPassword(this.form.value.email).subscribe(res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Check your email",
        timer: 1500,
      }).then(() => {
        this.router.navigateByUrl("/login")
      });
    })
  }
}
