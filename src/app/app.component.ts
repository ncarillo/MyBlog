import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: "AIzaSyCNrYkSVgdeBgEtoiBBCNGlS0HrQhl61pU",
      authDomain: "myblog-8e771.firebaseapp.com",
      databaseURL: "https://myblog-8e771.firebaseio.com",
      projectId: "myblog-8e771",
      storageBucket: "myblog-8e771.appspot.com",
      messagingSenderId: "673805121701"
    };
    firebase.initializeApp(config);
  }
}