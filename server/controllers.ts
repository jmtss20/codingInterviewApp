const rooms: any = {}; // keep in controllers or move elsewhere ?

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
    rooms[req.body.newRoom] = { data: [] };
    res.sendStatus(200);
  }
}