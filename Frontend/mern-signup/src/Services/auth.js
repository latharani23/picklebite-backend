import http from "../routing/http-auth.js";

class AuthService {
  loginUser = (data) => http.post("/login", data);
  registerUser = (data) => http.post("/signup", data);
  userForgotPassword = (data) => http.post("/forgot-passwor", data);
  userPasswordReset = (data) => http.put("/passwordreset/:resetToken", data);
}

export default new AuthService();
