import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Body,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('link')
export class LinksController {
  constructor(private linkService: LinksService) {}

  @Get()
  async getLinks() {
    return await this.linkService.findAllLinks();
  }

  @Get('/:id')
  async getOneLink(@Param('id') id: string) {
    const link = await this.linkService.findOneLinkById(Number(id));
    if (!link) throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    return link;
  }

  @Post()
  async createLink(@Body() dto: CreateLinkDto) {
    const link = await this.linkService.findOneLinkByPath(dto.linkPath);
    if (link)
      throw new HttpException('Link already exist', HttpStatus.BAD_REQUEST);
    return await this.linkService.createLink(dto);
  }

  @Put('/:id')
  async updateLink(@Body() dto: CreateLinkDto, @Param('id') id: string) {
    const link = await this.linkService.findOneLinkById(Number(id));
    if (!link) throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    return await this.linkService.updateLink(Number(id), dto);
  }

  @Delete('/:id')
  async deleteLink(@Param('id') id: string) {
    const response = await this.linkService.deleteLink(Number(id));
    if (!response.affected)
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    return 'Link was deleted successfully';
  }
}
