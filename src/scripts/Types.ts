export type User = {
    id: Id;
    name: string;
    username: string;
};

export type Album = {
    userId: Id;
    id: Id;
    title: string;
    photos?: Array<Photo>;
};

export type SliderPhoto = {
    title: string;
    photoUrl: string;
    numberOfCount: string;
};

export type Photo = {
    albumId: Id;
    id: Id;
    title: string;
    url: string;
    thumbnailUrl: string;
};

export type GalleryCardTemplate = {
    preview: string;
    title: string;
    author: string;
};

export type Id = number | string;
