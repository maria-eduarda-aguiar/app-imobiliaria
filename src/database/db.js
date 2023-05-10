import * as SQLite from "expo-sqlite";

// Criação e conexão do banco de dados para imóveis.
function openDatabase() {
  const db = SQLite.openDatabase("imobiliaria.db");
  return db;
}

export const db = openDatabase();

// Função para criar a tabela do banco de dados para imóveis.
export async function createTablesImoveis() {
  const query = `CREATE TABLE IF NOT EXISTS imoveis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeLocatario VARCHAR(20),
      tipoContrato VARCHAR(10),
      tipoImovel VARCHAR(15),
      enderecoImovel VARCHAR(150),
      valor FLOAT,
      valorCondominio FLOAT,
      numeroQuartos INTEGER,
      numeroBanheiros INTEGER,
      fotoImovel VARCHAR,
      statusLocacao BOOLEAN
      )
    `
  db.transaction((tx) => {
    tx.executeSql(query);
  });
}

// Função para criar a tabela do banco de dados para pessoas.
export async function createTablesPessoas() {
  const query = `
    CREATE TABLE IF NOT EXISTS pessoas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeLocatario VARCHAR(150),
      cpf VARCHAR(11),
      dataNascimento VARCHAR(50),
      rendaMensal FLOAT,
      diaVencimentoAluguel VARCHAR(50),
      dataInicioContrato VARCHAR(50),
      dataTerminoContrato VARCHAR(50),
      imovelVinculado INTEGER
    )
  `
  db.transaction((tx) => {
    tx.executeSql(query);
  });
}

// Função para criar a tabela do banco de dados para login.
export async function createTablesLogin() {
  const query = `
    CREATE TABLE IF NOT EXISTS login (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      apikey VARCHAR(255) NOT NULL,
      email VARCHAR(200) NOT NULL,
      token VARCHAR(255) NOT NULL,
      expiration_date DATETIME NOT NULL
    )
  `
  db.transaction((tx) => {
    tx.executeSql(query);
  });
}
