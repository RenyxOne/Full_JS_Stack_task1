import {BackendAgent} from './BackendAgent';
import {User, Album} from '../../Types';
import {ViewGallery} from '../Views/ViewGallery';

export class ModelGallery {
    private albumsArray: Array<Album>;

    private usersArray: Array<User>;

    private albumIter: Generator<Album | null>;

    private view: ViewGallery | null;

    constructor(private backendAgent: BackendAgent) {
        this.albumsArray = [];
        this.usersArray = [];
        this.albumIter = ModelGallery.generator(this.albumsArray);
        this.view = null;
    }

    private static generator = function* (
        arr: Array<Album>
    ): Generator<Album | null> {
        for (const arrElement of arr) {
            yield arrElement;
        }
        return null;
    };

    public async getOneMoreAlbumOnPage() {
        const album: Album = this.albumIter.next().value;

        if (album == null || !this.view) return;

        album.photos = await this.backendAgent.getAlbumPhotosArray(album.id);

        const albumAuthor = this.usersArray.find(
            (user) => user.id === album.userId
        );

        this.view.addNewCard(
            {
                preview: album.photos[0].thumbnailUrl,
                title: album.title,
                author: albumAuthor ? albumAuthor.name : 'unknown',
            },
            album
        );
    }

    public setView(view: ViewGallery) {
        this.view = view;
    }

    async initAlbums(): Promise<void> {
        const promiseWithArray = await this.backendAgent.getAlbumArray();
        for (const album of promiseWithArray) {
            this.albumsArray.push(album);
        }
    }

    async initUsers(): Promise<void> {
        const promiseWithArray = await this.backendAgent.getUserArray();
        for (const user of promiseWithArray) {
            this.usersArray.push(user);
        }
    }
}
