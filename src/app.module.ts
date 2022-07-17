import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { VideoModule } from './video/video.module'
import { CommentModule } from './comment/comment.module'
import { AuthModule } from './auth/auth.module'
import { MediaModule } from './media/media.module';

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
		UserModule,
		VideoModule,
		CommentModule,
		AuthModule,
		MediaModule
	]
})
export class AppModule {}
