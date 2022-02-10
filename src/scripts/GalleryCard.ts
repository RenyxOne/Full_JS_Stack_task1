import {Album} from "./Album";

export class GalleryCard {
    private model: Document;
    private album: Album;
    private previewImg: string;
    private cardTitle: string;
    private clickFunc: Function;

    private cardDomElement: HTMLElement;

    constructor(model: Document, album: Album, onClick: Function) {
        this.model = model;
        this.album = album;
        this.previewImg = '';
        this.cardTitle = album.title;
        this.cardDomElement = this.model.createElement('div');
        this.clickFunc = onClick;
    }

    async init() {
        await this.initMainArea();
        await this.initFooterArea();
    }

    private initMainArea() {
        this.cardDomElement.classList.add('card');
        const cardMain = this.model.createElement('div');
        cardMain.classList.add('card__main');
        cardMain.innerHTML = `
            <img class="card__img" src="${this.album.getPhoto(0).thumbnailUrl}" alt="">
            <div class="card__overlay">
                <div class="card__description">
                    <span class="card__title">${this.album.title}</span>
                </div>
            </div>
        `
        cardMain.addEventListener('click', () => this.clickFunc());
        this.cardDomElement.appendChild(cardMain);
    }

    private async initFooterArea() {
        const author = await fetch(this.album.authorUrl);
        const authorJson = await author.json();

        const cardFooter = this.model.createElement('div');
        cardFooter.innerHTML = `
            <div class="card__author">${authorJson.name}</div>
        `;
        this.cardDomElement.appendChild(cardFooter);
    }

    public getNode(): HTMLElement {
        return this.cardDomElement;
    }
}
