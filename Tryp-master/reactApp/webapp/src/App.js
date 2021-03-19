import React from 'react';

import './App.css';





class App extends React.Component {
  state = {
    imgurl : undefined,
    eventName : undefined
    
  }

    componentDidMount = async(e) => {
      var eventid = "vv1AkZAq8GkezVfHD"
      const url = `https://app.ticketmaster.com/discovery/v2/events/${eventid}/images.json?apikey=mLGxhaIVykD4qeMZWvIi8lmIoMf7RAP7`;
      const response = await fetch(url);
      const data = await response.json();
      //var randomEvent =Math.floor(Math.random()*(20 - 0));
      // console.log(randomEvent);
      this.setState({
      imgurl: data.images[3].url,
         //eventName: data._embedded.events[0].name
      }
       )
      console.log(data);
    }


    



  render(){
    return (
      <div className="wrapper">
        <div>
          <h1 className="header-event">{this.state.eventName}</h1>
          <div><img src={this.state.imgurl} alt="Error"/></div>
        </div>
      </div>
    );
  }
}


export default App;
