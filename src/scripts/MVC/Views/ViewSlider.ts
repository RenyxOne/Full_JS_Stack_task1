import {SliderPhoto} from '../../Types';

export class ViewSlider {
    private readonly overlay: HTMLDivElement;

    private readonly windowModal: HTMLDivElement;

    private readonly windowHeader: HTMLDivElement;

    private readonly title: HTMLDivElement;

    private readonly windowMain: HTMLDivElement;

    private readonly slider: HTMLDivElement;

    private readonly photo: HTMLImageElement;

    private readonly leftArrow: HTMLDivElement;

    private readonly rightArrow: HTMLDivElement;

    private readonly windowFooter: HTMLDivElement;

    private readonly numberOfCount: HTMLDivElement;

    constructor(private domModel: Document, private element: HTMLElement) {
        this.element.classList.add('my-modal');

        this.overlay = this.domModel.createElement('div');
        this.overlay.classList.add('my-modal__overlay');
        this.element.appendChild(this.overlay);

        this.windowModal = this.domModel.createElement('div');
        this.windowModal.classList.add('my-modal__window', 'window');
        this.overlay.appendChild(this.windowModal);

        this.windowHeader = this.domModel.createElement('div');
        this.windowHeader.classList.add('window__header');
        this.windowModal.appendChild(this.windowHeader);

        this.title = this.domModel.createElement('div');
        this.title.classList.add('window__title', 'text-with-bg');
        this.windowHeader.appendChild(this.title);

        this.windowMain = this.domModel.createElement('div');
        this.windowMain.classList.add('window__main');
        this.windowModal.appendChild(this.windowMain);

        this.slider = this.domModel.createElement('div');
        this.slider.classList.add('slider');
        this.windowMain.appendChild(this.slider);

        this.photo = this.domModel.createElement('img');
        this.photo.classList.add('slider__img');
        this.slider.appendChild(this.photo);

        this.leftArrow = this.domModel.createElement('div');
        this.leftArrow.classList.add('slider__arrow-left');
        this.slider.appendChild(this.leftArrow);

        this.rightArrow = this.domModel.createElement('div');
        this.rightArrow.classList.add('slider__arrow-right');
        this.slider.appendChild(this.rightArrow);

        this.windowFooter = this.domModel.createElement('div');
        this.windowFooter.classList.add('window__footer');
        this.windowModal.appendChild(this.windowFooter);

        this.numberOfCount = this.domModel.createElement('div');
        this.numberOfCount.classList.add('window__counter', 'text-with-bg');
        this.windowFooter.appendChild(this.numberOfCount);
    }

    public open() {
        this.element.classList.add('my-modal--show');
    }

    public close() {
        this.element.classList.remove('my-modal--show');
    }

    public setPhoto(info: SliderPhoto) {
        this.title.innerText = info.title;
        this.photo.src = info.photoUrl;
        this.numberOfCount.innerText = info.numberOfCount;
    }

    public setEventLeftArrow(callback: () => void) {
        this.leftArrow.addEventListener('click', callback);
    }

    public setEventRightArrow(callback: () => void) {
        this.rightArrow.addEventListener('click', callback);
    }

    public setOverlayClick(callback: () => void) {
        this.overlay.addEventListener('click', (e) => {
            if (e.target !== this.overlay) return;
            callback();
        });
    }
}
