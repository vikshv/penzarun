export default class EventsListPageController {
    constructor(EventService) {
        'ngInject';

        this.EventService = EventService;

        this._loadEvents();
    }

    _loadEvents() {
        this._startProgress();
        this.EventService.loadEvents()
            .then(result => {
                //this._stopProgress();
                this.events = result;
            });
    }

    _startProgress() {
        this.progress = true;
    }

    _stopProgress() {
        this.progress = false;
    }
};
