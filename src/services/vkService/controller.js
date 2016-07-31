export default class VKService {
    constructor($q) {
        'ngInject';

        this.$q = $q;
        this.ownerId = '-53351722';
    }

    initWidgetsComments({ elementId, pageUrl, pageId }) {
        this._getVK().Widgets.Comments(elementId, {
            redesign: 1,
            limit: 10,
            attach: '*',
            pageUrl
        }, pageId);
    }

    getPhotoGallery({ albumId }) {
        const methodName = 'photos.get';
        return this.$q((resolve) => {
            this._getVK().api(methodName, {
                owner_id: this.ownerId,
                album_id: albumId,
                v: '5.53',
                photo_sizes: 0,
                extended: 0
            }, (data) => {
                resolve(data.response);
            });
        });
    }

    _getVK() {
        return window.VK;
    }
}