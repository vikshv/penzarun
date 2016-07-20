export default class NewsService {
    constructor(FirebaseService, $firebaseArray, $firebaseObject) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        this.ref = firebase.database().ref('news');
        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
    }

    loadNews(options) {
        const ref = options ? this._getRefByOptions(options) : this.ref;
        const list = this.$firebaseArray(ref.orderByChild('createTimestamp'));
        return list.$loaded()
            .then(result => {
                return result.map(news => this._mapNews(news));
            })
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

    getNewsById(id) {
        const obj = this._getNewsObj(id);
        return obj.$loaded()
            .then(result => {
                return this._mapNews(result);
            });
    }

    _getNewsObj(key) {
        const ref = this.ref.child(key);
        return this.$firebaseObject(ref);
    }

    _mapNews(news) {
        const { title, abstract, content } = news;
        return {
            id: news.$id,
            title,
            abstract,
            content
        };
    }

    addNews(data) {
        const list = this.$firebaseArray(this.ref);
        return list.$add({
                ...data,
                createTimestamp: Date.now()
            })
            .then(ref => {
                return ref.key;
            });
    }

    saveNews(id, data) {
        const obj = this._getNewsObj(id);
        return obj.$loaded()
            .then(result => {
                Object.assign(result, data, {
                    editTimestamp: Date.now()
                });
                return obj.$save();
            })
            .then(ref => {
                return ref.key;
            });
    }

    removeNews(id) {
        const obj = this._getNewsObj(id);
        return obj.$remove();
    }
};
