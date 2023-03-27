import type { Myinfo } from '../my_Info';
import type { Post } from '../post';
import type { Repository } from '../repository';
import type { SocialMedia } from '../social_media';
import type { Technology } from '../technology';

export interface IHomePageQuery {
  data: Data;
}

export interface Data {
  myinfo: Myinfo;
  allSocialMds: SocialMedia[];
  allTechnologies: Technology[];
  allRepositories: Repository[];
  allPosts: Post[];
}
