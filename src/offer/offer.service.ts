import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';

import { OfferDto } from './offer.dto';
import { Offer } from './offer.schema';
import { OfferProvider } from './types';

@Injectable()
export class OfferService {
  constructor(@InjectRepository(Offer) private readonly offers: Repository<Offer>) {}

  async createOffer(dto: OfferDto, provider: OfferProvider) {
    const item = plainToClass(OfferDto, dto);
    const errors = await validate(item);

    if (errors.length > 0) {
      throw errors[0];
    }

    const entity = await this.offers.save({
      ...item,
      slug: nanoid(),
      providerName: provider,
    } as Offer); // TODO: consider using a transformer

    return entity;
  }
}
