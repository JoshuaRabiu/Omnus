import React, { Component } from 'react';
import axios from 'axios';
import InputHints from 'react-input-hints';
import swal from 'sweetalert'
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Chunker } from '../utils/Chunkify';
import './Home.css';
import mic from '../Images/mic.svg';
import arrow from '../Images/left-arrow.svg';

class Home extends Component {
  state = {
    isMicActive: false,
    loading: false,
    results: '',
    query: '',
    message: `Here's what I found on Wolfram Alpha for:`,
  }
  componentDidMount(){
    //Checks if user is using an iOS device, in which case speech synthesis is unavailable and no alert is needed
    const iOS = ['iPhone', 'iPad', 'iPod']
    if(iOS.includes(navigator.platform)){
      return 
    }
   else{ 
    const alerted = localStorage.getItem('alerted') || '';
    if(alerted != 'yes'){
      return swal({
        title: 'Notice:',
        text: `Omnus speaks results back to you. Turn up your volume to hear its voice.`,
        button: `Ok, don't show this again`
      })
      .then(localStorage.setItem('alerted', 'yes'))
      .catch(e => console.e)
    }
  }
}
  

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  enter(e) {
    if (e.key === 'Enter') {
      this.connect(this.state.query);
    }
  }

  handleClick() {
    try {
      const w = window;
      const SpeechEngine = w.SpeechRecognition || w.webkitSpeechRecognition || w.mozSpeechRecognition || w.msSpeechRecognition;
      const recognition = new SpeechEngine();
      if (this.state.isMicActive === true) {
        recognition.abort();
        this.setState({ isMicActive: false });
      } else {
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en';
        recognition.start();
        this.setState({ isMicActive: true });
        recognition.onresult = (e) => {
          const text = e.results[e.resultIndex];
          const speechQuery = text[0].transcript;
          this.connect(speechQuery);
        };
        recognition.onspeechend = () => {
          recognition.stop();
          this.setState({ isMicActive: false });
        };
      }
    } catch (e) {
      if (e instanceof TypeError) {
        swal(`Bummer! Your Browser doesn't support Speech Recogntion. \nCurrently only Chrome 33++ for Desktop and Android is supported (${e})`);
      } else {swal(`An error occured: ${e}`)}
    }
  }

  speak(dialogue) {
    try{
      const utterThis = new SpeechSynthesisUtterance(dialogue);
      Chunker(utterThis, {
      chunkLength: 120,
    }, () => console.log('Done Speaking') );}
    catch(e){
      console.e
      return
    }
  }

  connect(payload) {
    this.setState({ loading: true });
    axios.post(
      'wolfram-api', payload,
      {
        headers: {
          'Content-Type': 'text/plain',
          'Acceess-Control-Allow-Origin': '*',
        }
      }
    )
    .then((res) => {
      this.setState({ results: res.data });
      console.log(this.state.results);
      this.setState({ loading: false });
    })
    .catch(e => swal(`${e}`));
  }

  render() {
    const isloading = this.state.loading;
    const isMicActive = this.state.isMicActive;
    const dataFetched = this.state.results;

    if (isloading) {
      return <Loader />;
    }

    if (this.state.results.length > 0) {
      //View returned for image-based Wolfram responses
      if (dataFetched.indexOf('data:image/gif') == 0) {
        this.speak(this.state.message + this.state.query);
        return <div>
                 <Link to="/" target="_self"><img src={arrow} className="arrow" /></Link>
                 <div className="space" />
                 <div className="image-result">
                   <h3 className="simp-result">{this.state.message} "{this.state.query}"</h3>
                   <img className="wolfram-image" alt="Wolfram Alpha result" src={dataFetched} />
                 </div>
               </div>;
      }
      //View returned for text-based Wolfram responses
      this.speak(this.state.results);
      return <div>
               <Link to="/" target="_self"><img className="arrow" src={arrow} /></Link>
               <div className="center results-view"><h3>Input: {this.state.query}<br /><br />Results: {this.state.results}</h3></div>
             </div>;
      }

    //Default view returned when state is empty
    return (
      <div>
        <div className="center" >
          <label>Ask Away:</label>
          <InputHints autoComplete="off" className="input-field" onChange={e => this.handleChange(e)} onKeyPress={e => this.enter(e)} placeholders={["How old is the universe?","Where am I?","Tell me a joke", "Convert 1337 to Mayan Numerals", "How's the weather in New York?", "What happened on June 29, 2007?", "How many bytes are in a terabyte?", "Do you exist?"]} />
          <img className={`mic-icon ${isMicActive ? 'active-mic' : ''}`} src={mic} alt="microphone" onClick={() => this.handleClick()} />
        </div>
      </div>
    );
  }
}
export { Home }