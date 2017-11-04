import React from 'react';
import { Panel, Table, Label } from 'react-bootstrap';
import { PhoneNumber } from 'google-libphonenumber';
import LabelGenerator from './../../utils/LabelGenerator';

class InfoPanel extends React.Component {
    render() {
        const {phone} = this.props;
        if (!phone) {
            return false;
        }

        const label = new LabelGenerator(),
            countryCodeSourceLabel = label.constant(PhoneNumber.CountryCodeSource, phone.getCountryCodeSourceOrDefault()),
            italianLeadingZeroLabel = label.boolean(phone.getItalianLeadingZero());

        return (
            <Panel header="Phone information">
                <Table striped fill>
                    <tbody>
                        <tr><td>Country code</td><td>{phone.getCountryCodeOrDefault()}</td></tr>
                        <tr><td>National number</td><td>{phone.getNationalNumber()}</td></tr>
                        <tr><td>Extension</td><td>{phone.getExtension() || <Label>NONE</Label>}</td></tr>
                        <tr><td>Country code source</td><td>{countryCodeSourceLabel}</td></tr>
                        <tr><td>Italian leading zero</td><td>{italianLeadingZeroLabel}</td></tr>
                        <tr><td>Raw input</td><td>{phone.getRawInput()}</td></tr>
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

export default InfoPanel;
