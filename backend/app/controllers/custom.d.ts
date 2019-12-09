import {UserInstance} from '../models/user.model';
import {AdminInstance} from '../models/admin.model';
import {DbInterface} from '../dbtypings/dbInterface';

declare global {
  namespace Express {
    interface Request {
      db: DbInterface;
      session: {
        user: UserInstance
        admin: AdminInstance | null
      };
    }
    interface Response {
      sendSuccess: () => void;
      sendCreated: () => void;
      sendBadRequest: (message?: string) => void;
      sendForbidden: () => void;
      sendError: (message?: string) => void;
    }
  }
}
