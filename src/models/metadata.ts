import type { Image } from './image';

export interface IMetadata {
  data: Data;
}

interface Data {
  websiteInfo: WebsiteInfo;
}

interface WebsiteInfo {
  keyword: Keyword[];
  metatags: Metatags;
}

interface Metatags {
  description: string;
  image: Image;
  title: string;
  twitterCard: any;
}

export interface Keyword {
  name: string;
}
