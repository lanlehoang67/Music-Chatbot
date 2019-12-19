
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
const BOT_USER = {
  _id: 2,
  name: 'KizunaAI',
  avatar: 'https://avatarfiles.alphacoders.com/163/163793.jpg'
};

class App extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am KizunaAI. I can help you order a car, book a hotel or even get weather forecast information!`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

   handleGoogleResponse(result) {
    console.log(result)
    let text = ""
    if(result.queryResult.fulfillmentMessages[0].simpleResponses== undefined){
      text = result.queryResult.fulfillmentMessages[0].text.text[0];

    }
    else {
      text = JSON.parse(JSON.stringify(result.queryResult.fulfillmentMessages[0].simpleResponses)).simpleResponses[0].textToSpeech ;
    }
    
    this.sendBotResponse(text);
    
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}

export default App;