import React, {Component} from 'react';
import './App.css';
import TOC from './component/TOC';
import ReadContent from './component/ReadContent'
import CreateContent from './component/CreateContent'
import Subject from './component/Subject'
import Control from './component/Control'

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode : "create",
      selected_content_id : 2,
      subject : {title : "WEB", sub : "world wide web!"},
      welcome : {title : "welcome", desc : "Hello, React"},
      contents : [
        {id : 1, title : "HTML", desc : "aaa"},
        {id : 2, title : "CSS", desc : "bbb"},
        {id : 3, title : "JavaScript", desc : "ccc"}
      ]
    }
  }
  render(){
    var _title, _desc, _article = null;

    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === "read"){
      for(var i = 0; i < this.state.contents.length; i++){
        if(this.state.contents[i].id === this.state.selected_content_id){
          _title = this.state.contents[i].title;
          _desc = this.state.contents[i].desc;
          break;
        }
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === "create"){
        _article = <CreateContent onSubmit={function(_title, _desc){
        console.log(_title, _desc);
        this.max_content_id += 1;
        var _content = this.state.contents.concat({
          id : this.max_content_id,
          title : _title,
          desc : _desc
        });
        this.setState({
          contents : _content
        })
        
      }.bind(this)}></CreateContent>;
    }

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode : "welcome"
            })
          }.bind(this)}>
        </Subject>
        <TOC 
          data={this.state.contents}
          onChangePage={function(id){
            this.setState({
              mode : "read",
              selected_content_id : id
            })
          }.bind(this)}>
        </TOC>
        <Control onChangeMode={function(_mode){
          this.setState({mode : _mode})
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }  
}

export default App;
