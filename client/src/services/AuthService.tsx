import { BaseService } from "./BaseService";

export class AuthService extends BaseService {
  constructor() {
    super();
  }

  checkLogin = (token: any) => {
    return this.post(`/checklogin`, token);
  };
  login = (user: any) => {
    return this.post(`/login`, user);
  }
}

export const authService = new AuthService();
