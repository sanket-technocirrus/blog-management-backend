import { Request, Response, NextFunction } from "express";

export const authorize = (...roles: ("user" | "admin")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    next();
  };
};
