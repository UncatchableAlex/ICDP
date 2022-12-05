var express = require("express");
const { Client } = require("pg");
const auth = require("./creds.json");
const client = new Client(auth.dbCreds);

class PopulateDatabase {
  getAll() {
    client.connect();
    client
      .query(`SELECT * FROM hand`)
      .then((dbres) => {
        console.log(dbres.rows);
      })
      .catch((e) => console.error(e.stack));
  }

  addTurn() {
    client.connect();
    client
      .query(
        `INSERT INTO "turn" ("gameId", "turnnum", "player", "roll", "robber", "largestarmy", "largestarmyplayer", "longestroad", longestroadplayer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          game.gameId,
          game.turn,
          game.player.playerName,
          game.currentRoll,
          "0,0", // robber always at 0,0 for now
          0, // Longest road when claimed by no one = 0
          game.largestArmy,
          0, // Largest Army when claimed by no one = 0
          game.longestRoad,
        ]
      )
      .then((dbres) => {
        console.log(dbres.rows);
      })
      .catch((e) => console.error(e.stack));
  }

  addTurnTest() {
    client.connect();
    client
      .query(
        `INSERT INTO "turn" ("gameid", "turnnum", "player", "roll", "robber", "largestarmy", "largestarmyplayer", "longestroad", longestroadplayer) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          -1,
          1,
          "DJ Alex",
          5,
          "NA", // robber always at 0,0 for now
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
  async addPlayerHand() {
    //Need to post everything in the players hand

    await client.connect();
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

  async addPlayerHandTest() {
    //Need to post everything in the players hand

    await client.connect();
    await client.query(
      `INSERT INTO "hand" ("gameid","turnnum","player","lumber","grain","wool","brick","ore","dev_vp","dev_monopoly", "dev_knight", "dev_yop", "dev_rbuild", "vpsshowing")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [-1, 0, "DJ Alex", 4, 2, 2, 3, 0, 0, 1, 3, 0, 0, 3]
    );
  }

  //Game //TODO will need to go on the server end as players don't have access to each other
  async game() {
    await client.connect();
    await client.query(`INSERT INTO "game" `);
  }

  //Port
  async addPort() {
    await client.connect();
    await client.query();
  }

  //devies_played
  async addDeviePlayed() {
    await client.connect();
    await client.query();
  }

  //City
  async addCity() {
    await client.connect();
    await client.query();
  }

  //road
  async addRoad() {
    await client.connect();
    await client.query();
  }

  //settie
  async addSettie() {
    await client.connect();
    await client.query();
  }

  //trade
  async addTrade() {
    await client.connect();
    await client.query();
  }
}
exports.PopulateDatabase = PopulateDatabase;
