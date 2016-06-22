export default class EventService {
    constructor($q, $firebaseArray) {
        'ngInject';

        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
    }

    load() {
        const ref = firebase.database().ref().child('events');
        const query = ref.limitToLast(10);

        return this.$firebaseArray(query);
    }
};
