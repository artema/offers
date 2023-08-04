import { Module } from '@nestjs/common';
import { SourceProviderService } from './sourceprovider.service';
import { Provider1Loader } from './loaders/provider1.loader';
import { Provider2Loader } from './loaders/provider2.loader';

@Module({
  providers: [SourceProviderService, Provider1Loader, Provider2Loader],
  exports: [SourceProviderService],
})
export class SourceModule {}
