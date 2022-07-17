import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { VideoModule } from './video/video.module'
import { CommentModule } from './comment/comment.module'
import { AuthModule } from './auth/auth.module'
import { getTypeOrmConfig } from './config/typeorm.config'
import { UserEntity } from './user/user.entity'
import { VideoEntity } from './video/video.entity'
import { CommentEntity } from './comment/comment.entity'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			database: 'meowtube',
			username: 'postgres',
			password: 'root',
			autoLoadEntities: true,
			synchronize: true
		}),
		TypeOrmModule.forFeature([VideoEntity, CommentEntity, UserEntity]),
		UserModule,
		VideoModule,
		CommentModule,
		AuthModule
	]
})
export class AppModule {}
