import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://qlttestproject.hasura.app/v1/graphql'; // <-- add the URL of the GraphQL server here

const headers = new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`) 


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  
  const http = httpLink.create({
    uri, 
    headers,
  });

  const httpGuest = httpLink.create({
      uri, 
  }) ;
  
 
  return {
    link: localStorage.getItem('token') ? http : httpGuest,
    cache: new InMemoryCache(),
    
  };
}


@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {

}
