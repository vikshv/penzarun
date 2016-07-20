export default class UpdatesController {
    constructor(UpdateService) {
        'ngInject';

        this._loadUpdates(UpdateService);
    }

    _loadUpdates(UpdateService) {
        const options = {
            limitToLast: 3
        };
        this._startLoadProgress();
        UpdateService.loadUpdates(options)
            .then(result => {
                this.updates = result;
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
