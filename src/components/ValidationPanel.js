import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import { PhoneNumberUtil, PhoneNumberType } from 'google-libphonenumber';
import iso from 'iso-3166-1-alpha-2';
import LabelGenerator from './../utils/LabelGenerator';

const phoneUtil = PhoneNumberUtil.getInstance();

class ValidationPanel extends React.Component {
    render() {
        const {phone, region} = this.props;
        if (!phone) {
            return false;
        }

        const label = new LabelGenerator(),
            regionCode = phoneUtil.getRegionCodeForNumber(phone),
            countryName = iso.getCountry(regionCode),

            phoneNumberTypeLabel = label.constant(PhoneNumberType, phoneUtil.getNumberType(phone), 'primary'),

            isPossibleNumber = phoneUtil.isPossibleNumber(phone),
            isPossibleNumberLabel = label.boolean(isPossibleNumber),
            notPossibleNumberReasonLabel = !isPossibleNumber 
                ? label.constant(PhoneNumberUtil.ValidationResult, phoneUtil.isPossibleNumberWithReason(phone))
                : false,

            isValidNumber = phoneUtil.isValidNumber(phone),
            isValidNumberLabel = label.boolean(isValidNumber),

            isValidNumberForRegion = phoneUtil.isValidNumberForRegion(phone, region),
            isValidNumberForRegionLabel = label.boolean(isValidNumberForRegion);

        return (
            <Panel header="Validation results">
                <Table striped fill>
                    <tbody>
                        <tr><td>Possible number</td><td>{isPossibleNumberLabel}</td></tr>
                        {notPossibleNumberReasonLabel && (<tr><td>Not possible number reason</td><td>{notPossibleNumberReasonLabel}</td></tr>)}
                        <tr><td>Valid number</td><td>{isValidNumberLabel}</td></tr>
                        <tr><td>Valid number for region</td><td>{isValidNumberForRegionLabel}</td></tr>
                        <tr><td>Region code</td><td>{regionCode} ({countryName})</td></tr>
                        <tr><td>Number type</td><td>{phoneNumberTypeLabel}</td></tr>
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

export default ValidationPanel;