import React, {Component} from 'react';
import './App.css';
import TOC from './component/TOC';
import ReadContent from './component/ReadContent'
import CreateContent from './component/CreateContent'
import UpdateContent from './component/UpdateContent'
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
  
  getReadContent(){
    for(var i = 0; i < this.state.contents.length; i++){
      var data = this.state.contents[i];
      if(this.state.contents[i].id === this.state.selected_content_id){
        
        return data;
      }
    }
  }
  getContent(){
    var _title, _desc, _article = null;

    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === "read"){
      
      _article = <ReadContent 
            title={this.getReadContent().title} 
            desc={this.getReadContent().desc}></ReadContent>;
    } else if(this.state.mode === "create"){
        _article = <CreateContent onSubmit={function(_title, _desc){
        console.log(_title, _desc);
        this.max_content_id += 1;
        var _contents = Array.from(this.state.contents);
        _contents.push({
          id : this.max_content_id,
          title : _title,
          desc : _desc
        })

        this.setState({
          contents : _contents,
          mode : 'read',
          selected_content_id : this.max_content_id
        })
        
      }.bind(this)}></CreateContent>;
    } else if(this.state.mode === "update"){   
      var _content = this.getReadContent();   
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        for(var i=0; i < _contents.length; i++){
          if(_contents[i].id === _id){
            _contents[i] = {id : _id, title : _title, desc : _desc}
            break;
          }
        }
        this.setState({
          contents : _contents,
          mode : 'read'
        })
        
      }.bind(this)}></UpdateContent>;
    }

    return _article;
  }
  
  render(){       

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
          if(_mode === 'delete'){
            if(window.confirm('삭제할꺼야?')){
              var _contents = Array.from(this.state.contents);
              for(var i =0; i < _contents.length; i++){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                }
              }
              this.setState({
                contents : _contents,
                mode : 'welcome'
              })
            }
          }else{
            this.setState({mode : _mode})
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }  
}

export default App;
