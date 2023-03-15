import { Image } from "./image";

export interface IMetadata {
  data: Data;
}

interface Data {
  websiteInfo: WebsiteInfo;
}

interface WebsiteInfo {
  metatags: Metatags;
}

interface Metatags {
  title: string;
  description: string;
  image: Image;
  twitterCard: any;
}