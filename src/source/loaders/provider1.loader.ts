import { Injectable } from '@nestjs/common';

import { IOfferLoader } from '../types';
import { OfferDto } from '../../offer/offer.dto';

@Injectable()
export class Provider1Loader implements IOfferLoader {
  private async load() {
    return {
      query: {
        pubid: '1',
        appid: 1,
        country: '',
        platform: 'all',
      },
      response: {
        currency_name: 'Coins',
        offers_count: 2729,
        // this will be an array of offers
        // this can be multiple, so please consider this
        offers: [
          {},
          {
            // should be mapped to `externalOfferId`
            offer_id: '19524555',
            // should be mapped to `name`
            offer_name: 'MyGym - iOS',
            // should be mapped to `description`
            offer_desc: 'Play and reach level 23 within 14 days.',
            // should be mapped to `requirements`
            call_to_action: 'Play and reach level 23 within 14 days.',
            disclaimer: 'This offer rewards within 24 hours. New users only.',
            // should be mapped to offerUrlTemplate
            offer_url: 'https://some.url',
            offer_url_easy: 'https://some.url',
            payout: 10.675,
            payout_type: 'cpe',
            amount: 8873,
            // should be mapped to `thumbnail`
            image_url: 'https://some.url',
            image_url_220x124: 'https://some.url',
            countries: ['NZ'],
            // combine platform and device to map to `isDesktop`, `isAndroid`, `isIos`
            platform: 'mobile', // possible values are "desktop" | "mobile"
            device: 'iphone_ipad', // anything else should be considered as android
            category: {
              '9': 'Mobile Apps',
            },
            last_modified: 1645095666,
            preview_url: 'https://some.url',
            package_id: 'idnumbers',
            verticals: [
              {
                vertical_id: '4',
                vertical_name: 'Lifestyle',
              },
              {
                vertical_id: '11',
                vertical_name: 'Health',
              },
            ],
          },
        ],
      },
    };
  }

  async loadOffers() {
    const data = await this.load(); // TODO: support pagination

    return {
      [Symbol.asyncIterator]() {
        const offers = data.response.offers;

        let i = 0;

        return {
          async next() {
            const payload = offers[i++];

            if (!payload) {
              return { done: true, value: null };
            }

            const offer = {
              externalOfferId: payload.offer_id,
              name: payload.offer_name,
              description: payload.offer_desc,
              requirements: payload.call_to_action,
              thumbnail: payload.image_url,
              offerUrlTemplate: payload.offer_url,
              isIos: payload.platform === 'mobile' && payload.device === 'iphone_ipad',
              isAndroid: payload.platform === 'mobile' && payload.device !== 'iphone_ipad',
              isDesktop: payload.platform === 'desktop',
            } as OfferDto;

            return {
              done: false,
              value: {
                payload,
                offer,
              },
            };
          },
        };
      },
    };
  }
}
