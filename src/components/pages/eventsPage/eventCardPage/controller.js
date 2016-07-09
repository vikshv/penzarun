export default class EventCardPageController {
    constructor($sce, EventService, ProvisionFileService) {
        'ngInject';
        
        this.$sce = $sce;
        this.EventService = EventService;
        this.ProvisionFileService = ProvisionFileService;
        
        this._initEvent();
    }

    _initEvent() {
        if (this.id) {
            this._startLoadProgress();
            this.EventService.getEvent(this.id)
                .then(event => {
                    this.event = event;
                    return event.id;
                })
                .then(id => {
                    return this.ProvisionFileService.getUrl(id, 'Положение');
                })
                .then(url => {
                    this.provisionFileUrl = url;
                })
                .then(() => {
                    this._stopLoadProgress();
                })
                .catch(error => {
                    this._stopLoadProgress();
                    throw Error(error);
                });
        } else {
            this.event = {};
        }
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }

    getDescriptionHtml() {
        return this.$sce.trustAsHtml(this.event.description);
    }
};
