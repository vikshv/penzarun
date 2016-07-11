
const fileName = {
    provision: 'Положение'
};

export default class FileStorageServiceController {
    constructor(FirebaseService) {
        'ngInject';

        const firebase = FirebaseService.getFirebase();
        this.storageRef = firebase.storage().ref();
    }

    uploadProvisionFile(eventKey, file) {
        return this._uploadFile(eventKey, file, fileName.provision);
    }

    deleteProvisionFile(eventKey) {
        return this._deleteFile(eventKey, fileName.provision);
    }

    getProvisionFileUrl(eventKey) {
        return this._getUrl(eventKey, fileName.provision);
    }

    getProvisionFileName(eventKey) {
        return this._getFileName({
            eventKey, 
            fileName: fileName.provision
        });
    }

    getProvisionFileSize(eventKey) {
        return this._getFileSize({
            eventKey,
            fileName: fileName.provision
        });
    }

    _getFileRef(key, fileName) {
        return this.storageRef.child(`${fileName}${key}`);
    }

    _uploadFile(eventKey, file, fileName) {
        const uploadTask = this._getFileRef(eventKey, fileName).put(file);
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', snapshot => {
                }, error => {
                    reject(error);
                }, () => {
                    resolve(uploadTask.snapshot.downloadURL);
                });
        });
    }

    _deleteFile(eventKey, fileName) {
        const ref = this._getFileRef(eventKey, fileName);
        return ref.delete()
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return;
                } else {
                    throw Error(error);
                }
            });
    }

    _getUrl(key, fileName) {
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

    _getFileName(options) {
        return this._getFileMetadata(options)
            .then(metadata => {
                return metadata ? metadata.name : null;
            });
    }

    _getFileSize(options) {
        return this._getFileMetadata(options)
            .then(metadata => {
                return metadata ? metadata.size : null;
            });
    }

    _getFileMetadata({ eventKey, fileName }) {
        const ref = this._getFileRef(eventKey, fileName);
        return ref.getMetadata()
            .catch(error => {
                if (error.code === 'storage/object-not-found') {
                    return null;
                } else {
                    throw Error(error);
                }
            });
    }
};
