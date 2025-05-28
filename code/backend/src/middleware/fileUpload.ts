import { StatusCodes } from "http-status-codes";
import multer, { MulterError } from "multer";
import { Request, Response, NextFunction } from "express";

// Configure multer to store files in memory
const multerInstance = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});

export const upload = (req: Request, res: Response, next: NextFunction) => {
  multerInstance.array("images")(req, res, (err: any) => {
    if (err) {
      console.error(err);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: err.name, details: [err.message] });
    }

    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      //check if user uploaded files
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "No files uploaded",
        details: [{ message: "Please upload at least one file" }],
      });
    }

    const files = req.files as Express.Multer.File[];
    if (files.length > 15) {
      //check if user uploaded more than 15 files
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Too many files",
        details: [{ message: "You can upload a maximum of 15 files" }],
      });
    }
    for (const file of files) {
      //check for correct filetypes
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "Invalid file type",
          details: [
            {
              message:
                "Only .jpeg, .png, or .webp files are allowed. Invalid: " +
                file.originalname,
            },
          ],
        });
      }
    }

    next();
  });
};
