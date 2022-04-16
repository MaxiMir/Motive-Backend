import { Controller, Get, Response } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeoService } from './seo.service';

@Controller('seo')
@ApiTags('Seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('sitemap.xml')
  @ApiOperation({ summary: 'Get sitemap' })
  async getSitemap(@Response() res) {
    const sitemap = await this.seoService.findSitemap();

    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
  }
}
