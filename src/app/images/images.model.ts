export interface ImageModel {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface AlbumModel {
  userId: number;
  id: number;
  title: string;
}
