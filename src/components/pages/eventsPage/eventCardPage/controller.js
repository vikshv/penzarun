export default class EventCardPageController {
    constructor(EventService) {
        'ngInject';
        
        this.EventService = EventService;
        
        this._initEvent();
    }

    _initEvent() {
        if (this.id) {
            this._startLoadProgress();
            this.EventService.getEvent(this.id)
                .then(result => {
                    const { $id, date, title, abstract, description, tag = 'event' } = result;
                    this.event = {
                        $id,
                        date,
                        title,
                        abstract,
                        description,
                        tag,
                        date: new Date(date)
                    };
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
