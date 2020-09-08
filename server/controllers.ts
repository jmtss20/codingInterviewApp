import { rooms } from './data';

export const controllers = {
  joinRoom: (req: any, res: any) => {
    if (!rooms[req.params.room]) {
      res.sendStatus(404);
    }
    console.log(rooms);
    res.send(req.params.room);
  },
  createRoom: (req: any, res: any) => {
    if (rooms[req.body.newRoom]) {
      res.sendStatus(404);
    }
    rooms[req.body.newRoom] = {};
    res.sendStatus(200);
  },
};
