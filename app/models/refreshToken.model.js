import { v4 as uuidv4 } from "uuid";

export default (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define("refreshToken", {
    token: { type: Sequelize.STRING },
    expiryDate: { type: Sequelize.DATE },
  });

  // Método para crear un token con expiración (ej. 24 horas)
  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + 86400); // 24 horas

    let _token = uuidv4();
    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    });
    return refreshToken.token;
  };

  // Método para verificar si expiró
  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return RefreshToken;
};