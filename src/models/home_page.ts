import { Myinfo } from "./my_Info";
import { Post } from "./post";
import { Repository } from "./repository";
import { SocialMedia } from "./social_media";
import { Technology } from "./technology";

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



