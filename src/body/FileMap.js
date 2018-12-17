import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Card from './card';
import * as actions from '../actions';
import DirRow from './dirRow'

const mapStateToProps = state => {
    return {
        files: state.file.files,
        dir: state.file.dir,
        head: state.file.head,
        err: state.auth.err
    };
};

class FileMap extends Component {

    alertError() {
        if (this.props.err) console.log(this.props.err);
    }

    render() {
        console.log(this.props.files);
        return (
            <div>
                <DirRow />
                <div>
                    {_.map(
                        _.sortBy(
                            _.remove(this.props.files, o => {
                                return !o.name.startsWith(".");
                            }), [function (o) { return o.name; }]), (value, key) => {
                                return <div key={key}>
                                    <Card
                                        d={value}
                                        k={key} />
                                </div>;
                            })}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, actions)(FileMap);
