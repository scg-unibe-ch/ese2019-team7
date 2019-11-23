import {Router, Request, Response} from 'express';
import {AuthenticationController} from './authentication.controller';
import {loadOffer} from './offers.controller';
import {OfferInstance} from '../models/offer.model';

const router: Router = Router();


router.put('/', AuthenticationController, loadOffer, async (req: Request, res: Response) => {
  const offer: OfferInstance = req.body.offer;
  const provider = await offer.getProvider();
  if (provider !== null) {
    res.status(200).send({
      name: provider.name,
      email: provider.eMail,
      phone: provider.phone
    });
  }
  else {
    res.sendError('Could get associated provider of the offer ' + offer.title + '.:');
  }

});
export const ContactController: Router = router;
