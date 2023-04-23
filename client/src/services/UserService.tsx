import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  constructor() {
    super();
  }

  registerUser = (userRegister: any) => {
    return this.post(`/users`, userRegister);
  };

}

export const userService = new UserService();
