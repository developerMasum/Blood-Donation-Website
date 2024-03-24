import { Request, Response } from "express";
import { DonnerService } from "./donner.service";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { donnerFilterableFields } from "./donner.constants";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const createDonner = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const result = await DonnerService.createDonner(req.body);
    res.status(200).json({
      success: true,
      message: "Donner Created Successfully ! ",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message:error?.name,
        error:error
    })
  }
};

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, donnerFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  // console.log(options);
  const result = await DonnerService.getAllFromDB(filters, options);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donner Data fetched!",
    data: result,
  });
});
export const DonnerController = {
   createDonner,
   getAllFromDB
};
