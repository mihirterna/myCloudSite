import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Card from './card';
import * as actions from '../actions';
import DirRow from './dirRow'

const mapStateToProps = state => {
    return {
        files: state.file.files
    };
};

class FileMap extends Component {

    render() {
        return (
            <div>
                <DirRow />
                <div>
                {_.map(this.props.files, (value, key) => {
                                return <div key={key}>
                                    <Card
                                        d={value}
                                        k={key} />
                                </div>;
                            })}
                    {/* _.map(
                        _.sortBy(
                            _.filter(this.props.files, o => {
                                return !o.name.startsWith(".");
                            }), [function (o) { return o.name; }]), (value, key) => {
                                return <div key={key}>
                                    <Card
                                        d={value}
                                        k={key} />
                                </div>;
                            })*/ }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, actions)(FileMap);
