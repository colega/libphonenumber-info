import React from 'react';
import { Jumbotron, Panel, Button, Collapse } from 'react-bootstrap';

class HeaderPanel extends React.Component {
    render() {
        return (
            <div>
                <Collapse in={this.props.jumbotron}>
                    <Jumbotron>
                        <h1>libphonenumber information</h1>
                        <p>This website provides a user-friendly access to the phone number information provided by Google's libphonenumber.</p>
                        <p><Button bsStyle="primary" onClick={this.props.setDemoNumber} block>Check some random number!</Button></p>
                    </Jumbotron>
                </Collapse>
                <Panel>
                    <p>In order to get information about a number, write it in the form below.</p>
                    <p>You can write it in an international form or a local form, in this case you should write the country code where libphonenumber should interpret it.</p>
                    <p>See more information at <a href="http://">github.com/googlei18n/libphonenumber</a></p>
                </Panel>
            </div>
        )
    }
}

export default HeaderPanel;
