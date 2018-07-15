import React, { Component } from 'react';
import './card.css'
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

  retFold(){
    return(
    <Card className="card">
    <Button variant="outlined" onClick={this.foldClick} className="card">
    <FontAwesome.FaFolderO className="folder"/>
        <CardContent className="content" >
          <Typography variant="headline">{this.props.n}</Typography>
          <Typography variant="subheading" color="textSecondary">
            {this.props.s/1000} MB
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
        <Button variant="contained" color="primary">Download</Button>   
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
