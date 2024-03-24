import { z } from "zod";

const update = z.object({
    body: z.object({
        name: z.string().optional(),
        contactNumber: z.string().optional(),
        profilePhoto:z.string().optional(),
        area:z.string().optional(),
        upozillaName:z.string().optional(),
        districtName:z.string().optional(),
        patientAge:z.string().optional(),
        patientBloodGroup:z.string().optional(),
        medicalCondition:z.string().optional(),
        reasonForBlood:z.string().optional(),
       

    })
});


export const seekerValidationSchemas = {
    update
}