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
    private albumUrl: string;
    private photos: Array<Photo>;

    constructor(albumUrl: string) {
        this.albumUrl = albumUrl;
        this.photos = [];
    }

    public async init() {
        await fetch(this.albumUrl + '/photos')
            .then(response => response.json())
            .then(arrFromJson => arrFromJson.forEach(
                (photo: Photo) =>
                    this.photos.push(photo)));

        await fetch(this.albumUrl)
            .then(response => response.json())
            .then(json => {
                this._userId = json.userId;
                this._id = json.id;
                this._title = json.title;
            });
    }

    getPhoto(photoIndex: number): Photo {
        return this.photos[photoIndex];
    }

    getSize(): number{
        return this.photos.length;
    }

    get title(): string {
        return this._title as string;
    }
    get id(): number | undefined {
        return this._id;
    }
    get userId(): number | undefined {
        return this._userId;
    }
}
