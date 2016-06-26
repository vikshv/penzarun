export default class EventsListPageController {
    constructor($state, EventService) {
        'ngInject';

        this.$state = $state;
        this.EventService = EventService;

        this._initEventsListHandler();

        this._loadEvents();
    }

    _loadEvents() {
        this._startProgress();
        this.EventService.loadEvents()
            .then(result => {
                this._stopProgress();
                this.events = result;
            });
    }

    _startProgress() {
        this.progress = true;
    }

    _stopProgress() {
        this.progress = false;
    }

    _initEventsListHandler() {
        this.eventsListHandler = {
            onClickEvent: id => this._gotoEventPage(id)
        };
    }

    _gotoEventPage(id) {
        this.$state.go('events.card', { id });
    }
};
