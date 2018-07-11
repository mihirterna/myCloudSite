import React, { Component } from 'react';
import './card.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import folder from '../icons/outline_folder_black_18dp.png';
import { Icon, IconButton } from '../../node_modules/@material-ui/core';



class MediaControlCard extends Component {
  render(){
  return (
    <div>
      <Card className="card" >
      <CardMedia className="icon"
          image="../icons/outline_folder_black_18dp.png"
          title="Live from space album cover">
        </CardMedia>
        
        <div >
          <CardContent >
            <Typography variant="headline">{this.props.i}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {this.props.n}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
}
export default(MediaControlCard);
