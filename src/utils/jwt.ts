import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  payload: object,
  keyname: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions
) {
  const signPrivateKey = Buffer.from(
    config.get<string>(keyname),
    "base64"
  ).toString("ascii");

  return jwt.sign(payload, signPrivateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: string,
  keyname: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null {
  const signPublicKey = Buffer.from(
    config.get<string>(keyname),
    "base64"
  ).toString("ascii");

  try {
    const decodedToken = jwt.verify(token, signPublicKey) as T;
    return decodedToken;
  } catch (error) {
    return null;
  }
}
