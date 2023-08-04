import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SourceModule } from '../source/source.module';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { Offer } from './offer.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), SourceModule],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService],
})
export class OfferModule {}
