import gql from 'graphql-tag';

export const AUTHENTICATE_USER_MUTATION = gql `
    mutation autenticarUsuario($login: String!, $password: String!){
        autenticarUsuario(login: $login, password: $password){
            token
            usuario{id}
        }
    }
`;
