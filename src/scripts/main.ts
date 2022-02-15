import '../style/index.scss';
import {ControllerGallery} from './MVC/Controllers/ControllerGallery';
import {ModelGallery} from './MVC/Models/ModelGallery';
import {BackendAgent} from './MVC/Models/BackendAgent';
import {ViewGallery} from './MVC/Views/ViewGallery';

const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const model: Document = document;
const defaultCardsOnPage = 8;

const galleryNode: HTMLElement =
    model.querySelector('#gallery') ?? model.createElement('div');
// const sliderNode: HTMLElement =
//     model.querySelector('#slider') ?? model.createElement('div');

const galleryOnPage = new ControllerGallery(
    new ModelGallery(new BackendAgent(usersUrl, albumsUrl)),
    new ViewGallery(model, galleryNode),
    defaultCardsOnPage
);

model.addEventListener('DOMContentLoaded', async () => {
    await galleryOnPage.init();
});
