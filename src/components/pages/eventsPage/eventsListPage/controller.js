export default class EventsListPageController {
    constructor(EventService) {
        'ngInject';

        this.EventService = EventService;

        this._loadEvents();
    }

    _loadEvents() {
        this.EventService.loadEvents()
            .then(result => {
                this.events = result;
            });
    }
};
