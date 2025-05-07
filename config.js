const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  app: {
    px: "+",
    token: process.env.TOKEN,
    playing: "by Samir",
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: "DJ",
      commands: ["volume", "citycom"],
    },
    maxVol: 100,
    loopMessage: false,
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },
};
