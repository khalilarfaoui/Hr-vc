import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  id = localStorage.getItem("id")
  public changePassword: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private userService : UserService,
    private router : Router
  ) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }


  ngOnInit() {
    this.changePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

  changePass(){
    var obj = {
      password : this.changePassword.value.newPassword ,
      confirmation : this.changePassword.value.confirmPassword
    }
    this.userService.changePassword(this.id , obj).subscribe(res=>{
      localStorage.clear()
      this.router.navigateByUrl("/login")
    })
  }
}
