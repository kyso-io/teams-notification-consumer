import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { DiscussionsController } from './discussions.controller'

@Module({
    imports: [DatabaseModule],
    controllers: [DiscussionsController],
})
export class DiscussionsModule {}
