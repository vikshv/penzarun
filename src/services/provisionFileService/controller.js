export default class ProvisionFileServiceController {
    constructor(FirebaseService) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        this.storageRef = firebase.storage().ref();
    }

    upload(options) {
        return this._uploadFile(options);
    }

    getUrl(key, fileName) {
        const ref = this._getFileRef(key, fileName);
        return ref.getDownloadURL()
            .then(url => {
                return url;
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return null;
                } else {
                    throw Error(error);
                }
            });
    }

    isFileExist(key, fileName) {
        const ref = this._getFileRef(key, fileName);
        return ref.getDownloadURL()
            .then(url => {
                return ref.name;
            })
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return null;
                } else {
                    throw Error(error);
                }
            });
    }

    // _deleteFile(key) {
    //     const ref = this.storageRef.child(`provision/${key}`);
    //     return ref.delete();
    // }

    _uploadFile({ key, file, fileName }) {
        const uploadTask = this._getFileRef(key, fileName).put(file);
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', snapshot => {
                }, error => {
                    reject(error);
                }, () => {
                    resolve(uploadTask.snapshot.downloadURL);
                });
        });
    }

    _getFileRef(key, fileName = '') {
        return this.storageRef.child(`${fileName}${key}`);
    }
};
