import {
  enablePromise,
  openDatabase,
  DEBUG,
} from "react-native-sqlite-storage";

DEBUG(true);
enablePromise(true);

// Criação e conexão do banco de dados.
export async function getConnection() {
  return await openDatabase({ name: "imobiliaria", location: "default" })
    .then((res) => console.log("Pode cre"))
    .catch((err) => console.error(err));
}

// Função para criar a tabela do banco de dados.
export async function createTables() {
  const db = await getConnection();
  const query = `CREATE TABLE IF NOT EXISTS imoveis (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipoContrato VARCHAR(10),
        tipoImovel VARCHAR(15),
        enderecoImovel VARCHAR(150),
        valor FLOAT,
        valorCondominio FLOAT,
        numeroQuartos INTEGER,
        numeroBanheiros INTEGER,
        fotoImovel VARCHAR,
        statusLocacao BOOLEAN
        )`;
  await db
    .executeSql(query)
    .then((response) => console.warn(response))
    .catch((erro) => console.warn(erro));
  await db.close();
}

// Função para adicionar um novo imóvel no banco de dados.
export async function dbAddImovel(imovel) {
  const db = await getConnection();
  const query = `
      INSERT INTO imoveis(
        tipoContrato,
        tipoImovel,
        enderecoImovel,
        valor,
        valorCondominio,
        numeroQuartos,
        numeroBanheiros,
        fotoImovel,
        statusLocacao)
      VALUES ("${imovel.tipoContrato}", "${imovel.tipoImovel}", "${imovel.enderecoImovel}",
              ${imovel.valor}, ${imovel.valorCondominio},
              ${imovel.numeroQuartos}, ${imovel.numeroBanheiros}, "${imovel.fotoImovel}", ${imovel.statusLocacao})
  `;
  await db
    .executeSql(query)
    .then((response) => console.warn("Adicionado: " + JSON.stringify(response)))
    .catch((erro) => console.warn("Erro: " + JSON.stringify(erro)));
  await db.close();
}

// Função para editar um imóvel no banco de dados.
export async function dbEditarImovel(imovel) {
  const db = await getConnection();
  const query = `
      UPDATE imoveis
      SET
        tipoContrato = "${imovel.tipoContrato}",
        tipoImovel = "${imovel.tipoImovel}",
        enderecoImovel = "${imovel.enderecoImovel}",
        valor = ${imovel.valor},
        valorCondominio = ${imovel.valorCondominio},
        numeroQuartos = ${imovel.numeroQuartos},
        numeroBanheiros = ${imovel.numeroBanheiros},
        fotoImovel = "${imovel.fotoImovel}",
        statusLocacao = ${imovel.statusLocacao}
        WHERE id = ${imovel.id};
  `;
  await db
    .executeSql(query)
    .then((response) => console.warn("Editado: " + JSON.stringify(response)))
    .catch((erro) => console.warn("Erro: " + JSON.stringify(erro)));
  await db.close();
}

// Função para resgatar um único imóvel pelo ID.
export async function getImovelById(idImovel) {
  const db = await getConnection();
  let imovel;
  const query = `
      SELECT * FROM imoveis WHERE id = ${idImovel}
  `;
  await db
    .executeSql(query)
    .then((response) => {
      imovel = response[0];
    })
    .catch((erro) => console.warn("Erro: " + JSON.stringify(erro)));
  await db.close();
  return imovel;
}

// Função para excluir um imóvel no banco de dados.
export async function dbExcluirImovel(idImovel) {
  const db = await getConnection();
  const query = `
      DELETE FROM imoveis WHERE id = ${idImovel}(
        tipoContrato,
        tipoImovel,
        enderecoImovel,
        valor,
        valorCondominio,
        numeroQuartos,
        numeroBanheiros,
        fotoImovel,
        statusLocacao)
      VALUES ("${imovel.tipoContrato}", "${imovel.tipoImovel}", "${imovel.enderecoImovel}",
              ${imovel.valor}, ${imovel.valorCondominio},
              ${imovel.numeroQuartos}, ${imovel.numeroBanheiros}, "${imovel.fotoImovel}", ${imovel.statusLocacao})
  `;
  await db
    .executeSql(query)
    .then((response) => console.warn("Excluído: " + JSON.stringify(response)))
    .catch((erro) => console.warn("Erro: " + JSON.stringify(erro)));
  await db.close();
}

// Função para listar os imóveis cadastrados no banco de dados.
export async function getListaImoveis() {
  const db = await getConnection();
  const query = `
      SELECT id,
      tipoContrato,
      tipoImovel,
      enderecoImovel,
      valor,
      valorCondominio,
      numeroQuartos,
      numeroBanheiros,
      fotoImovel,
      statusLocacao
      FROM imoveis
  `;
  const listaImoveis = [];
  await db.executeSql(query).then((response) => {
    const uniqueResponse = response[0];
    const rows = uniqueResponse.rows;
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const itemImovel = {
        tipoContrato: item.tipoContrato,
        tipoImovel: item.tipoImovel,
        enderecoImovel: item.enderecoImovel,
        valor: item.valor,
        valorCondominio: item.valorCondominio,
        numeroQuartos: item.numeroQuartos,
        numeroBanheiros: item.numeroBanheiros,
        fotoImovel: item.fotoImovel,
        statusLocacao: item.statusLocacao,
      };
      listaImoveis.push(itemImovel);
    }
    db.close();
  });
  return listaImoveis;
}
