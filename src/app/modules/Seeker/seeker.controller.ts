import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { SeekerService } from "./seeker.service";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { seekerFilterableFields } from "./seeker.constans";
import pick from "../../../shared/pick";

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

    const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
      // console.log(req.query)
      const filters = pick(req.query, seekerFilterableFields);
      const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
      console.log(options);
      const result = await SeekerService.getAllFromDB(filters, options);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blood Seekers Data fetched!",
        data: result,
      });
    });
    export const SeekerController= {
        createSeeker,
        getAllFromDB
    }

    