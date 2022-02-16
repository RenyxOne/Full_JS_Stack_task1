import {User, Album, Id, Photo} from './Types';

export class BackendAgent {
    constructor(
        private usersUrl: string,
        private albumsUrl: string,
        private errorHandler?: (e: any) => void
    ) {}

    async getUserArray(): Promise<Array<User>> {
        try {
            const response = await fetch(this.usersUrl);
            const json = await response.json();
            const array: Array<User> = [];
            for (const serverUser of json) {
                array.push({
                    id: serverUser.id,
                    name: serverUser.name,
                    username: serverUser.username,
                });
            }
            return array;
        } catch (e) {
            if (this.errorHandler) this.errorHandler(e);
            throw e;
        }
    }

    async getUserById(id: Id): Promise<User> {
        try {
            const response = await fetch(`${this.usersUrl}/${id}`);
            const json = await response.json();
            return {
                id: json.id,
                name: json.name,
                username: json.username,
            };
        } catch (e) {
            if (this.errorHandler) this.errorHandler(e);
            throw e;
        }
    }

    async getAlbumArray(): Promise<Array<Album>> {
        try {
            const response = await fetch(this.albumsUrl);
            const json = await response.json();
            const array: Array<Album> = [];
            for (const serverAlbum of json) {
                array.push({
                    userId: serverAlbum.userId,
                    id: serverAlbum.id,
                    title: serverAlbum.title,
                });
            }
            return array;
        } catch (e) {
            if (this.errorHandler) {
                this.errorHandler(e);
            }
            throw e;
        }
    }

    async getAlbumById(albumId: Id): Promise<Album> {
        try {
            const response = await fetch(`${this.albumsUrl}/${albumId}`);
            const json = await response.json();
            return {
                userId: json.userId,
                id: json.id,
                title: json.title,
            };
        } catch (e) {
            if (this.errorHandler) this.errorHandler(e);
            throw e;
        }
    }

    async getAlbumPhotosArray(albumId: Id) {
        try {
            const response = await fetch(`${this.albumsUrl}/${albumId}/photos`);
            const json = await response.json();
            const arr: Array<Photo> = [];
            for (const jsonElement of json) {
                arr.push({
                    albumId: jsonElement.albumId,
                    id: jsonElement.id,
                    title: jsonElement.title,
                    url: jsonElement.url,
                    thumbnailUrl: jsonElement.thumbnailUrl,
                });
            }
            return arr;
        } catch (e) {
            if (this.errorHandler) this.errorHandler(e);
            throw e;
        }
    }
}
