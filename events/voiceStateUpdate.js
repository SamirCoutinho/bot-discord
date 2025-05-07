const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    getVoiceConnection,
  } = require("@discordjs/voice");
  
  const path = require("path");
  const fs = require("fs");
  
  module.exports = async (client, oldState, newState) => {
    const newUser = newState.member;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;
  
    // Regras:
    // 1. O usuário entrou em um canal (e não apenas mudou de canal)
    // 2. O bot não deve reagir ao próprio movimento
    if (
      newChannel &&
      newChannel !== oldChannel &&
      !newUser.user.bot
    ) {
      const connection = joinVoiceChannel({
        channelId: newChannel.id,
        guildId: newState.guild.id,
        adapterCreator: newState.guild.voiceAdapterCreator,
      });
  
      const player = createAudioPlayer();
      const filePath = path.join(__dirname, "../sounds/aplausos.mp3");
  
      if (!fs.existsSync(filePath)) return;
  
      const resource = createAudioResource(filePath);
      player.play(resource);
      connection.subscribe(player);
  
      // Desconecta após tocar
      player.on(AudioPlayerStatus.Idle, () => {
        const conn = getVoiceConnection(newState.guild.id);
        if (conn) conn.destroy();
      });
    }
  };
  