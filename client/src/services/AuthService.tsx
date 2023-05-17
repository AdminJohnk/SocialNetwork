import { BaseService } from './BaseService';

export class AuthService extends BaseService {
  constructor() {
    super();
  }

  checkLogin = (token: any) => {
    return this.post(`/checklogin`, token);
  };
  login = (user: any) => {
    return this.post(`/login`, user);
  };
  loginWithGoogle = (token: any) => {
    return this.post(`/auth/googleV2`, token);
  };
  logout = (token: any) => {
    return this.post(`/logout`, token);
  };
  getUserID = (token: any) => {
    return this.get(`/getUserID`);
  };
}

export const authService = new AuthService();
