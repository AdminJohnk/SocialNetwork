import { BaseService } from './BaseService';

export class MessageService extends BaseService {
  constructor() {
    super();
  }

  getConversations = () => {
    return this.get(`/conversations`);
  };

  createConversation = (payload: any) => {
    return this.post(`/conversations`, payload);
  };
}

export const messageService = new MessageService();
