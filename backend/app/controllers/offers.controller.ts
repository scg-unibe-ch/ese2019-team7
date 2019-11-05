import {Router, Request, Response} from 'express';
import {getDatabase} from '../database';
import {OfferInstance} from '../models/offer.model';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  getDatabase().Offer.findAll({
    attributes: ['id', 'title', 'price', 'category'],
    where: {
      approved: true,
      public: true
    }})
    .then((offers: OfferInstance[]) => res.status(200).json({ offers }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));

});
export const OffersController: Router = router;
