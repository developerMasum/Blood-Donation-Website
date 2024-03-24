import { Request, Response } from "express";
import { DonnerService } from "./donner.service";


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

export const DonnerController = {
   createDonner,
};
