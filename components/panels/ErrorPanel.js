import React from 'react';
import { Panel } from 'react-bootstrap';

class ErrorPanel extends React.Component {
    render() {
        const {number, error} = this.props;
        if (!number || !error) {
            return false;
        }

        return (
            <Panel header="Error" bsStyle="danger">
                {error}
            </Panel>
        );
    }
}

export default ErrorPanel;