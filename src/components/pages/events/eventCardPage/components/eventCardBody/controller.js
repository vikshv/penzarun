const Kb = 1024;
const Mb = Kb * Kb;

export default class EventCardBodyController {
    constructor($sce, $state) {
        'ngInject';
        
        this.$sce = $sce;
        this.$state = $state;

        this._initVKComments();
    }

    _initVKComments() {
        const id = this.event.id
        const href = this.$state.href('events.card', { id });
        const pageUrl = `http://penzarun.ru/${href}`;

        VK.Widgets.Comments('vk_comments', {
            redesign: 1,
            limit: 10,
            attach: '*',
            pageUrl
        }, `event-${id}`);
    }

    getDescriptionHtml() {
        return this.$sce.trustAsHtml(this.event.description);
    }

    getFileSize() {
        let result;
        if (Mb < this.provisionFileSize) {
            const size = this.provisionFileSize / Mb;
            result = `${size.toFixed()} Мб`;
        } else {
            const size = this.provisionFileSize / Kb;
            result = `${size.toFixed()} Кб`;
        }
        return result;
    }
};
