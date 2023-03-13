import { BaseService } from "./BaseService";

export class AuthService extends BaseService {
  constructor() {
    super();
  }

  checkLogin = (token: string) => {
    return this.post(`/checklogin`, token);
  };
}

export const authService = new AuthService();
