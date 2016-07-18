export default class HomePageController {
    constructor(EventService) {
        'ngInject';
        
        this.EventService = EventService;

        this._loadEvent();
    }

    _loadEvent() {
        const date = Date.now();
        this._startLoadProgress();
        this.EventService.getNearEvent(date)
            .then(event => {
                this.event = event;
                return event.id;
            })
            .then(() => {
                this._stopLoadProgress();
            })
            .catch(error => {
                this._stopLoadProgress();
                throw Error(error);
            });
    }

    _startLoadProgress() {
        this.loadProgress = true;
    }

    _stopLoadProgress() {
        this.loadProgress = false;
    }
};
