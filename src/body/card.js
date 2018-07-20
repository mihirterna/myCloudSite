import React, { Component } from 'react';
import { Typography, CardContent, Button, Card } from '@material-ui/core';
import * as actions from '../actions';
import { connect } from 'react-redux';
import './card.css'
import * as FontAwesome from 'react-icons/lib/fa';
import axios from 'axios';
import fileDownload from 'js-file-download';

const mapStateToProps = state => {
  return {
      files: state.auth.files,
      dir: state.auth.dir,
      head: state.auth.head,
      err: state.auth.err
  };
};

class MediaControlCard extends Component {
  constructor(props) {
    super(props);
    this.props.headChanged("getList");
    console.log(this.props.dir)
}

foldClick(){
  const data = {
    head: this.props.head, 
    dir: this.props.dir+"/"+this.props.n,
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
    fName:this.props.n
}
console.log(data.dir,data.fName)
axios.post('http://192.168.31.91:5000',{data},{responseType:'blob'}).then(res=>{
    var s = "status"
  if(res[s]===200){
    fileDownload(res.data,data.fName)
}
});
}

retFold(){
  return(
  <Card className="card" onClick={this.foldClick.bind(this)}>
  {/* <Button variant="outlined" onClick={this.foldClick.bind(this)}  className="card"> */}
  <FontAwesome.FaFolderO className="folder"/>
      <CardContent className="content" >
        <Typography variant="headline" style={{fontSize:'14px'}}>{this.props.n}</Typography>
        <Typography variant="subheading" color="textSecondary" style={{fontSize:'14px'}}>
          {this.props.s/1024} MB
        </Typography>
      </CardContent>
     {/* </Button> */}
  </Card>
  )
}

retFile(){
  return(
  <Card className="card">
   <FontAwesome.FaFileO className="folder"/>
      <CardContent className="content" >
        <Typography variant="headline" style={{fontSize:'14px'}}>{this.props.n}</Typography>
        <Typography variant="subheading" color="textSecondary" style={{fontSize:'14px'}}>
          {this.props.s/1000000} MB
        </Typography>
      </CardContent>
      <Button variant="contained" color="primary" onClick={this.fileDW.bind(this)}>Download</Button>   
  </Card>
  )
}

  render(){
     return (
          this.props.t==="d"? this.retFold():this.retFile()
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
