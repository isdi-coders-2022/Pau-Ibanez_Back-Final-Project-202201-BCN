const {
  lobbies,
} = require("../../../database/liveDatabase/lobbiesLiveDatabase/lobbiesLiveDatabase");
const piramideLobbyRouter = require("./piramideLobbyRouter/piramideLobbyRouter");

const lobbyRouter = (message, connection, player) => {
  const foundLobby = lobbies.find((lobby) => lobby.id === message.lobby);
  if (!foundLobby) {
    connection.send(
      JSON.stringify({ error: true, message: "Lobby not found" })
    );
    return;
  }

  switch (message.game) {
    case "piramide":
      piramideLobbyRouter(message, connection, foundLobby, player);
      break;

    default:
      break;
  }
};

module.exports = lobbyRouter;