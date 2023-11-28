import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // if everything alright then go to next
      await schema.parseAsync({ body: req.body });
      next();
    } catch (error) {
      // if error go to global error handler
      next(error);
    }
  };
};

export default validateRequest;
