import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { JoinColumn } from 'typeorm/browser'
import { Base } from '../utils/base'
import { SubscriptionEntity } from '../user/subscription.entity'
import { CommentEntity } from '../comment/comment.entity'

@Entity('Video')
export class VideoEntity extends Base {
	@Column({ default: '' })
	name: string

	@Column({ default: false, name: 'is_public' })
	isPublic: boolean

	@Column({ default: 0 })
	views: number

	@Column({ default: 0 })
	likes: number

	@Column({ default: 0 })
	duration: number

	@Column({ default: '', name: 'video_path' })
	videoPath: string

	@Column({ default: '', name: 'thumbnail_path' })
	thumbnailPath: string

	@ManyToOne(() => UserEntity, user => user.videos)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToMany(() => CommentEntity, comment => comment.video)
	@JoinColumn({ name: 'user_id' })
	comments: CommentEntity[]
}
