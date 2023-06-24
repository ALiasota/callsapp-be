import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './links.entity';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async createLink(dto: CreateLinkDto) {
    const link = this.linksRepository.create(dto);
    return await this.linksRepository.save(link);
  }

  async findAllLinks() {
    return this.linksRepository.find();
  }

  async findOneLinkByPath(linkPath: string) {
    return this.linksRepository.findOneBy({ linkPath });
  }

  async findOneLinkById(id: number) {
    return this.linksRepository.findOneBy({ id });
  }

  async updateLink(id: number, dto: CreateLinkDto) {
    const link = await this.findOneLinkById(id);
    if (!link) {
      throw new HttpException(`Link not found`, HttpStatus.FORBIDDEN);
    }

    const updatedLink = Object.assign(link, dto);
    return await this.linksRepository.save(updatedLink);
  }

  async deleteLink(id: number) {
    return await this.linksRepository.delete(id);
  }
}
