const Kb = 1024;
const Mb = Kb * Kb;

export default class EventCardBodyController {
    constructor($sce, $state, VKService) {
        'ngInject';
        
        this.$sce = $sce;
        this.$state = $state;

        this._initVKComments(VKService);
        this._initVKPhotoGallery(VKService);
    }

    _initVKComments(VKService) {
        const id = this.event.id
        const href = this.$state.href('events.card', { id });

        VKService.initWidgetsComments({
            elementId: 'vk_comments',
            pageUrl: `http://penzarun.ru/${href}`,
            pageId: `event-${id}`
        })
    }

    _initVKPhotoGallery(VKService) {
        const { vkAlbumPhotoId } = this.event;
        if (vkAlbumPhotoId) {
            VKService.getPhotoGallery({
                    albumId: vkAlbumPhotoId
                })
                .then((result) => {
                    const { items } = result;
                    this.slides = items.map((item, index) => {
                        return {
                            id: index,
                            image: item.photo_604,
                            text: item.text
                        };
                    });
                });
        }
    }

    getDescriptionHtml() {
        return this.$sce.trustAsHtml(this.event.description);
    }

    getFileSize(fileSize) {
        let result;
        if (Mb < fileSize) {
            const size = fileSize / Mb;
            result = `${size.toFixed()} Мб`;
        } else {
            const size = fileSize / Kb;
            result = `${size.toFixed()} Кб`;
        }
        return result;
    }
};
