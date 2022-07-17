import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'

@Module({
	controllers: [CommentController],
	providers: [CommentService],
	imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class CommentModule {}
