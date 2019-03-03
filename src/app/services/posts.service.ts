import { Injectable } from '@angular/core';
import { Post } from '../../models/post.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';


@Injectable()
export class PostsService {

  posts: Post[] = [];
  postSubject = new Subject <Post[]>();

  constructor() {
    this.getPosts();
  }

  emitPosts(){
    this.postSubject.next(this.posts);
  }

  savePosts(){
    firebase.database().ref('/posts').set(this.posts);
  }

  saveSinglePost(id: number, post: Post){
    firebase.database().ref('/posts/'+id).update({ loveIts: post.loveIts}); 
  }

  getPosts(){
    firebase.database().ref('/posts')
    .on('value',(data: firebase.database.DataSnapshot) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

  getSinglePost(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/'+id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );  
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    if(post.image) {
      const storageRef = firebase.storage().refFromURL(post.image);
      storageRef.delete().then(
        () => {
          console.log('Image supprimé!');
        },
        (error) => {
          console.log('Image impossible à supprimer! : ' + error);
        }
      );
    }
    
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            console.log('Chargé…');
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
