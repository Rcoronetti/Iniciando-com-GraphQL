const{gql, ApolloServer} = require("apollo-server")

/**
Tipos escalares
* int
* Float
* String
* Boolean
* ID
*/

//Essas são as querys que retornaram as pesquisas
const typeDefs= gql`
  type Query {
    idade: Int
    salario: Float
    nome: String
    ativo: Boolean
    id: ID
  }
`;
//dentro do resolvers nos precisamos resolver cada query, caso não implementar o resolver, as consultas serão nullas..
// dentro do resolver, devemos ter o mesmo contexto da definição de tipos.
const resolvers= {
  Query: {
    idade() {
      return 18;
    },
    salario() {
      return 1200.00;
    },
    nome() {
      return "Graphql";
    },
    ativo(){
      return true;
    },
    id(){
      return 12345;
    }
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
