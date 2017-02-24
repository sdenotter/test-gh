import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './foundation.css'
var Messages = require('./Messages.js');
var firebase = require('firebase');

const config = {
    apiKey: "AIzaSyDa2n-A2wWWyz1uYqKYDdKZIMKLRR8_Ot0",
    authDomain: "chat-75ea2.firebaseapp.com",
    databaseURL: "https://chat-75ea2.firebaseio.com",
    storageBucket: "chat-75ea2.appspot.com",
    messagingSenderId: "283074985357"
  };
  const fb = firebase.initializeApp(config);
  var ref = fb.database().ref();

  var messagesRef = fb.database().ref("messages");
/*
  messagesRef.push({
      user: "Jeff",
      message: "Message from Jeff"
   });
  
   messagesRef.push({
      user: "Steve",
      message: "Message from steve"
   });
*/


/*
Listener Code
messagesRef.on("value", function(data){
     data.forEach(function(childData){
      var curr = childData.val();
      tempArray.push({
        id: tempArray.length+1,
        msg: curr.message
        })

     })

    })
*/


var App = React.createClass ({

  getInitialState: function(){
    var tempArray = [];
    messagesRef.once('value').then(function(data){
        data.forEach(function(childData){
          var curr = childData.val();
          tempArray.push({
            id: tempArray.length+1,
            msg: curr.message
            })
          console.log(tempArray);
        })
      })

    return {
      tempString: "",
      messages: tempArray,
      messages2: [
      {id: 1, msg: "message 1"},
       {id: 2, msg:"message 2"}
       ]
    }


    /*return{
      tempString: "",
      messages: [
      {id: 1, msg: "Test 1"},
       {id: 2, msg:"Test 2"}
       ],
       messages2: [
      {id: 1, msg: "message 1"},
       {id: 2, msg:"message 2"}
       ]
    }*/

  },
  onSubmit: function(){
    if(this.state.tempString === ""){
      return;
    }


      var tempArray = this.state.messages;
      var tempID = 3;
      var tempMsg = "This sent from submit button";
      tempArray.push({id: tempArray.length+1, msg: this.state.tempString});
      this.pushFB();

      this.setState({
        tempString: '',
        messages: tempArray,
      })
      var inp = document.getElementById("inp");
      inp.value = ""
      
  },

  onChange: function(e){
    this.setState({
      tempString: e.target.value
    })
  },
  onKeyPress: function(e){
    if(e.charCode ==13){
     this.onSubmit();
    }
  },
  

  pushFB: function(){
      messagesRef.push({
        user: "tempUser",
        message: this.state.tempString
      })

  },





  render: function() {
    var data = this.state.messages;
    var ref = fb.database().ref('messages');
    return (
      <div className="row App">
        <div className="app-header">
          <h2>Test Chat App</h2>
        </div>
        
        <div className="row mTop">
          <div className="columns small-5 small-offset-4 chat ">
          <Messages data={data}/>
            
              <div className="row bottom">
                <div className="columns small-10">
               <input id="inp" type="text" onChange={this.onChange} onKeyPress={this.onKeyPress}/>
               </div>
               <div className="columns small-1">
               <button className="button secondary" onClick={this.onSubmit}>Send</button>
               </div>
              </div>

           
          </div>
         

        </div>
        <button onClick={()=> console.log(data)} className="button primary">TestLog</button>
      </div>
    );
  }

}
)
export default App;
