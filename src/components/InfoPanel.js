import React from 'react';
import { Panel, Table, Label } from 'react-bootstrap';

import { PhoneNumberUtil, PhoneNumberFormat, PhoneNumber, PhoneNumberType } from 'google-libphonenumber';

import iso from 'iso-3166-1-alpha-2';

const phoneUtil = PhoneNumberUtil.getInstance();

class InfoPanel extends React.Component {
    getConstantName(constants, needle) {
        for (let [key, value] of this.entries(constants)) {
            if (value === needle) {
                return key;
            }
        }
        return null;
    }

    constantLabel(constants, needle, style = undefined) {
        const name = this.getConstantName(constants, needle);
        if (name && name !== 'UNKNOWN') {
            return (
                <Label bsStyle={style}>{name}</Label>
            );
        } else {
            return (
                <Label bsStyle="danger">UNKNOWN</Label>
            );
        }
    }

    booleanLabel(value) {
        return (
            <Label bsStyle={value ? 'success' : 'danger'}>{value ? 'TRUE' : 'FALSE'}</Label>
        );
    }

    *entries(obj) {
       for (let key of Object.keys(obj)) {
         yield [key, obj[key]];
       }
    }

    render() {
        const {phone, region} = this.props;
        if (!phone) {
            return false;
        }

        const regionCode = phoneUtil.getRegionCodeForNumber(phone),
            countryName = iso.getCountry(regionCode),

            countryCodeSourceLabel = this.constantLabel(PhoneNumber.CountryCodeSource, phone.getCountryCodeSourceOrDefault()),
            italianLeadingZeroLabel = this.booleanLabel(phone.getItalianLeadingZero()),
            phoneNumberTypeLabel = this.constantLabel(PhoneNumberType, phoneUtil.getNumberType(phone), 'primary'),

            isPossibleNumber = phoneUtil.isPossibleNumber(phone),
            isPossibleNumberLabel = this.booleanLabel(isPossibleNumber),
            notPossibleNumberReasonLabel = !isPossibleNumber 
                ? this.constantLabel(PhoneNumberUtil.ValidationResult, phoneUtil.isPossibleNumberWithReason(phone))
                : false,

            isValidNumber = phoneUtil.isValidNumber(phone),
            isValidNumberLabel = this.booleanLabel(isValidNumber),

            isValidNumberForRegion = phoneUtil.isValidNumberForRegion(phone, region),
            isValidNumberForRegionLabel = this.booleanLabel(isValidNumberForRegion);


        //{phoneUtil.format(phone, PhoneNumberFormat.NATIONAL)}

        return (
            <div>
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
            </div>
        );
    }
}

export default InfoPanel;