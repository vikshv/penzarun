export default class EventService {
    constructor(FirebaseService, $firebaseArray, $firebaseObject) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        const ref = firebase.database().ref('events').orderByChild('date');

        this.list = $firebaseArray(ref);
        this.$firebaseObject = $firebaseObject;
    }

    loadEvents() {
        return this.list.$loaded();
    }

    getEvent(key) {
        const obj = this._getEventObj(key);
        return obj.$loaded()
            .then(result => {
                const { 
                    $id, 
                    date,
                    time,
                    title, 
                    abstract, 
                    description, 
                    tag = 'event', 
                    place, 
                    distances,
                    master,
                    masterUrl,
                    masterPerson,
                    masterPhone,
                    masterEmail
                } = result;

                return {
                    id: $id,
                    date,
                    time,
                    title,
                    abstract,
                    description,
                    tag,
                    date: new Date(date),
                    place,
                    distances,
                    master,
                    masterUrl,
                    masterPerson,
                    masterPhone,
                    masterEmail
                };
            });
    }

    getDefaultEvent() {
        return {
            tag: 'event',
            time: '11:00'
        };
    }

    saveEvent(key, data) {
        const obj = this._getEventObj(key);
        Object.assign(obj, data, {
            editTimestamp: Date.now()
        });
        return obj.$save()
            .then(ref => {
                return ref.key;
            });
    }

    addEvent(data) {
        return this.list.$add({
                ...data,
                createTimestamp: Date.now()
            })
            .then(ref => {
                return ref.key;
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
