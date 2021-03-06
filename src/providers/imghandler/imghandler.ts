import { Injectable } from '@angular/core';
import {FileChooser} from '@ionic-native/file-chooser';
//import { File } from '@ionic-native/file';
//import { FilePath } from '@ionic-native/file-path';
import * as firebase from 'firebase/app';
import 'firebase/storage';

/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImghandlerProvider {
	nativepath: any;
	firestore = firebase.storage();
  constructor(public filechooser:FileChooser) {
    console.log('Hello ImghandlerProvider Provider');
  }
  
// Uploading image to firebase storage
uploadimage() {
    var promise = new Promise((resolve, reject) => {
        this.filechooser.open().then((url) => {
          (<any>window).FilePath.resolveNativePath(url, (result) => {
            this.nativepath = result;
            (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
              res.file((resFile) => {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = (evt: any) => {
                  var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                  var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                  imageStore.put(imgBlob).then((res) => {
                    this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                      resolve(url);
                    }).catch((err) => {
                        reject(err);
                    })
                  }).catch((err) => {
                    reject(err);
                  })
                }
              })
            })
          })
      })
    })    
     return promise;   
  }

}
