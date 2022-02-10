export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export class Album {
  private userIdField: number | undefined;

  private idField: number | undefined;

  private titleField: string | undefined;

  readonly albumUrl: string;

  readonly authorUrl: string;

  private readonly photos: Array<Photo>;

  constructor(albumUrl: string, AuthorUrl: string) {
    this.albumUrl = albumUrl;
    this.authorUrl = AuthorUrl;
    this.photos = [];
  }

  public async init() {
    try {
      const photosResponse = await fetch(`${this.albumUrl}/photos`);
      const photosArray = await photosResponse.json();

      for (const photo of photosArray) {
        this.photos.push(photo);
      }

      const albumResponse = await fetch(this.albumUrl);
      const albumInfo = await albumResponse.json();

      this.userIdField = albumInfo.userId;
      this.idField = albumInfo.id;
      this.titleField = albumInfo.title;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  getPhoto(photoIndex: number): Photo {
    return this.photos[photoIndex];
  }

  getSize(): number {
    return this.photos.length;
  }

  get title(): string {
    return this.titleField ?? 'noTitle';
  }

  get id(): number | undefined {
    return this.idField;
  }

  get userId(): number | undefined {
    return this.userIdField;
  }
}
