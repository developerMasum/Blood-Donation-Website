import httpStatus from "http-status";
import express, { Application, Request, Response, NextFunction } from "express";

const notFoundRoute = (
  (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "API not found !",
      error: {
        path: req.originalUrl,
      },
    });
  }
);
export default notFoundRoute
