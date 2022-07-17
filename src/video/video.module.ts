import { Module } from '@nestjs/common'
import { VideoService } from './video.service'
import { VideoController } from './video.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'

@Module({
	controllers: [VideoController],
	providers: [VideoService],
	imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class VideoModule {}
