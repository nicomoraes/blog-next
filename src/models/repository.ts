import { Image } from './image'

export interface Repository {
  id: string;
  title: string;
  description: string;
  link: string;
  techs: Tech[];
}

export interface Tech {
  id: string;
  logo: Image;
}

