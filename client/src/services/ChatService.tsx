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

    newConversation = (data: any) => {
        return this.post(`/conversations`, data);
    };

    getConversationByUserID = (userId: any) => {
        return this.get(`/conversations/${userId}`);
    };

    getConversationByTwoUserID = ({ firstUserId, secondUserId }: any) => {
        return this.get(`/conversations/find/${firstUserId}/${secondUserId}`);
    };
}

export const chatService = new ChatService();