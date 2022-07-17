import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { Base } from '../utils/base'
import { VideoEntity } from '../video/video.entity'

@Entity('Comment')
export class CommentEntity extends Base {
	@Column({ type: 'text' })
	message: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => VideoEntity, video => video.comments)
	@JoinColumn({ name: 'video_id' })
	video: VideoEntity
}
