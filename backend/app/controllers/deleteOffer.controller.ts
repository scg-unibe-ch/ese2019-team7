import {Request, Response, Router} from 'express';
import {getDatabase} from '../database';
import {UserInstance} from '../models/user.model';




const router: Router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));


router.get('/', async (req: Request, res: Response) => {
  res.statusCode = 200;
});


router.delete('/', deleteOfferDef)

async function deleteOfferDef(rawReq: any, rawRes: any) {
  deleteOffer(rawReq, rawRes, getDatabase().Offer);
}
/**
 * delete a Offer
 * >
 *
 * Possible Http codes:
 * - **400:** Bad request format. Look above to see the correct format
 *
 * - **201:** Created: registration successful
 * @param rawReq
 * @param rawRes
 * @param offer User table of the database
 */
export async function deleteOffer(rawReq: any, rawRes: any, offer: any) {
  const req: Request& {session: {user: UserInstance}} = rawReq;
  const res: Response = rawRes;
  if (req.session.user.id !== req.body.Userid) res.sendStatus(400); // Bad Request

  try {
    await offer.destroy({
        where: {
          id: req.body.id
        }
      });
  } catch (err) {
    res.status(400).send({err : '^_^'});
    return;
  }
  res.status(201).send({message: 'delete'});
}



export const RegisterController: Router = router;
