export default class EventService {
    constructor(FirebaseService, $firebaseArray, $firebaseObject) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        this.ref = firebase.database().ref('events');

        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
    }

    loadEvents(options) {
        const ref = options ? this.ref.orderByChild(options.key).equalTo(options.value) : this.ref.orderByChild('date');
        const list = this.$firebaseArray(ref);
        return list.$loaded();
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
        const list = this.$firebaseArray(this.ref);
        return list.$add({
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
