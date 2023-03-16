import { Image } from "./image";

export interface IMetadata {
  data: Data;
}

interface Data {
  websiteInfo: WebsiteInfo;
}

interface WebsiteInfo {
  metatags: Metatags;
  keyword: Keyword[]
}

interface Metatags {
  title: string;
  description: string;
  image: Image;
  twitterCard: any;
}

export interface Keyword {
  name: string
}