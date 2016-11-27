import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import { PhoneNumberUtil, PhoneNumberType, PhoneNumberFormat } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

class FormattingPanel extends React.Component {
    format(format) {
        return phoneUtil.format(this.props.phone, format);
    }

    render() {
        const {phone} = this.props;
        if (!phone || !phoneUtil.isValidNumber(phone)) {
            return false;
        }

        return (
            <Panel header="Formatting results">
                <Table striped fill>
                    <tbody>
                        <tr><td>E164</td><td>{this.format(PhoneNumberFormat.E164)}</td></tr>
                        <tr><td>National</td><td>{this.format(PhoneNumberFormat.NATIONAL)}</td></tr>
                        <tr><td>International</td><td>{this.format(PhoneNumberFormat.INTERNATIONAL)}</td></tr>
                        <tr><td>Out-of-country format from US</td><td>{phoneUtil.formatOutOfCountryCallingNumber(phone, 'US')}</td></tr>
                        <tr><td>Out-of-country format from Switzerland</td><td>{phoneUtil.formatOutOfCountryCallingNumber(phone, 'CH')}</td></tr>
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

export default FormattingPanel;