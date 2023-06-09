const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prune up to 99 messages.')
        .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to prune'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            const amount = interaction.options.getInteger('amount');
            if (amount < 1 || amount > 99) {
                return interaction.reply({ content: 'You need to input a number between 1 and 99.', empheral: true });
            }
            await interaction.channel.bulkDelete(amount, true).catch(error => {
                console.error(error);
                interaction.reply({ content: 'There was an error trying to prune messages in this channel!', empheral: true });
            });
            return interaction.reply({ content: `Successuflly pruned \`${amount}\` messages.`, empheral: true });
        }
        catch (error) {
            console.error(error);
        }
    },
};