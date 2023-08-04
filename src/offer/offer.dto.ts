import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsUrl, IsString, IsBoolean, MaxLength } from 'class-validator';

export class OfferDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  requirements: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(255)
  thumbnail: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(256)
  offerUrlTemplate: string;

  @Type(() => Boolean)
  @Transform(({ value }) => (value === true ? 1 : 0), { toClassOnly: true })
  isDesktop: any;

  @Type(() => Boolean)
  @Transform(({ value }) => (value === true ? 1 : 0), { toClassOnly: true })
  isAndroid: any;

  @Type(() => Boolean)
  @Transform(({ value }) => (value === true ? 1 : 0), { toClassOnly: true })
  isIos: any;

  @IsString()
  @MaxLength(255)
  externalOfferId?: string;
}
