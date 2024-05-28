const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "leave",
    aliases: ["l"],
    version: "1.0",
    author: "maganda",
    countDown: 5,
    role: 2,
    shortDescription: "Bot will leave a group chat",
    longDescription: "",
    category: "admin",
    guide: "{pn} <gcUid>"
  },

  run: async function ({ api, event, args }) {
    if (args.length !== 1) {
      return api.sendMessage("Invalid command usage. Please provide the group chat UID.", event.threadID);
    }

    const gcUid = args[0];

    try {
      const botUserId = api.getCurrentUserID();

      await api.removeUserFromGroup(botUserId, gcUid);

      return api.sendMessage(`Left the group chat: ${gcUid}`, event.threadID);
    } catch (error) {
      console.error(error);
      return api.sendMessage(`Error leaving the group chat. Please check the UID and try again.`, event.threadID);
    }
  }
};