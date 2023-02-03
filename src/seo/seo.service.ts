import { Injectable } from '@nestjs/common';
import { SitemapStream, streamToPromise } from 'sitemap';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeoService {
  constructor(private readonly userService: UserService) {}

  async findSitemap() {
    const staticLinks = [
      { url: '/', changefreq: 'daily', priority: 0.3 },
      { url: '/feed', changefreq: 'daily', priority: 0.6 },
      { url: '/search', changefreq: 'daily', priority: 0.3 },
      { url: '/rating', changefreq: 'daily', priority: 0.6 },
      { url: '/following', changefreq: 'daily', priority: 0.3 },
    ];
    const smStream = new SitemapStream({
      hostname: process.env.CLIENT,
    });
    const users = await this.userService.getRepository().find({ select: ['nickname'] });
    staticLinks.forEach((staticLink) => smStream.write(staticLink));
    users.forEach(({ nickname }) =>
      smStream.write({ url: `/${nickname}`, changefreq: 'daily', priority: 0.9 }),
    );
    smStream.end();

    return streamToPromise(smStream);
  }
}
