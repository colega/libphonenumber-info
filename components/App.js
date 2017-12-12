import React, { Component } from 'react';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { Jumbotron, FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import HeaderPanel from './panels/HeaderPanel';
import ValidationPanel from './panels/ValidationPanel';
import InfoPanel from './panels/InfoPanel';
import FormattingPanel from './panels/FormattingPanel';
import ErrorPanel from './panels/ErrorPanel';
import iso from 'iso-3166-1-alpha-2';

const phoneUtil = PhoneNumberUtil.getInstance();

class App extends Component {
    constructor(props) {
        super(props);
        let number = props.number || "";
        let country = (props.country || "").toUpperCase();
        let home = props.home;

        if (!number) {
          number = this.getExampleNumber(country);
        }

        this.state = {number, country, home};

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
    }

    isValidCountry(country) {
        return iso.getCodes().includes(country);
    }

    onNumberChange(e) {
        const number = e.target.value;
        this.setState((state) => {
            const {country} = state;
            this.updateUrl({number, country});
            return {number, home: !number};
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
        if (window) {
          let newUrl = '/';
          if (country && this.isValidCountry(country) && number) {
              newUrl = `/${country}/${number}`;
          } else if (number) {
              newUrl = `/${number}`;
          }
          window.history.replaceState({}, 'libphonenumber.info', newUrl);
        }
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

    setDemoNumber() {
        this.setState((state) => {
            let country = this.isValidCountry(state.country) ? state.country : "US";
            const number = this.getExampleNumber(country);

            this.updateUrl({number, country});

            return {number, country, home: false};
        });
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
                <HeaderPanel jumbotron={this.state.home} setDemoNumber={() => this.setDemoNumber() } />
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
