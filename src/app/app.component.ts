import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private apollo: Apollo
  ) {
    this.allCargos();
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

}
