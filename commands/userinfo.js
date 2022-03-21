const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription(`See info about yourself 💁`)
		.addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true)),

	async execute(interaction) {
		const member = interaction.options.getMember('user');
		const user = interaction.options.getUser('user');
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
		let rolemap = member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" ");
		if (rolemap.length > 1024) rolemap = "`The user has to many roles to display all of them!`";
		if (!rolemap) rolemap = "`The user doesn't have any roles!`";
		let status = {
			online: 'Online',
			idle: 'Idle',
			dnd: 'Do Not Disturb',
			offline: 'Offline/Invisible'
		};
	const exampleEmbed = new MessageEmbed()
	.setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
    .setThumbnail(user.displayAvatarURL())
    .addFields(
		{ name: '📛'+' Name', value: "`"+`${user.username}`+"`", inline: true },
		{ name: '🆔'+' ID', value: "`"+`${user.id}`+"`", inline: true },
		{ name: '✍️'+' Nickname', value: "`"+`${member.nickname || "No Nickname"}`+"`", inline: true },
		{ name: '<:ClydeBot:612740739495100419> '+' Bot', value: "`"+`${user.bot}`+"`", inline: true },
        { name: '<:voltic_join:932381522286227508> '+' Account Created', value: `<t:`+`${Math.floor(user.createdTimestamp/1000)}`+`:R>`, inline: true },
		{ name: '<a:voltic_join:875440963697381437> '+' Joined', value: `<t:`+`${Math.floor(member.joinedTimestamp/1000)}`+`:R>`, inline: true },
		{ name: '<a:plexiOnline:478870259944783873>'+' Status', value: "`"+`${status[member.presence.status]}`+"`", inline: true },
		{ name: '<:booster:660789028861509633>'+' Server Boosting Since', value: "`"+`${member.premiumSince?.toLocaleDateString("en-US", options) || "Not Boosting"}`+"`", inline: true },
		{ name: '🔇'+' Last Timeout', value: "`"+`${member.communicationDisabledUntil?.toLocaleDateString("en-US", options) || "Never Timed Out"}`+"`", inline: true },
		{ name: '🎧'+' Voice Channel', value: `${member.voice.channel || "`Currently not in a Voice Channel`"}`, inline: true },
		{ name: '<:role:923462604293300224>'+' Roles', value: rolemap, inline: true },
		{ name: '📜'+' Permissions', value: "`"+`${member.permissions.toArray()}`+"`", inline: false },
	)
	.setTimestamp();
	interaction.reply({ embeds: [exampleEmbed]});
	},
};
