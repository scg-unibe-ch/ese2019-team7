


export function addFullResponseFunctions (obj: any) {
  obj.sendSuccess = function () {
    this.status(200).send({message: 'OK'});
  };
  obj.sendCreated = function () {
    this.status(201).send({message: 'Created'});
  };
  obj.sendBadRequest = function (message: string) {
    let toSend;
    if (message === null || message === undefined) toSend = 'Bad Request';
    else toSend = 'Bad Request: ' + message;
    this.status(400).send({message: toSend});
  };
  obj.sendForbidden = function () {
    this.status(403).send({message: 'forbidden'});
  };
  obj.sendError = function (message: string) {
    let toSend;
    if (message === null || message === undefined) toSend = 'Unknown Internal Server Error';
    else toSend = 'Internal Server Error: ' + message;
    this.status(400).send({message: toSend});
  };
}
