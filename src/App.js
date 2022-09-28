import React, { Component } from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      db: ''
    }
  }

  loadDocs = async () => {
    const querySnapshot = await getDocs(collection(this.db, "libros"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyAplxcMtg0eNqmTRzOInSJ35S5vt3hxHZ8",
      authDomain: "applibros-vue.firebaseapp.com",
      projectId: "applibros-vue",
      storageBucket: "applibros-vue.appspot.com",
      messagingSenderId: "844111479312",
      appId: "1:844111479312:web:2f85638c9b14d721490095"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log(app)
    this.db = getFirestore(app);
    console.log(this.db)

    this.loadDocs()
  }

  render() {
    return (
      <div className="App">
        <h1>This is my App React</h1>
        <p>Welcome</p>
      </div>
    );
  }
}
