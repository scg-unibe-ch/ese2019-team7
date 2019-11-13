import {UserInstance} from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      session: {user: UserInstance};
    }
    interface Response {
      sendSuccess: () => void;
      sendCreated: () => void;
      sendBadRequest: (message: string) => void;
      sendForbidden: () => void;
      sendError: (message: string) => void;
    }
  }
}
