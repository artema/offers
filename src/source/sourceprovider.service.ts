import { Injectable } from '@nestjs/common';
import { OfferProvider } from '../offer/types';
import { IOfferLoader } from './types';
import { Provider1Loader } from './loaders/provider1.loader';
import { Provider2Loader } from './loaders/provider2.loader';

@Injectable()
export class SourceProviderService {
  constructor(
    // It's probably worth switching to app.get for the sake of simplicity
    private readonly provider1loader: Provider1Loader,
    private readonly provider2loader: Provider2Loader,
  ) {}

  async loadOffers(provider: OfferProvider) {
    const loader = this.getLoader(provider);

    return await loader.loadOffers();
  }

  private getLoader(provider: OfferProvider): IOfferLoader {
    switch (provider) {
      case OfferProvider.Provider1:
        return this.provider1loader;
      case OfferProvider.Provider2:
        return this.provider2loader;
      default:
        throw new Error(`Loader is not implemented for provider ${provider}`);
    }
  }
}
