import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfferModule } from '../offer/offer.module';
import { Offer } from '../offer/offer.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Offer], // TODO: load dynamically
      synchronize: true,
    }),
    OfferModule,
  ],
})
export class AppModule {}
