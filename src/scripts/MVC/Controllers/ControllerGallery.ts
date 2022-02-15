import {ModelGallery} from '../Models/ModelGallery';
import {ViewGallery} from '../Views/ViewGallery';

export class ControllerGallery {
    constructor(
        private model: ModelGallery,
        private view: ViewGallery,
        private CardsOnStart: number
    ) {}

    async init() {
        await Promise.all([this.model.initAlbums(), this.model.initUsers()]);
        this.model.setView(this.view);

        await this.LoadMoreAlbums();

        this.view.setBtnClickEvent(async () => {
            await this.LoadMoreAlbums();
        });
    }

    async LoadMoreAlbums() {
        const arr: Array<Promise<any>> = [];
        for (let i = 0; i < this.CardsOnStart; i += 1) {
            arr.push(this.model.getOneMoreAlbumOnPage());
        }
        await Promise.all(arr);
    }
}
