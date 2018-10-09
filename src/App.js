import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './test.less'
import { Button, Card} from 'antd'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>我是App</h1>
        <Button type="primary">我是按钮</Button>
          <Card>
            <Button>我是按钮</Button>
          </Card>
      </div>
    );
  }
}

export default App;
