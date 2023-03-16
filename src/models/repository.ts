import { Image } from './image'

export interface Repository {
  id: string;
  description: string;
  link: string;
  techs: Tech[];
  title: string;
}

export interface Tech {
  id: string;
  logo: Image;
}

