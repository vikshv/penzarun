export default class EventCardBodyController {
    constructor($sce) {
        'ngInject';
        
        this.$sce = $sce;
    }

    getDescriptionHtml() {
        return this.$sce.trustAsHtml(this.event.description);
    }
};
