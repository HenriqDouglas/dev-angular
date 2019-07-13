import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private apollo: Apollo
  ) {
    // this.createCargo();
    // this.allCargos();
  }

  allCargos(): void {

    this.apollo.query({
      query: gql `
        query{
          allCargos{
            data{
              nome
            }
          }
        }
      `
    }).subscribe(res => console.log('Query: ', res));

  }

  createCargo(): void {

    this.apollo.mutate({
      mutation: gql `
        mutation CriarNovoCargo($nome: String!, $descricao: String, $ativo: Boolean!) {
          novoCargo (
            nome: $nome,
            descricao: $descricao
            ativo: $ativo
            )
        }
      `, variables: {
        nome: 'Func Tester',
        descricao: 'Teste',
        ativo: true
      }
    }).subscribe(res => console.log('Mutation: ', res));

  }

}
