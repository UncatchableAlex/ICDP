DROP TABLE IF EXISTS port CASCADE;
DROP TABLE IF EXISTS trade CASCADE;
DROP TABLE IF EXISTS turn CASCADE;
DROP TABLE IF EXISTS hand CASCADE;
DROP TABLE IF EXISTS game CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS settie CASCADE;
DROP TABLE IF EXISTS road CASCADE;
DROP TABLE IF EXISTS city CASCADE;
DROP TABLE IF EXISTS devies_played CASCADE;
DROP TABLE IF EXISTS tokens CASCADE;
DROP TABLE IF EXISTS ingame CASCADE;

DROP TYPE IF EXISTS COORD CASCADE;
DROP TYPE IF EXISTS DEVIE CASCADE;

CREATE TYPE COORD AS (
 	q SMALLINT,
	r SMALLINT
);

CREATE TYPE DEVIE AS ENUM('YEAR_OF_PLENTY', 'MONOPOLY', 'VICTORY_POINT', 'ROAD_BUILDER', 'KNIGHT');

CREATE TABLE account (
	username CHAR(20) PRIMARY KEY CHECK(username ~* '[A-Za-z0-9]+'),
	email CHAR(50) UNIQUE NOT NULL CHECK(email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
	salt CHAR(32) NOT NULL,
	pword CHAR(64) NOT NULL
);
CREATE TABLE game (
	gameId SERIAL PRIMARY KEY,
	startTime TIMETZ,
	player0 VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	player1 VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	player2 VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	player3 VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	board CHAR(19) NOT NULL CHECK(board ~ '\A(?=(?:.*G){4})(?=(?:.*O){3})(?=(?:.*W){4})(?=(?:.*B){3})(?=(?:.*L){4})(?=.*D).*')
);
CREATE TABLE cookie (
	username char(20) PRIMARY KEY REFERENCES account(username),
	issued timestamp
);
CREATE TABLE port (
	gameId INTEGER REFERENCES game(gameId),
	vert0 COORD,
	vert1 COORD,
	ptype CHAR CHECK(ptype IN ('G', 'W', 'B', 'O', '?'))
);
CREATE TABLE turn (
	gameId INTEGER REFERENCES game(gameId),
	turnNum INTEGER CHECK(turnNum >= 0),
	player VARCHAR(20) REFERENCES account(username),
	roll SMALLINT NOT NULL CHECK(roll >= 1 AND roll <= 12),
	robber COORD,
	largestArmy SMALLINT NOT NULL,
	largestArmyPlayer VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	longestRoad SMALLINT NOT NULL,
	longestRoadPlayer VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	PRIMARY KEY(gameId, turnNum)
);

CREATE TABLE hand (
	gameId INTEGER,
	turnNum SMALLINT,
	player VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	lumber SMALLINT NOT NULL,
	grain SMALLINT NOT NULL,
	wool SMALLINT NOT NULL,
	brick SMALLINT NOT NULL,
	ore SMALLINT NOT NULL,
	dev_vp SMALLINT NOT NULL,
	dev_monopoly SMALLINT NOT NULL,
	dev_knight SMALLINT NOT NULL,
	dev_yop SMALLINT NOT NULL,
	dev_rbuild SMALLINT NOT NULL,
	vpsShowing SMALLINT NOT NULL,
	FOREIGN KEY (gameId, turnNum) REFERENCES turn(gameId, turnNum),
	PRIMARY KEY (gameId, turnNum, player)
);

CREATE TABLE devies_played (
	gameId INTEGER,
	turnNum SMALLINT,
	player VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	devie DEVIE,
	FOREIGN KEY (gameId, turnNum) REFERENCES turn(gameId, turnNum),
	PRIMARY KEY (gameId, turnNum)
);

CREATE TABLE trade (
	gameId INTEGER,
	turnNum SMALLINT,
	fromPlayer VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	toPlayer VARCHAR(20) REFERENCES account(username) ON UPDATE CASCADE,
	grain SMALLINT NOT NULL,
	wool SMALLINT NOT NULL,
	brick SMALLINT NOT NULL,
	ore SMALLINT NOT NULL,
	FOREIGN KEY (gameId, turnNum) REFERENCES turn(gameId, turnNum),
	PRIMARY KEY(gameId, turnNum, fromPlayer, toPlayer)
);

CREATE TABLE settie (
	gameId INTEGER,
	turnNum SMALLINT,
	settieBuilt COORD NOT NULL,
	FOREIGN KEY (gameId, turnNum) REFERENCES turn(gameId, turnNum),
	PRIMARY KEY (gameId, turnNum, settieBuilt)
);

CREATE TABLE road (
	gameId INTEGER,
	turnNum SMALLINT,
	roadBuilt COORD NOT NULL,
	FOREIGN KEY (gameId, turnNum) REFERENCES turn(gameId, turnNum),
	PRIMARY KEY (gameId, turnNum, roadBuilt)
);

CREATE TABLE city (
	gameId INTEGER,
	turnNum SMALLINT,
	cityBuilt COORD NOT NULL,
	FOREIGN KEY (gameId, turnNum) REFERENCES turn(gameId, turnNum),
	PRIMARY KEY (gameId, turnNum, cityBuilt)
);

