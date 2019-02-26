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
}
