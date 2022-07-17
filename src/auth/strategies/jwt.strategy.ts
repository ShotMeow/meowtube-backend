import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../../user/user.entity'
import { Repository } from 'typeorm'
import { ExtractJwt, Strategy } from 'passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({ id }: Pick<UserEntity, 'id'>) {
		return this.userRepository.findBy({ id })
	}
}
