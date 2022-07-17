import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	Delete
} from '@nestjs/common'
import { VideoService } from './video.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { VideoDto } from './dto/video.dto'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get('get-private/:id')
	@Auth()
	async getVideoPrivate(@CurrentUser('id') id: string) {
		return this.videoService.getVideoById(+id, true)
	}

	@Get()
	async getAllVideos(@Query('searchTerm') searchTerm?: string) {
		return this.videoService.getAllVideos(searchTerm)
	}

	@Get('most-popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}

	@Get(':id')
	async getVideo(@Param('id') id: string) {
		return this.videoService.getVideoById(+id)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo(@CurrentUser('id') id: number) {
		return this.videoService.createVideo(id)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
		return this.videoService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.videoService.deleteVideo(+id)
	}

	@HttpCode(200)
	@Put('update-views/:videoId')
	async updateViews(@Param('videoId') videoId: string) {
		return this.videoService.updateCountViews(+videoId)
	}

	@HttpCode(200)
	@Put('update-likes/:videoId')
	@Auth()
	async updateLikes(@Param('videoId') videoId: string) {
		return this.videoService.updateReaction(+videoId)
	}
}
