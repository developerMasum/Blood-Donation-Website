import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { SeekerService } from "./seeker.service";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

const createSeeker = catchAsync(async (
    req: Request,
    res: Response,
   
  ) => {
  
      const result = await SeekerService.createSeeker(req.body);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blood Seeker profile has been created successfully!",
        data: result,
      });
    })

    export const SeekerController= {
        createSeeker
    }

    