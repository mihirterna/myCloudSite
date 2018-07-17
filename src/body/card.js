import React, { Component } from 'react';
import { CardMedia, Typography, CardContent, Card } from '@material-ui/core';
import './card.css'

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
