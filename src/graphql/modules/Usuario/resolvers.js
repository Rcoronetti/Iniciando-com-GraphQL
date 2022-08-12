const db = require("../../../db");

function geradorDeId(lista) {
  let novoId;
  let ultimo = lista[lista.length - 1];
  if (!ultimo) {
    novoId = 0;
  } else {
    novoId = ultimo.id;
  }

  return ++novoId;
}

module.exports = {
  Usuario: {
    perfil(usuario) {
      return db.perfis.find((p) => p.id === usuario.perfil_id);
    },
  },
  Query: {
    usuario(_, args) {
      return db.usuarios.find((db) => db.id === args.id);
    },
    usuarios: () => db.usuarios,
  },
  Mutation: {
    deletarUsuario (_, { filtro: { id, email } }) {
      if (id) {
      const usuarioEncontrado = db.usuarios.find(u => u.id === id)
      db.usuarios = db.usuarios.filter(u => u.id !== id)

    return !! usuarioEncontrado;
  } else {
    const usuarioEncontrado = db.usuarios.find(u => u.email === email)
    db.usuarios = db.usuarios.filter(u => u.email !== email)

    return !! usuarioEncontrado;
  }

    },

    criarUsuario(_, { data }) {
      const { email } = data;

      const usuarioExistente = db.usuarios.some((u) => u.email === email);

      if (usuarioExistente) {
        throw new Error(`Usuário Existente: ${data.nome}`);
      }

      const novoUsuario = {
        ...data,
        id: geradorDeId(db.usuarios),
        perfil_id: 2,
      };

      db.usuarios.push(novoUsuario);

      return novoUsuario;
    },
    atualizarUsuario(_, { id, data }) {
      const usuario = db.usuarios.find((u) => u.id === id);
      const indice = db.usuarios.findIndex((u) => u.id === id);

      const novoUsuario = {
        ...usuario,
        ...data,
      };

      db.usuarios.splice(indice, 1, novoUsuario);

      return novoUsuario;
    },
  },
};
