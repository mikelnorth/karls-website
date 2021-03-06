import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/home/Home.js';
import Wedding from './components/wedding/Wedding.js';
// import Comercial from './components/comercial/Comercial.js';
import Contact from './components/contact/Contact.js';
// import About from './components/about/About.js';
// import Events from './components/events/Events.js';
// import Message from './components/messageboard/Message.js';
import Inbox from './components/messageboard/Inbox.js';


export default (
  <div>
    <Switch>
      <Route component={Home} exact path='/' />
      <Route component={Wedding} path='/wedding' />
      {/* <Route component={Comercial} path='/comercial' /> */}
      <Route component={Contact} path='/contact' />
      {/* <Route component={About} path='/about' /> */}
      {/* <Route component={Events} path='/events' /> */}
      <Route component={Inbox} path='/inbox'/>
      {/* <Route component={Message} path='/message' /> */}
    </Switch>
</div>
)