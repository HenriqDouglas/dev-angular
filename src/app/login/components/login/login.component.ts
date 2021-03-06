import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { takeWhile } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorService } from 'src/app/core/services/error.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;

    configs = {
        isLogin: true,
        isLoading: false,
        actionText: 'Login',
        buttonActionText: 'Não possui conta'
    };

    private emailControl = new FormControl('', [Validators.required, Validators.email]);
    private alive = true;

    constructor(
        private authService: AuthService,
        private errorService: ErrorService,
        private formBuilder: FormBuilder,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm(): void {
        this.loginForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    onSubmit(): void {
        console.log(this.loginForm.value);

        this.configs.isLoading = true;

        const operation =
            (this.loginForm)
                ? this.authService.logarUsuario(this.loginForm.value)
                : this.authService.logarUsuario(this.loginForm.value);

        operation
        .pipe(
            takeWhile(() => this.alive)
        ).subscribe(
            res => {
                console.log('redirecionando... ', res);
                this.configs.isLoading = false;
            },
            err => {
                console.log(err);
                this.configs.isLoading = false;
                this.snackbar.open(this.errorService.getErrorMessage(err), 'Okay', {duration: 5000, verticalPosition: 'top'} );
            },
            () => console.log('Observable copletado')
        );

    }

    changeAction(): void {
        this.configs.isLogin = !this.configs.isLogin;
        this.configs.actionText = !this.configs.isLogin ? 'Cadastrar' : 'Login';
        this.configs.buttonActionText = !this.configs.isLogin ? 'Já possui conta' : 'Não possui conta';
        !this.configs.isLogin ?
            this.loginForm.addControl('email', this.emailControl) :
            this.loginForm.removeControl('email');
    }

    get email(): FormControl { return this.loginForm.get('email') as FormControl; }
    get login(): FormControl { return this.loginForm.get('login') as FormControl; }
    get password(): FormControl { return this.loginForm.get('password') as FormControl; }

    ngOnDestroy(): void {
        this.alive = false;
    }

}
