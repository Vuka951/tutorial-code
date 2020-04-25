import discord
from youtube_search import YoutubeSearch

from disc_conf import TOKEN, PREFIX

client = discord.Client()

# event gets fired when the bot is ready
@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')


# gets fired on each msg
@client.event
async def on_message(message):
    # if the msg was sent by a bot ignore
    if message.author.bot:
        return

    # if the msg doesnt start with our defined command prefix ignore it
    if not message.content.startswith(PREFIX):
        return

    # Seperate the command and the args
    command = message.content[1:].split(' ')[0]
    args = message.content[1:].split(' ')[1:]

    if command == 'search':
        what_to_search = ' '.join(args)
        results = YoutubeSearch(what_to_search, max_results=10).to_dict()
        link = f'https://www.youtube.com{results[0]["link"]}'
        first_result = {'title': results[0]['title'], 'link': link}
        # sends the msg back ot the channel with the result
        await message.channel.send(f'The First YT Search Result For `{what_to_search}` is: `{first_result["title"]}` and it can be found at {first_result["link"]}')

client.run(TOKEN)
