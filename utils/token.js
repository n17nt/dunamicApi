import jwt from "jsonwebtoken";

let generatorAccesToken = async (user) => {
  let token = jwt.sign(
    { ...user, expiresIn: 30 * 1000 },
    process.env.ACCESS_SECRET_KEY,
    {},
  );
  // console.log(process.env);

  return token;
};
let generatorRefreshToken = async (user) => {
  let token = jwt.sign(
    { ...user, expiresIn: 10 },
    process.env.REFRESH_SECRET_KEY,
  );
  return token;
};
export { generatorAccesToken, generatorRefreshToken };
