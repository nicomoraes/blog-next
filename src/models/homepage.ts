export interface IHomePageRoot {
  data: Data;
}

export interface Data {
  myinfo: Myinfo;
  allSocialMds: AllSocialMd[];
  allTechnologies: AllTechnology[];
  allRepositories: AllRepository[];
  allPosts: AllPost[];
}

export interface Image {
  url: string;
}

export interface Myinfo {
  photo: Image;
  role: string;
  phrase: string;
}

export interface AllSocialMd {
  id: string;
  name: string;
  link: string;
  logo: Image;
}


export interface AllTechnology {
  id: string;
  name: string;
  logo: Image;
}

export interface AllRepository {
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

export interface AllPost {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  tag: Tag;
  _createdAt: string;
}

export interface Tag {
  name: string;
}
