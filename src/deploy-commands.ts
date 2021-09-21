const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

export const commandsName = {
	avatar: "avatar",

	createMessage: "create-message",
	createList: "create-list",

	listRemove: "list-remove",
	listEdit: "list-edit",
	listInsert: "list-insert",
}

export const paramsName = {
	createListName : "name",
	listNumber: "number",
	listContent: "content",
}

const commands = [

	new SlashCommandBuilder()
		.setName(commandsName.avatar)
		.setDescription('Get the bot avatar'),

	//#region creation commands
	new SlashCommandBuilder()
		.setName(commandsName.createMessage)
		.setDescription('Create a shared editable message that can be edited by multiple users'),

	new SlashCommandBuilder()
		.setName(commandsName.createList)
		.setDescription('Create a shared editable list that can be edited by multiple users')
		.addStringOption(option =>
			option.setName(paramsName.createListName)
				.setDescription('The name of the list')
				.setRequired(true)
		),
	//#endregion

	new SlashCommandBuilder()
		.setName(commandsName.listRemove)
		.setDescription('Remove item from a list')
		.addIntegerOption(option =>
			option.setName(paramsName.listNumber)
				.setDescription('The number of the item to remove')
				.setRequired(true)
		),


	new SlashCommandBuilder()
		.setName(commandsName.listEdit)
		.setDescription('Remove item from a list')
		.addIntegerOption(option =>
			option.setName(paramsName.listNumber)
				.setDescription('The number of the item to edit')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName(paramsName.listContent)
				.setDescription('The new content of the element to edit')
				.setRequired(true)
		),


	new SlashCommandBuilder()
		.setName(commandsName.listInsert)
		.setDescription('Insert an item into a list at a given position')
		.addIntegerOption(option =>
			option.setName(paramsName.listNumber)
				.setDescription('The number of the item to insert')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName(paramsName.listContent)
				.setDescription('The new content of the element to insert')
				.setRequired(true)
		),

].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);
(async () => {
	try {
		console.log("Deploying commands...")
		await rest.put(
			/** SNIPPET TO REGISTER THE COMMANDS FOR ALL THE SERVERS
			Routes.applicationCommands(clientId),
			*/
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
