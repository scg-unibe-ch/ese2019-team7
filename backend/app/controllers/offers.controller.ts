import {Router, Request, Response} from 'express';
import {createModels} from '../models/index.model';
import {OfferInstance} from '../models/offer.model';

const router: Router = Router();

const offer = createModels().Offer;
router.get('/', async (req: Request, res: Response) => {
  offer.findAll({
    attributes: ['title', 'price', 'category'],
    where: {
      approved: true,
      public: true
    }})
    .then((offers: OfferInstance[]) => res.status(200).json({ offers }))
    .catch(err => res.status(500).json({ err: ['oops', err] }));

});
export const OffersController: Router = router;
