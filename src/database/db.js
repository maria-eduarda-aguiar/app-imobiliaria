import * as SQLite from "expo-sqlite";

// Criação e conexão do banco de dados.
function openDatabase() {
  const db = SQLite.openDatabase("imoveis.db");
  return db;
}

export const db = openDatabase();

// Função para criar a tabela do banco de dados.
export async function createTables() {
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
  db.transaction((tx) => {
    tx.executeSql(query);
  });
}
