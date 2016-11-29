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
        const {number, country} = this.getInitialNumberAndCountry();
        console.log(window.location.href);
        this.state = {number, country};

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
    }

    getInitialNumberAndCountry() {
        const pattern = /\/(([A-Z]{2})\/)?([^\/]+)/,
            path = window.location.pathname,
            matches = path.match(pattern) || [];

        let number = matches[3] || '',
            country = matches[2] || '';

        if (!number) {
            country = this.getUserCountry();
            number = this.getExampleNumber(country);
        }

        return {number, country};
    }

    getUserCountry() {
        const country = navigator.language.split('-').pop();
        return this.isValidCountry(country) ? country : '';
    }

    isValidCountry(country) {
        return iso.getCodes().includes(country);
    }

    onNumberChange(e) {
        const number = e.target.value;
        this.setState((state) => {
            const {country} = state;
            this.updateUrl({number, country});
            return {number};
        });
    }

    onCountryChange(e) {
        const country = e.target.value.toUpperCase().slice(0,2);
        this.setState((state) => {
            const {number} = state;
            this.updateUrl({number, country});
            return {country};
        });
    }

    updateUrl({number, country}) {
        let newUrl = '/';
        if (country && number) {
            newUrl = `/${country}/${number}`;
        } else if (number) {
            newUrl = `/${number}`;
        }
        window.history.replaceState({}, 'libphonenumber.info', newUrl);
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
