import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  configs = {
    isLogin: true,
    actionText: 'SignIn',
    buttonActionText: 'Create account'
  };

  private nameControl = new FormControl('', [Validators.required]);

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      ativo: true,
      nome: ['', [Validators.required]],
      descricao: ['']
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }

  changeAction(): void {
    this.configs.isLogin = !this.configs.isLogin;
    this.configs.actionText = !this.configs.isLogin ? 'SignUp' : 'SignIn';
    this.configs.buttonActionText = !this.configs.isLogin ? 'Already have account' : 'Create account';
    !this.configs.isLogin ? this.loginForm.addControl('periculosidade', this.nameControl) : this.loginForm.removeControl('periculosidade');
  }

  get nome(): FormControl { return this.loginForm.get('nome') as FormControl; }
  get periculosidade(): FormControl {return this.loginForm.get('periculosidade') as FormControl; }

}
