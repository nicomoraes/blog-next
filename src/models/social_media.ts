import { Image } from './image';

export interface SocialMedia {
  id?: string;
  islink?: boolean;
  link: string;
  logo: Image;
  name: string;
}
