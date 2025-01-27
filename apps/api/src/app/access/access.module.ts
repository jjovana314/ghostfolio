import { ValidateAccessDataModule } from '@ghostfolio/api/interceptors/validate-access-data/validate-access-data.module';
import { ConfigurationModule } from '@ghostfolio/api/services/configuration/configuration.module';
import { PrismaModule } from '@ghostfolio/api/services/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { AccessController } from './access.controller';
import { AccessService } from './access.service';

@Module({
  controllers: [AccessController],
  exports: [AccessService],
  imports: [ConfigurationModule, PrismaModule, ValidateAccessDataModule],
  providers: [AccessService]
})
export class AccessModule {}
