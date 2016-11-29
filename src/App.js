import React, { Component } from 'react';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import ValidationPanel from './components/ValidationPanel';
import InfoPanel from './components/InfoPanel';
import FormattingPanel from './components/FormattingPanel';
import ErrorPanel from './components/ErrorPanel';
import iso from 'iso-3166-1-alpha-2';

const phoneUtil = PhoneNumberUtil.getInstance();

class App extends Component {
    constructor(props) {
        super(props);
        const country = this.getUserCountry(),
            number = this.getExampleNumber(country);
        this.state = {number, country};

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
    }

    getUserCountry() {
        const country = navigator.language.split('-').pop();
        return this.isValidCountry(country) ? country : '';
    }

    isValidCountry(country) {
        return iso.getCodes().includes(country);
    }

    onNumberChange(e) {
        this.setState({
            number: e.target.value
        });
    }

    onCountryChange(e) {
        this.setState({
            country: e.target.value.toUpperCase().slice(0,2)
        });
    }

    getPhoneValidationState({number, phone, error}) {
        if (!number) {
            return null;
        }

        if (error || !phone) {
            return 'error';
        }

        return phoneUtil.isValidNumber(phone) ? 'success' : 'warning';
    }

    getCountryValidationState(country) {
        if (country.length === 0) {
            return 'warning';
        }

        return this.isValidCountry(country) ? 'success' : 'error';
    }

    getExampleNumber(country) {
        try {
            return phoneUtil.format(
                phoneUtil.getExampleNumber(country),
                PhoneNumberFormat.NATIONAL
            );
        } catch (e) {
            return '';
        }
    }

    render() {
        const { number, country } = this.state;

        let phone, error;

        try {
            phone = phoneUtil.parseAndKeepRawInput(number, country || 'ZZ');
        } catch (e) {
            error = e.message;
        }

        const phoneValidationState = this.getPhoneValidationState({number, phone, error});
        const countryValidationState = this.getCountryValidationState(country);
        const numberPlaceholder = this.getExampleNumber(country) || 'Phone number';

        return (
            <div>
                <form>
                    <FormGroup bsSize="large" validationState={countryValidationState}>
                        <InputGroup>
                            <FormControl type="text" onChange={this.onCountryChange} value={country} placeholder="Default country ISO-3166-1 code" />
                            <InputGroup.Addon>
                                <Glyphicon glyph="flag" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup bsSize="large" validationState={phoneValidationState}>
                        <FormControl type="text" onChange={this.onNumberChange} value={number} placeholder={numberPlaceholder} />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
                <ErrorPanel number={number} error={error} />
                <ValidationPanel phone={phone} region={country} />
                <InfoPanel phone={phone} />
                <FormattingPanel phone={phone} />
            </div>
        );
    }
}

export default App;
