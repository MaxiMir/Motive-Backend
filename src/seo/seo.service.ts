import { Injectable } from '@nestjs/common';
import { SitemapStream, streamToPromise } from 'sitemap';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeoService {
  constructor(private readonly userService: UserService) {}

  async findSitemap() {
    const staticLinks = [
      { url: '/', changefreq: 'monthly', priority: 0.3 },
      { url: '/feed', changefreq: 'daily', priority: 0.6 },
      { url: '/search', changefreq: 'daily', priority: 0.3 },
      { url: '/rating', changefreq: 'daily', priority: 0.6 },
      { url: '/following', changefreq: 'daily', priority: 0.3 },
      { url: '/articles', changefreq: 'daily', priority: 0.8 },
      { url: '/articles/how-to-accomplish-your-goals', changefreq: 'daily', priority: 0.8 },
      { url: '/contact', changefreq: 'monthly', priority: 0.8 },
      { url: '/donate', changefreq: 'monthly', priority: 0.8 },
    ];
    const smStream = new SitemapStream({ hostname: process.env.CLIENT });
    const users = await this.userService.getRepository().find({ select: ['nickname'] });
    staticLinks.forEach((staticLink) => smStream.write(staticLink));
    users.forEach(({ nickname }) =>
      smStream.write({ url: `/${nickname}`, changefreq: 'daily', priority: 0.9 }),
    );
    smStream.end();

    return streamToPromise(smStream);
  }
}
