export default class EventsListPageController {
    constructor(EventService) {
        'ngInject';

        this.EventService = EventService;

        this._initFilterHandlers();

        this._loadEvents();
    }

    _loadEvents() {
        this._startProgress();
        this.EventService.loadEvents()
            .then(result => {
                this._stopProgress();
                this.filtredEvents = this.events = result;
            });
    }

    _startProgress() {
        this.progress = true;
    }

    _stopProgress() {
        this.progress = false;
    }

    _initFilterHandlers() {
        this.filterHandlers = {
            onChangeFilter: filter => {
                this.filtredEvents = !filter.length ? this.events : this.events.filter(event => {
                    return filter.some(item => item === event.tag);
                });
            }
        };
    }
};
