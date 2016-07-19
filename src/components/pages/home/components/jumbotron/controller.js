export default class JumbotronController {
    constructor(EventService) {
        'ngInject';
        this._loadEvent(EventService);
    }

    _loadEvent(EventService) {
        const options = {
            dateBegin: Date.now(),
            limitToFirst: 1
        };
        this._startLoadProgress();
        EventService.loadEvents(options)
            .then(result => {
                this.event = result[0];
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
