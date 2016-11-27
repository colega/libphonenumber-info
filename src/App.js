import React, { Component } from 'react';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { Form, FormGroup, FormControl, InputGroup, Panel, Glyphicon } from 'react-bootstrap';
import InfoPanel from './components/InfoPanel';
import ErrorPanel from './components/ErrorPanel';

const phoneUtil = PhoneNumberUtil.getInstance();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '659599936',
            country: 'ES',
        };
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
    }

    onNumberChange(e) {
        this.setState({
            number: e.target.value
        });
    }

    onCountryChange(e) {
        this.setState({
            country: e.target.value
        });
    }

    getValidationState({number, phone, error}) {
        if (!number) {
            return null;
        }

        if (error || !phone) {
            return 'error';
        }

        if (phoneUtil.isValidNumber(phone)) {
            return 'success';
        }

        return 'warning';
    }

    render() {
        const { number, country } = this.state;

        let phone, error;

        try {
            phone = phoneUtil.parseAndKeepRawInput(number, country || 'ZZ');
        } catch (e) {
            error = e.message;
        }

        const phoneValidationState = this.getValidationState({number, phone, error});

        let numberPlaceholder;
        try {
            numberPlaceholder = phoneUtil.format(
                phoneUtil.getExampleNumber(country),
                PhoneNumberFormat.NATIONAL
            );
        } catch (e) {
            numberPlaceholder = 'Phone number'
        }

        return (
            <div>
                <form>
                    <FormGroup bsSize="large">
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
                <InfoPanel phone={phone} region={country} />
            </div>
        );
    }
}

export default App;
