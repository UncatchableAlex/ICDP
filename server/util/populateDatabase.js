const { query } = require("express");
var express = require("express");
const { connect } = require("http2");
const { Client } = require("pg");
const auth = require("../creds.json");

class PopulateDatabase {


  static async addTurn(gameId, turnnum, player) {
    const  client = new Client(auth.dbCreds);
    await client.connect();
    const queryText = "INSERT INTO turn(gameid, turnnum, player) VALUES ($1, $2, $3)";
    const {rows} = await client.query(queryText, [gameId, turnnum, player]);
    await client.end();
  }

  static async addRoll(gameId, turnnum, roll) {
    const  client = new Client(auth.dbCreds);
    await client.connect();
    const queryText = "INSERT INTO turn(gameid, turnnum, player) VALUES ($1, $2, $3)";
    const {rows} = await client.query(queryText, [gameId, turnnum, roll]);
    await client.end();
  }


  // Players Hand
  static async addPlayerHand() {
    //Need to post everything in the players hand
    let client = new Client(auth.dbCreds);
    await client.query(
      `INSERT INTO "hand" ("gameid","turnnum","player","lumber","grain","wool","brick","ore","dev_vp","dev_monopoly", "dev_knight", "dev_yop", "dev_rbuild", "vpsshowing")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [
        game.gameId,
        game.turn,
        game.player.playerName,
        player.resources[wood],
        player.resources[wheat],
        player.resources[sheep],
        player.resources[brick],
        player.resources[ore],
        player.developmentCards[victoryPoint],
        player.developmentCards[monopoly],
        player.developmentCards[knight],
        player.developmentCards[yearOfPlenty],
        player.developmentCards[roadBuilding],
        player.victoryPoints,
      ]
    );
  }

  static async addPlayerHandTest() {
    //Need to post everything in the players hand
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client.query(
      `INSERT INTO "hand" ("gameid","turnnum","player","lumber","grain","wool","brick","ore","dev_vp","dev_monopoly", "dev_knight", "dev_yop", "dev_rbuild", "vpsshowing")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [-1, 0, "DJ Alex", 4, 2, 2, 3, 0, 0, 1, 3, 0, 0, 3]
    );
    await client.end();
  }

  //Game
  static async addGame(gameId, player0, player1, player2, player3, board) {
    let client = new Client(auth.dbCreds);
    await client.connect();
    const now = new Date();
    console.log("board: ")
    console.log(board);
    const queryText = 'INSERT INTO game(gameid, player0, player1, player2, player3, board, starttime) VALUES ' +
        '($1,$2,$3,$4,$5,$6,$7)';
    await client.query(queryText, [gameId, player0, player1, player2, player3, board, now]);
    await client.end();
  }

  //devies_played
  static async addDeviePlayed(gameId, turnnum, player, devie) {
    let client = new Client(auth.dbCreds);
    await client.connect();
    let deviepg = `(${devie})::devie`;
    await client.query(
      `INSERT INTO devies_played ("gameid","turnnum","player", "devie")
    VALUES ($1, $2, $3, $4)`,
      [gameId, turnnum, player, deviepg]
    );
    await client.end();
  }

  // settie
  static async add_structure(gameId, turn, hex) {
    console.log("trying to build a " + hex + " in game " + gameId + " on turn " + turn);
    let client = new Client(auth.dbCreds);
    await client.connect();
    if (!["city", "settie", "road"].includes(hex.type)) {
      throw "hex is not of the correct type. Type: " + hex.type;
    }
    const queryText = "INSERT INTO " + hex.type + "(gameid, turnnum, " + hex.type + "built) VALUES ($1, $2, ($3, $4))"
    await client.query(queryText, [gameId, turn, hex.q, hex.r]);
    await client.end();
  }

  // Utility queries
  static async newGameId() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    let {rows} = await client.query(`select MAX(gameid) from game`);
    await client.end();
    return rows[0].max === null ? 0 : parseInt(rows[0].max) + 1;
  }
}
exports.PopulateDatabase = PopulateDatabase;
