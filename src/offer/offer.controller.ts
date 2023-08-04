import { Controller, Get, Logger, Query, Render } from '@nestjs/common';

import { OfferService } from './offer.service';
import { SourceProviderService } from '../source/sourceprovider.service';
import { OfferProvider } from './types';

@Controller()
export class OfferController {
  private readonly logger = new Logger(OfferController.name);

  constructor(
    private readonly offerService: OfferService,
    private readonly sourceProviderService: SourceProviderService,
  ) {}

  @Get()
  @Render('index')
  index() {
    return {};
  }

  @Get('/load') // Use GET instead of POST for the sake of simplicity
  async load(@Query('source') provider: OfferProvider) {
    const offers = await this.sourceProviderService.loadOffers(provider);

    let processed = 0;
    let failed = 0;

    for await (const { offer, payload } of offers) {
      try {
        const entity = await this.offerService.createOffer(offer, provider);

        this.logger.log('Offer imported.', entity);

        processed++;
      } catch (error) {
        this.logger.error('Unable to import offer.', error, payload); // TODO: use a better logger

        failed++;
      }
    }

    return { processed, failed };
  }
}
