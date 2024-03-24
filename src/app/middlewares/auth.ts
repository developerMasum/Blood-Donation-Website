import { Secret } from "jsonwebtoken";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import express, { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiErrors";
import httpStatus from "http-status";
const auth = (...roles: string[]) => {
  return async (req: Request & {user?:any}, res: Response, next: NextFunction) => {
    console.log(roles);
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not Authorized");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      // console.log(verifiedUser);

      req.user = verifiedUser
      
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;
