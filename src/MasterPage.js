import React from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header';

class MasterPage extends React.Component {
    render() {
        return (
            <DocumentTitle title='Local Cloud'>
                <div className='master'>
                    <Header />
                    { this.props.children }
                </div>
            </DocumentTitle>
        );
    }
}

export default MasterPage;
