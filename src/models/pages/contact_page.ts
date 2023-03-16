import { SocialMedia } from "../social_media"

export interface IContactPageQuery {
  data: Data
}

export interface Data {
  allSocialMds: SocialMedia[]
}