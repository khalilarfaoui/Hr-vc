import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/core/services/storage/web.storage';
import { UserService } from 'src/app/core/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public CustomControler: any;
  public subscription: Subscription;
  public Toggledata = true;
  form = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    private storage: WebStorage,
    private userService : UserService,
    private router : Router
  ) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != 0) {
        this.CustomControler = data;
      }
    });
  }



  ngOnInit() {
    this.storage.Checkuser();
    localStorage.removeItem('LoginData');
  }

  submit() {
    // this.storage.Login(this.form.value);
    this.userService.login(this.form.value).subscribe(res=>{
      console.log(res);
      localStorage.clear()
      localStorage.setItem("token" , res.token)
      localStorage.setItem("role" , res.role)
      localStorage.setItem("id" , res.id)
      this.router.navigateByUrl("welcome")

    },err=>{
      Swal.fire({
        title: 'Error !',
        text: `Password or email incorrect`,
        icon: 'error',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
