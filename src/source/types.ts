import type { OfferDto } from '../offer/offer.dto';

export interface IOfferLoader {
  loadOffers(): Promise<AsyncIterable<OfferLoadResult>>;
}

export type OfferLoadResult = {
  payload: any;
  offer: OfferDto;
};
