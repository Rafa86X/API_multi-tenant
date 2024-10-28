import express, { Request, Response, NextFunction } from 'express';
import { Security } from '../security/segurity';

const addTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const segurity = new Security();
  const originalJson = res.json;


  res.json = function (body: any) {
    const wrappedResponse = {
      info: body, 
      newToken: segurity.tokenREVALID(req)
    };

    
    return originalJson.call(this, wrappedResponse);
  };
  next();
};

export default addTokenMiddleware;
