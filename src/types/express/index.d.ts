export {}; // This solves the error -> Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.ts(2669)

// This file is created to allow use of eg req.user?, else it gives error if we try to use it directly
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "user" | "admin";
      };
    }
  }
}
