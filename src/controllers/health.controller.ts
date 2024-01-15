import { Request, Response } from "express";


class HealthController {

  public async health(req: Request, res: Response): Promise<void> {
 
      res.status(200).json("great");
 
   }


}

export default HealthController;
