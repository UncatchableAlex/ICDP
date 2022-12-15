const { query } = require("express");
var express = require("express");
const { connect } = require("http2");
const { Client } = require("pg");
const auth = require("../creds.json");

class PopulateDatabase {
  static async addTurn() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    client
      .query(
        `INSERT INTO "turn" ("gameId", "turnnum", "player", "roll", "robber", "largestarmy", "largestarmyplayer", "longestroad", longestroadplayer)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        []
      )
      .then((dbres) => {
        console.log(dbres.rows);
      })
      .catch((e) => console.error(e.stack));
  }

  // TODO REMOVE
  static async addTurnTest() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client
      .query(
        `INSERT INTO "turn" ("gameid", "turnnum", "player", "roll", "robber", "largestarmy", "largestarmyplayer", "longestroad", longestroadplayer) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          -1,
          1,
          "DJ Alex",
          5,
          (0, 0), // robber always at 0,0 for now
          0, // Longest road when claimed by no one = 0
          "NA",
          0, // Largest Army when claimed by no one = 0
          "NA",
        ]
      )
      .then((dbres) => {
        console.log(dbres.rows);
      })
      .catch((e) => console.error(e.stack));
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
    await client.query(
      `INSERT INTO "game" ("gameid", "starttime", "player0", "player1", "player2", "player3", "board")
      VALUES ($1,$2,$3,$4,$5,%6,$7)`,
      [gameId, player0, player1, player2, player3, board]
    );
    await client.end();
  }

  //Port
  static async addPort() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client.query(
      `INSERT INTO ("gameid","vert0","ver1", "ptype")
    VALUES ($1, $2, $3, $4)`,
      []
    );
    await client.end();
  }

  //devies_played
  static async addDeviePlayed() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client.query(
      `INSERT INTO ("gameid","turnnum","player", "devie")
    VALUES ($1, $2, $3, $4)`,
      []
    );
    await client.end();
  }

  //City
  static async addCity() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client.query(
      `INSERT INTO ("gameid","turnnum","citybuilt")
    VALUES ($1, $2, $3)`,
      []
    );
    await client.end();
  }

  //road
  static async addRoad() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client.query(
      `INSERT INTO ("gameid","turnnum","raodbuilt")
    VALUES ($1, $2, $3)`,
      []
    );
    await client.end();
  }

  //settie
  static async addSettie() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client.query(
      `INSERT INTO "settie" ("gameid", "turnnum", "settiebuilt") 
    VALUES ($1, $2, $3)`,
      []
    );
    await client.end();
  }

  //trade
  static async addTrade() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    await client.query(
      `INSERT INTO "trade" ("gameid", "turnnum", "fromplayer", "toplayer", "wood", "grain", "wool", "brick", "ore") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      []
    );
    await client.end();
  }

  // Utility queries
  static async newGameId() {
    let client = new Client(auth.dbCreds);
    await client.connect();
    let temp = await client
      .query(`select MAX(gameid) from game`)
      .then((res) => {
        return res.rows[0].max;
      })
      .catch((e) => console.error(e.stack));
    await client.end();
    return temp + 1;
  }
}
exports.PopulateDatabase = PopulateDatabase;
