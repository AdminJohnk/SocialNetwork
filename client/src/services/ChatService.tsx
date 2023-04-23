import { BaseService } from "./BaseService";

export class ChatService extends BaseService {
    constructor() {
        super();
    }

    getMessageByConvID = (convID: any) => {
        return this.get(`/messages/${convID}`);
    };

    sendMessage = (message: any) => {
        return this.post(`/messages`, message);
    };
}

export const chatService = new ChatService();