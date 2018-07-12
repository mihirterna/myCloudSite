import React, { Component } from 'react';
import './card.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Icon, IconButton, withStyles } from '../../node_modules/@material-ui/core';
import * as FontAwesome from 'react-icons/lib/fa'

const styles =({

})

class MediaControlCard extends Component {

  retFold(){
    if(this.props.t==="d"){
      return <FontAwesome.FaFolderO className="folder"/>
    }
    else return <FontAwesome.FaFileO className="folder"/>
  }

  render(){
    const {classes} = this.props;

  return (
      <Card className="card">
      <CardMedia
          title="folder">
          {this.props.t==="d"? <FontAwesome.FaFolderO className="folder"/>:<FontAwesome.FaFileO className="folder"/>}
        </CardMedia>
        
          <CardContent className="content" >
            <Typography variant="headline">{this.props.n}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {this.props.s}
            </Typography>
          </CardContent>
      </Card>
  );
}
}
export default withStyles(styles) (MediaControlCard);
