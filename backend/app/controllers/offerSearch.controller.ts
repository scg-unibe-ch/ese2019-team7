import {Router, Request, Response} from 'express';
import {getDatabase} from '../database';
import {OfferAttributes, OfferInstance} from '../models/offer.model';
import {UserAttributes, UserInstance} from '../models/user.model';
import {DbInterface} from '../dbtypings/dbInterface';

const router: Router = Router();
router.get('/title', searchTitle);
router.get('/description', searchDescription);
router.get('/all', searchAll);
router.get('/', searchAll);
const defOpts = {
  attributes: ['id', 'title', 'price', 'category'],
  raw: true
};


export async function searchTitle(rawReq: any, rawRes: any) {
  await httpPerformSearch(rawReq, rawRes, getDatabase(), ['title']);
}

export async function searchDescription(rawReq: any, rawRes: any) {
  await httpPerformSearch(rawReq, rawRes, getDatabase(), ['description']);
}

export async function searchAll(rawReq: any, rawRes: any) {
  await httpPerformSearch(rawReq, rawRes, getDatabase(), ['description', 'title', 'category']);
}

export async function httpPerformSearch(rawReq: any, rawRes: any, db: any, attributes: string[]) {
  const req: Request & {session: {user: UserInstance}} = rawReq;
  const res: Response = rawRes;
  const results = await performSearch(req.body.search, attributes, db);
  res.status(200).send(results);
}

export async  function performSearch(search: string, attributes: string[], db: DbInterface): Promise<OfferAttributes[]> {
  const Op = db.Sequelize.Op;
  const cmd = attributes.map((attribute) => {
    const obj: any = {};
    obj[attribute] = {[Op.like]: '%' + search + '%' };
    return obj;
  });
  let offers: OfferAttributes[];
  try {
    offers = await db.Offer.findAll({
      attributes: ['id', 'title', 'description', 'price', 'category'],
      raw: true,
      where: {
        approved: true,
        public: true,
        [Op.or]: cmd
      }});
  } catch (e) {
    offers = [];
  }
  return offers;
}

export const OfferSearchController: Router = router;
