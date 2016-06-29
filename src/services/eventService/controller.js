export default class EventService {
    constructor($firebaseArray, $firebaseObject) {
        'ngInject';

        const ref = firebase.database().ref('events');
        this.list = $firebaseArray(ref);

        this.$firebaseObject = $firebaseObject;
    }

    loadEvents() {
        return this.list.$loaded();
    }

    getEvent(key) {
        const obj = this._getEventObj(key);
        return obj.$loaded();
    }

    saveEvent(key, data) {
        const obj = this._getEventObj(key);
        Object.assign(obj, data, {
            editTimestamp: Date.now()
        });
        return obj.$save();
    }

    addEvent(data) {
        return this.list.$add({
                ...data,
                createTimestamp: Date.now()
            });
    }

    removeEvent(key) {
        const obj = this._getEventObj(key);
        return obj.$remove();
    }

    _getEventObj(key) {
        const ref = firebase.database().ref(`events/${key}`);
        return this.$firebaseObject(ref);
    }
};
