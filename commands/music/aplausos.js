const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const path = require('path');
const fs = require('fs');

module.exports = {
  name: "aplausos",
  aliases: ["oea"],
  utilisation: "{prefix}aplausos",
  voiceChannel: true,

  async execute(client, message, args) {
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.channel.send("Você precisa estar em um canal de voz para tocar o áudio! ❌");
    }

    // Conecta no canal de voz
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    const filePath = path.join(__dirname, "../../sounds/aplausos.mp3");

    if (!fs.existsSync(filePath)) {
      return message.channel.send("O arquivo de áudio não foi encontrado ❌");
    }

    const resource = createAudioResource(filePath);

    player.play(resource);
    connection.subscribe(player);

    message.channel.send("👏 Aplausos iniciados!");

    // Encerra conexão quando o áudio terminar
    player.on(AudioPlayerStatus.Idle, () => {
      const conn = getVoiceConnection(message.guild.id);
      if (conn) conn.destroy();
    });
  },
};
