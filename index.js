const { ApolloServer } = require("apollo-server");
const graphql = require("./src/graphql");

const server = new ApolloServer({
  ...graphql,
//isolando o erro e retornando mensagem pre definida(erro sobre usuario duplicado tratado no resolver do Usuario)
  formatError: (err) => {
    if(err.message.startsWith('Usuario existente:')) {
      return new Error (err.message);
    }
    return err;
  },
});

server.listen().then(({ url }) => console.log(url));
