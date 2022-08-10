const{gql, ApolloServer} = require("apollo-server")

/**
Tipos escalares
* int
* Float
* String
* Boolean
* ID
*/



//Essas são as querys que retornarão as pesquisas, os SCHEMAS!!! Lembre! os schemas devem compor também o campo Query e depois entrar nos resolvers.
const typeDefs= gql`
type Produto {
  id:ID
  nome: String
  valor: Float
}
type Usuario {
  idade: Int
  salario: Float
  nome: String
  ativo: Boolean
  id: ID
  tecnologias: [String!]!
}
  type Query {
    usuarios: [Usuario]
    produtos: [Produto]
    usuario(id: Int, nome: String): Usuario
    produto(id: Int, nome: String): Produto
  }
`;
//Os dados que entrar nos SCHEMAS, devem obrigatoriamente compor a Query acima, ou não aparecerão nas pesquisas.

//as exclamações em tecnologias determinam que os campos não podem ser nulos e devem ser strings.

//dentro dos resolvers, nós precisamos resolver cada query, caso não implementar o resolver, as consultas serão nulas..
// dentro do resolver, devemos ter o mesmo contexto da definição de tipos.
const resolvers= {
  Query: {
    usuarios() {
      return usuarios;
    },
    //implementação de filtro para facilitar busca, assim podemos filtrar procurando por nome ou id. Observe que id tem preferência na busca.
    usuario(_, args){ //args é um objeto que recebera valores de acordo com o que vai ser passado a ele. Observe que o usuario ja foi declarado em Query como it:Int
      const {id, nome} = args;
      if(id) return usuarios.find((usuario) => usuario.id === id);//procurar dentro de usuarios e buscar usuario por id que seja igual ao parâmetro passado na busca.
      return usuarios.find((usuario) => usuario.nome === nome); // caso não for passado id, procurar por nome.
    },
    //filtro para produtos similar ao filtro acima.
    produto(_, args) {
      const {id, nome} = args;
      if(id) return produtos.find((produto) => produto.id === id);
      return produtos.find((produto) => produto.nome === nome);
    },

    produtos() {
      return produtos;
    }
  }
};
 // aqui foram criados arrays de produtos e usuarios para facilitar as buscas. Porém ainda é necessario referência-los nos resolvers. Veja que o mesmo retorna usuarios e produtos.
const produtos = [
     {
     id:1,
     nome: 'Notebook',
     valor: 5200.65
   },
   {
     id:2,
     nome: 'Desktop',
     valor: 9898.23
   }
 ]

 const usuarios = [
   {
     id: 1,
     nome: "Paulo",
     salario: 2500.03,
     ativo: true,
     idade: 28
   },
   {
     id: 2,
     nome: "Lucas",
     salario: 4000.03,
     ativo: true,
     idade: 35
   }
  ]

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
