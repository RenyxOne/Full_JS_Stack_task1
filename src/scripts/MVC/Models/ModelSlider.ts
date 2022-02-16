import {Photo} from '../../Types';
import {ViewSlider} from '../Views/ViewSlider';

export class ModelSlider {
    private view: ViewSlider | null;

    private photos: Array<Photo>;

    private photosCount: number;

    private currentPhotoIndex: number;

    private currentPhoto: Photo | null;

    constructor() {
        this.photos = [];
        this.currentPhoto = null;
        this.photosCount = 0;
        this.currentPhotoIndex = 0;
        this.view = null;
    }

    public setPhotos(photos: Array<Photo>): void {
        this.photos = photos;
        this.currentPhotoIndex = 0;
        this.photosCount = photos.length;
        this.initCurrentPhoto();
    }

    public setView(view: ViewSlider) {
        this.view = view;
    }

    private initCurrentPhoto() {
        if (!this.photosCount) {
            return;
        }

        this.currentPhoto = this.photos[this.currentPhotoIndex];

        if (!this.view) {
            return;
        }

        this.view.setPhoto({
            title: this.currentPhoto.title,
            photoUrl: this.currentPhoto.url,
            numberOfCount: `${this.currentPhotoIndex + 1} of ${
                this.photosCount
            }`,
        });
    }

    public nextPhoto() {
        this.currentPhotoIndex += 1;
        if (this.currentPhotoIndex >= this.photosCount) {
            this.currentPhotoIndex = 0;
        }
        this.initCurrentPhoto();
    }

    public prevPhoto() {
        this.currentPhotoIndex -= 1;
        if (this.currentPhotoIndex < 0) {
            this.currentPhotoIndex = this.photosCount - 1;
        }
        this.initCurrentPhoto();
    }
}
