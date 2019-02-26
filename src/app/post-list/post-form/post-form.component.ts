import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private postsService: PostsService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }
  
  onSavePost() {
    const title = this.postForm.get('title').value;
    const text = this.postForm.get('text').value;
    const newPost = new Post(title, text);
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }
}

