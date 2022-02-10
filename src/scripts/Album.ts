export type Photo = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export class Album {
    private _userId: number | undefined;
    private _id: number | undefined;
    private _title: string | undefined;
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

            this._userId = albumInfo.userId;
            this._id = albumInfo.id;
            this._title = albumInfo.title;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }

    getPhoto(photoIndex: number): Photo {
        return this.photos[photoIndex];
    }

    getSize(): number{
        return this.photos.length;
    }

    get title(): string {
        return this._title ?? 'noTitle';
    }
    get id(): number | undefined {
        return this._id;
    }
    get userId(): number | undefined {
        return this._userId;
    }
}
