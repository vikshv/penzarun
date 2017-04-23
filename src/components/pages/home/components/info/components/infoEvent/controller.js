export default class InfoEventController {
    constructor(EventService) {
        'ngInject';

        this._loadEvents(EventService);
    }

    _loadEvents(EventService) {
        const options = {
            dateBegin: Date.now(),
            limitToFirst: 4
        };
        this._startLoadProgress();
        EventService.loadEvents(options)
            .then(result => {
                this.events = result.slice(1, options.limitToFirst);
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
}
