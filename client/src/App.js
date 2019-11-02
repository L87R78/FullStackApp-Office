import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.scss';

import LoginRegister from './components/loginRegister';
import Home from './components/Home/home';

import HomeBar from './components/Bar/homeBar';

import HomeExam from './components/Exam/home';
import Exam from './components/Exam/exam';
import Congratulations from './components/Exam/congratulations';

class App extends Component { 

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact component={LoginRegister}/>
          <Route path="/home" exact component={Home}/>

          <Route path="/bar" exact component={HomeBar}/>



          <Route path="/homeExam" exact component={HomeExam}/>
          <Route path="/exam" exact component={Exam}/>
          <Route path="/congratulations" exact component={Congratulations}/>
        </Switch>
      </div>
    );
  }
}

export default App;