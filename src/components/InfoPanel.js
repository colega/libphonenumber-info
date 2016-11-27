import React from 'react';
import { Panel } from 'react-bootstrap';

import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

class InfoPanel extends React.Component {
    render() {
        const {phone} = this.props;
        if (!phone) {
            return false;
        }
        
        return (
            <Panel header="Phone information">
                {phoneUtil.format(phone, PhoneNumberFormat.NATIONAL)}
            </Panel>
        );
    }
}

export default InfoPanel;