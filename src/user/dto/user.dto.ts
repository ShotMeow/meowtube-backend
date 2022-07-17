import { IsEmail, IsString } from 'class-validator'

export class UserDto {
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsString()
	password?: string

	@IsString()
	description: string

	@IsString()
	avatarPath: string
}
