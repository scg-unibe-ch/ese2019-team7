import {UserInstance} from '../models/user.model';
import {AdminInstance} from "../models/admin.model";

declare global {
  namespace Express {
    interface Request {
      session: {
        user: UserInstance
        admin: AdminInstance | null
      };
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
