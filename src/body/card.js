import React, { Component } from 'react';
import { Typography, CardContent, Card, Checkbox } from '@material-ui/core';
import { FaRegFolder, FaRegFile } from 'react-icons/fa';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Menuicon from './menuIcon';
import '../CSS/card.css'
import MenuFoldIcon from './menuFolderIcon'

const mapStateToProps = state => {
  return {
    files: state.file.files,
    dir: state.file.dir,
    head: state.file.head,
    err: state.file.err,
    cb_val: state.file.cb_val,
    ck_files: state.file.checked_files,
    sall: state.file.sAll
  };
};

class MediaControlCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toShow: false,
      isChecked: false
    }
    this.clickHandle = this.clickHandle.bind(this)
    this.foldClick = this.foldClick.bind(this)
  }

  foldClick() {
    if (this.props.cb_val) {
      const deta = {
        name: this.props.d["name"],
        delete: false,
        clear: true
      }
      this.props.show_cb(deta)
    }

    const data = {
      head: this.props.head,
      dir: this.props.dir + "/" + this.props.d["name"],
    };
    this.props.dirChanged(data);
  }

  componentWillReceiveProps(newProp) {
    // console.log("New props received ", this.props.sAll);
    this.props = newProp
    this.setState({
      isChecked: this.props.ck_files.includes(this.props.d["name"])
    })
  }

  componentDidUpdate(prevProp, newProp, snapshot) {
    //console.log("component did mount", prevProp, " new -> ", newProp);
    //if(prevProp.ck_files.includes(this.props.d["name"])!==newProp.ck_files.includes(this.props.d["name"])){
    // this.setState({
    //   isChecked: newProp.ck_files.includes(this.props.d["name"])
    //  })
    //}
  }

  clickHandle() {
    const data = {
      name: this.props.d["name"]
    }
    this.props.show_cb(data)
    this.setState({
      isChecked: this.props.ck_files.includes(this.props.d["name"])
    })
  }


  retCB() {
    return (
      <Checkbox
        checked={this.state.isChecked}
        onChange={this.clickHandle}
        value="checkedB"
        color="primary" />

    )
  }

  retFold() {
    //const date = new Date(this.props.d["birth"])
    const date = this.props.d["lm"].split("T")
    return (
      <Card className="card">
        {/* <Button variant="outlined" onClick={this.foldClick.bind(this)}  className="card"> */}
        <div className="folder" onClick={this.clickHandle}>
          <FaRegFolder className="icon" />
        </div>
        <div className="seperator"></div>
        <div className="content" onClick={this.foldClick}>
          <CardContent >
            <Typography variant="h5" style={{ fontSize: '14px' }}>{this.props.d["name"]}</Typography>
            <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '14px' }}>
              Last modified: {date[0]} Time: {date[1].substring(0, 8)} {//Timezone in GMT, need it in IST
              }
            </Typography>
          </CardContent>
        </div>
        <div className="cb">
          {
            this.props.cb_val ? this.retCB() : ""
          }
        </div>

        <div>
          <MenuFoldIcon n={this.props.d["name"]} />
        </div>

      </Card>
    )
  }

  retFile() {
    const date = this.props.d["lm"].split("T")

    return (
      <Card className="card">
        <div className="folder" onClick={this.clickHandle}>
          <FaRegFile className="icon" />
        </div>
        <div className="seperator"></div>
        <CardContent className="content" >
          <Typography variant="h5" style={{ fontSize: '14px' }}>{this.props.d["name"]}</Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '14px' }}>
            Last modified: {date[0]} Time: {date[1].substring(0, 8)} Size: {this.props.d["size"] / 1000000.0} MB
        </Typography>
        </CardContent>
        {/* <Button className="fileDwBtn" variant="contained" color="primary" onClick={this.fileDW.bind(this)}>Download</Button>    */}
        <div>
          {
            this.props.cb_val ? this.retCB() : ""
          }
        </div>
        <div>
          <Menuicon n={this.props.d["name"]} />
        </div>

      </Card>
    )
  }

  render() {
    return (
      this.props.d["type"] === "d" ? this.retFold() : this.retFile()
    );
  }
}

export default connect(mapStateToProps, actions)(MediaControlCard);


// "name": file,
// "type": "f",
// "size": stat.size,
// "la": stat.atime,
// "lm": stat.mtime,
// "birth": stat.birthtimerender(){    
