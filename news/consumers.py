import json
from channels.generic.websocket import AsyncWebsocketConsumer


class PriceConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('prices', self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard('prices', self.channel_name)

    async def send_new_data(self, event):
        new_data = event['text']
        await self.send(json.dumps(new_data))


class NewPostCunsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('new_posts', self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard('new_posts', self.channel_name)

    async def new_post_notify(self, event):
        new_data = event['text']
        await self.send(json.dumps(new_data))
