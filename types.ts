export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  thumbnail?: string
}

export interface NewsroomMetadata {
  seo_title?: string
  seo_description?: string
  featured_image?: CosmicFile
  published_at?: string
  content?: string
}

export interface NewsroomArticle extends CosmicObject {
  type: 'newsroom'
  metadata: NewsroomMetadata
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}