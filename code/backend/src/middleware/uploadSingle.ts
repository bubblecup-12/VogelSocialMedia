import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { StatusCodes } from "http-status-codes";

const multerInstance = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export const upload = (req: Request, res: Response, next: NextFunction) => {
  multerInstance.single("image")(req, res, (err: any) => {
    if (err) {
      console.error(err);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: err.name, details: [err.message] });
    }

    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "No file uploaded",
        details: [{ message: "Please upload a file" }],
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Invalid file type",
        details: [
          {
            message:
              "Only .jpeg, .png, or .webp files are allowed. Invalid: " +
              req.file.originalname,
          },
        ],
      });
    }

    next();
  });
};
