export default class EventCardPageController {
    constructor(EventService, AuthService) {
        'ngInject';
        
        this.EventService = EventService;
        this.AuthService = AuthService;
        
        this._initEvent();
    }

    getAuth() {
        return this.AuthService.getAuth();
    }

    _initEvent() {
        if (this.id) {
            this._startLoadProgress();
            this.EventService.getEvent(this.id)
                .then(event => {
                    this.event = event;
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
};
