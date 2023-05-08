import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient('d086b4a963d8b1004838', {
  channelAuthorization: {
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    endpoint: 'http://127.0.0.1:7000/api/pusher/auth',
    transport: 'ajax',
  },
  cluster: 'ap1',
});
