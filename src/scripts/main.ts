import '../style/index.scss';
import {ControllerGallery} from './MVC/Controllers/ControllerGallery';
import {ModelGallery} from './MVC/Models/ModelGallery';
import {BackendAgent} from './BackendAgent';
import {ViewGallery} from './MVC/Views/ViewGallery';
import {ControllerSlider} from './MVC/Controllers/ControllerSlider';
import {ModelSlider} from './MVC/Models/ModelSlider';
import {ViewSlider} from './MVC/Views/ViewSlider';

const albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const model: Document = document;
const defaultCardsOnPage = 8;

const galleryNode: HTMLElement =
    model.querySelector('#gallery') ?? model.createElement('div');
const sliderNode: HTMLElement =
    model.querySelector('#slider') ?? model.createElement('div');

const slider = new ControllerSlider(
    new ModelSlider(),
    new ViewSlider(model, sliderNode)
);

const galleryOnPage = new ControllerGallery(
    new ModelGallery(new BackendAgent(usersUrl, albumsUrl), slider),
    new ViewGallery(model, galleryNode),
    defaultCardsOnPage
);

model.addEventListener('DOMContentLoaded', async () => {
    await galleryOnPage.init();
});
