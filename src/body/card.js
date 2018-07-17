import React, { Component } from 'react';
// import { CardMedia, Typography, CardContent, Card } from '@material-ui/core';
// import './card.css'

// class MediaControlCard extends Component {
//   render(){
//     return (
//       <div>
//         <Card className="card" >
//           <CardMedia className="icon"
//             image="../icons/outline_folder_black_18dp.png"
//             title="Live from space album cover">
//           </CardMedia>
          
//           <div >
//             <CardContent >
//               <Typography variant="headline">{this.props.i}</Typography>
//               <Typography variant="subheading" color="textSecondary">
//                 {this.props.n}
//               </Typography>
//             </CardContent>
//           </div>
//         </Card>
//       </div>
//     );
//   }
// }

//export default(MediaControlCard);

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as FontAwesome from 'react-icons/lib/fa';
import Button from '@material-ui/core/Button';
import * as disAct from '../store/dispatchActions';
import resStore from '../store/ResStore';
import axios from 'axios';
import fileDownload from 'js-file-download';

class MediaControlCard extends Component {
    constructor(props){
      super(props)
      this.state={
        dir:"",
        fName:props.n,
      }
      this.foldClick = this.foldClick.bind(this)
    }

  foldClick(){
    var data = this.state.fName
    disAct.dirChanged(data);
  }
  fileDW(){
    var data = {
      head:"download",
      dir:resStore.getDir(),
      fName:this.state.fName
  }
  console.log(data.dir,this.state.fName)
  axios.post('http://localhost:5000',{data},{responseType:'blob'}).then(res=>{
      var s = "status"
    if(res[s]===200){
      fileDownload(res.data,data.fName)
  }
  });
}

  retFold(){
    return(
    <Card className="card">
    <Button variant="outlined" onClick={this.foldClick} className="card">
    <FontAwesome.FaFolderO className="folder"/>
        <CardContent className="content" >
          <Typography variant="headline">{this.props.n}</Typography>
          <Typography variant="subheading" color="textSecondary">
            {this.props.s/1024} MB
          </Typography>
        </CardContent>
        </Button>
    </Card>
    )
  }

  retFile(){
    return(
    <Card className="card">
     <FontAwesome.FaFileO className="folder"/>
        <CardContent className="content" >
          <Typography variant="headline">{this.props.n}</Typography>
          <Typography variant="subheading" color="textSecondary">
            {this.props.s/1000000} MB
          </Typography>
        </CardContent>
        <Button variant="contained" color="primary" onClick={this.fileDW.bind(this)}>Download</Button>   
    </Card>
    )
  }

  componentWillReceiveProps(newProp){
    this.setState({
      fName:newProp.n
    })
  }

  render(){    
      return (<div>
            {this.props.t==="d"? this.retFold():this.retFile()}
          </div>
  );
}
}
export default (MediaControlCard);
