import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VideoEntity } from './video.entity'
import { ILike, MoreThan, Repository } from 'typeorm'
import { VideoDto } from './dto/video.dto'
import { FindOptionsWhereProperty } from 'typeorm'

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(VideoEntity)
		private readonly videoRepository: Repository<VideoEntity>
	) {}

	async getVideoById(id: number, isPublic = false) {
		const video = await this.videoRepository.findOne({
			where: isPublic
				? {
						id,
						isPublic: true
				  }
				: {
						id
				  },
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
					subscribersCount: true,
					subscriptions: true
				},
				comments: {
					message: true,
					id: true,
					user: {
						id: true,
						name: true,
						avatarPath: true,
						isVerified: true,
						subscribersCount: true
					}
				}
			}
		})

		if (!video) throw new NotFoundException('Видео не найдено.')
		return video
	}

	async update(id: number, dto: VideoDto) {
		const video = await this.getVideoById(id)

		return this.videoRepository.save({
			...video,
			...dto
		})
	}

	async getAllVideos(searchTerm?: string) {
		let options: FindOptionsWhereProperty<VideoEntity> = {}

		if (searchTerm) {
			options = {
				name: ILike(`%${searchTerm}`)
			}
		}

		return this.videoRepository.find({
			where: {
				...options,
				isPublic: true
			},
			order: {
				createdAt: 'DESC'
			},
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true
				}
			}
		})
	}

	async getMostPopularByViews() {
		return this.videoRepository.find({
			where: {
				views: MoreThan(0)
			},
			relations: {
				user: true
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true
				}
			},
			order: {
				views: -1
			}
		})
	}

	async createVideo(userId: number) {
		const defaultValue = {
			name: '',
			user: { id: userId },
			videoPath: '',
			description: '',
			thumbnailPath: ''
		}

		const newVideo = this.videoRepository.create(defaultValue)
		const video = await this.videoRepository.save(newVideo)
		return video
	}

	async deleteVideo(id: number) {
		return this.videoRepository.delete({ id })
	}

	async updateCountViews(id: number) {
		const video = await this.getVideoById(id)
		video.views++
		return this.videoRepository.save(video)
	}

	async updateReaction(id: number) {
		const video = await this.getVideoById(id)
		video.likes++
		return this.videoRepository.save(video)
	}
}
