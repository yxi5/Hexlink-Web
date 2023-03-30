import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
// import { getRedPacketPrivate } from "graphql/redpacket";
import { insertNotification, getNotification } from "../../../functions/src/graphql/notification"

export const authAppSetupController = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errorMessage = error.array()[0].msg;
    res.status(400).json({ message: errorMessage });
    return;
  }

  const { address } = req.body;
  const { notifiToken } = req.body;

  // await insertNotification([{addr: address, token: notifiToken}]);
  await getNotification(address);
  //TO-DO: store the address to Chain
  res.status(200).json({ address: address, notifiToken: notifiToken});
};