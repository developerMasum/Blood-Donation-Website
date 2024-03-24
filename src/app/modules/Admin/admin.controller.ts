import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constans";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await AdminService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin Data fetched!",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (
  req: Request,
  res: Response,

) => {
  const { id } = req.params;
 
    const result = await AdminService.getByIdFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "admin Data fetched!",
      data: result,
    });
  } )

const updateIntoDB = catchAsync(async (
  req: Request,
  res: Response,

) => {
  const { id } = req.params;
  // console.log(req.body);
    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "admin Data Updated!",
      data: result,
    });
  })

const deleteFromDB =catchAsync( async (
  req: Request,
  res: Response,

) => {
  const { id } = req.params;
  // console.log(req.body);

    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "admin Data deleted!",
      data: result,
    });
  } )


const softDeleteFromDB = catchAsync(async (
  req: Request,
  res: Response,
 
) => {
  const { id } = req.params;
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "admin Data Soft deleted!",
      data: result,
    });
  })

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
