import {ModelSlider} from '../Models/ModelSlider';
import {ViewSlider} from '../Views/ViewSlider';
import {Photo} from '../../Types';

export class ControllerSlider {
    constructor(private model: ModelSlider, private view: ViewSlider) {
        this.view.setEventRightArrow(() => this.nextPhoto());
        this.view.setEventLeftArrow(() => this.prevPhoto());
        this.view.setOverlayClick(() => this.view.close());
    }

    public openSlider(photos?: Array<Photo>) {
        if (!photos) return;
        this.model.setView(this.view);
        this.model.setPhotos(photos);
        this.view.open();
    }

    nextPhoto(): void {
        this.model.nextPhoto();
    }

    prevPhoto(): void {
        this.model.prevPhoto();
    }
}
// TODO sliderController and sliderModel and sliderView
