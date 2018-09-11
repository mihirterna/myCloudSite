import React, { Component } from 'react';
import { Typography, CardContent, Button, Card, Checkbox   } from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';
import './card.css'
import * as FontAwesome from 'react-icons/lib/fa';
import Menuicon from './menuIcon';

const mapStateToProps = state => {
  return {
      files: state.auth.files,
      dir: state.auth.dir,
      head: state.auth.head,
      err: state.auth.err,
      cb_val : state.auth.cb_val
  };
};
class MediaControlCard extends Component {
  constructor(){
    super()
    this.state={
      toShow:false,
      isChecked:false
    }
    this.clickHandle = this.clickHandle.bind(this)
    this.foldClick = this.foldClick.bind(this)
  }
foldClick(){
  if(this.props.cb_val){
    const deta = {
      name : this.props.d["name"],
      delete:false,
      clear:true
    }
    this.props.show_cb(deta) 
  }

  const data = {
    head: this.props.head, 
    dir: this.props.dir+"/"+this.props.d["name"],
    };
  this.props.dirChanged(data);
}

componentWillReceiveProps(newProp){
       this.props=newProp
}

fileDW(){
  
  var data = {
    head:"download",
    dir:this.props.dir,
    fName:this.props.d["name"]
}
const url = "http://localhost:5000/dw/d?dir="+this.props.dir+"&f="+data.fName
window.location.href = url

// axios.post('http://localhost:5000/dw/d?',{data},{responseType:'blob'}).then(res=>{
//     var s = "status"
//   if(res[s]===200){
//     fileDownload(res.data,data.fName)
// }
// });
}
clickHandle(){
  if(!this.state.isChecked){
    const data = {
      name : this.props.d["name"],
      delete:false
    }
    this.props.show_cb(data)
  }
  else{
    const data = {
      name : this.props.d["name"],
      delete:true
    }
    this.props.show_cb(data)
  }
  this.setState({
    isChecked:!this.state.isChecked
  })
}

retCB(){
  return(
  <Checkbox
  checked={this.state.isChecked}
  onChange={this.clickHandle}
  value="checkedB"
  color="primary"/>

  )
}

retFold(){

  return(
  <Card className="card">
  {/* <Button variant="outlined" onClick={this.foldClick.bind(this)}  className="card"> */}
  <div className="folder" onClick={this.clickHandle}>
  <FontAwesome.FaFolderO className="icon" />
   </div>   
   <div className="seperator"></div>
   <div className="content" onClick={this.foldClick}>
      <CardContent >
        <Typography variant="headline" style={{fontSize:'14px'}}>{this.props.d["name"]}</Typography>
        <Typography variant="subheading" color="textSecondary" style={{fontSize:'14px'}}>
          {this.props.d["size"]/1024} MB
        </Typography>
      </CardContent>
      </div>
      <div className="cb">
        {
          this.props.cb_val?this.retCB():""
        }
      </div>
      
      <div>
      <Menuicon/>
      </div>
     
  </Card>
  )
}

retFile(){
  return(
  <Card className="card">
  <div className="folder" onClick={this.clickHandle}>
   <FontAwesome.FaFileO className="icon"/>
     </div> 
     <div className="seperator"></div>
      <CardContent className="content" >
        <Typography variant="headline" style={{fontSize:'14px'}}>{this.props.d["name"]}</Typography>
        <Typography variant="subheading" color="textSecondary" style={{fontSize:'14px'}}>
          {this.props.d["size"]/1000000} MB
        </Typography>
      </CardContent>
      {/* <Button className="fileDwBtn" variant="contained" color="primary" onClick={this.fileDW.bind(this)}>Download</Button>    */}
      <div>
        {
          this.props.cb_val?this.retCB():""
        }
      </div>
      <div>
      <Menuicon n={this.props.d["name"]}/>
      </div>
      
  </Card>
  )
}
componentWillMount(){
  console.log("CB ",this.props.cb_val)
}

  render(){

     return (
          this.props.d["type"]==="d"? this.retFold():this.retFile()
    );
  }
}

export default connect(mapStateToProps, actions)(MediaControlCard);

// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import * as FontAwesome from 'react-icons/lib/fa';
// import Button from '@material-ui/core/Button';
// import axios from 'axios';
// import fileDownload from 'js-file-download';

// class MediaControlCard extends Component {
//     constructor(props){
//       super(props)
//       this.state={
//         dir:"",
//         fName:props.n,
//       }
//       this.foldClick = this.foldClick.bind(this)
//     }

//   foldClick(){
//     var data = this.state.fName
//     disAct.dirChanged(data);
//   }
 


//   componentWillReceiveProps(newProp){
//     this.setState({
//       fName:newProp.n
//     })
//   }

//   render(){    
//       return (<div>
   //   <div>
    //     <Card className="card" >
    //       <CardMedia className="icon"
    //         image="../icons/outline_folder_black_18dp.png"
    //         title="Live from space album cover">
    //       </CardMedia>
          
    //       <div >
    //         <CardContent >
    //           <Typography variant="headline">{this.props.i}</Typography>
    //           <Typography variant="subheading" color="textSecondary">
    //             {this.props.n}
    //           </Typography>
    //         </CardContent>
    //       </div>
    //     </Card>
    //   </div>
//           </div>
//   );
// }
// }
// export default (MediaControlCard);
