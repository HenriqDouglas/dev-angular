import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { AUTHENTICATE_USER_MUTATION } from './auth.graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo

  ) {
    this.logarUsuario({login: 'henrique', password: 'programacao'})
    .subscribe(res => console.log('Logar Usuário: ', res));
  }

    logarUsuario(variables: {login: string, password: string}): Observable<{id: string, token: string}> {
        return this.apollo.mutate({
            mutation: AUTHENTICATE_USER_MUTATION,
            variables
        }).pipe(
            map(res => res.data.autenticarUsuario)
        );
    }

}
