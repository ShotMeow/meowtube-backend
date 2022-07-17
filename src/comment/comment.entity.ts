import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { JoinColumn } from 'typeorm/browser'
import { Base } from '../utils/base'
import { SubscriptionEntity } from '../user/subscription.entity'
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
