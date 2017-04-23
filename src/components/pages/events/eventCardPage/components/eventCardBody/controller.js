const Kb = 1024;
const Mb = Kb * Kb;

export default class EventCardBodyController {
    constructor($sce, VKService) {
        'ngInject';
        
        this.$sce = $sce;

        this._initVKPhotoGallery(VKService);
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
}
