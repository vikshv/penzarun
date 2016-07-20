export default class UpdateService {
    constructor(FirebaseService, $firebaseArray) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        this.ref = firebase.database().ref('updates');
        this.$firebaseArray = $firebaseArray;
    }

    loadUpdates(options) {
        const ref = options ? this._getRefByOptions(options) : this.ref;
        const list = this.$firebaseArray(ref);
        return list.$loaded();
    }

    _getRefByOptions({ dateBegin, dateEnd, limitToLast }) {
        let result = this.ref;
        if (dateBegin) {
            result = result.startAt(dateBegin);
        }
        if (dateEnd) {
            result = result.endAt(dateEnd);
        }
        if (limitToLast) {
            result = result.limitToLast(limitToLast);
        }
        return result;
    }
};
