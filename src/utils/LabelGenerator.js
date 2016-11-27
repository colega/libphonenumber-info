import React from 'react';
import { Label } from 'react-bootstrap';

class LabelGenerator {
    getConstantName(constants, needle) {
        for (let [key, value] of this.entries(constants)) {
            if (value === needle) {
                return key;
            }
        }
        return null;
    }

    constant(constants, needle, style = undefined) {
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

    boolean(value) {
        return (
            <Label bsStyle={value ? 'success' : 'danger'}>{value ? 'TRUE' : 'FALSE'}</Label>
        );
    }

    *entries(obj) {
       for (let key of Object.keys(obj)) {
         yield [key, obj[key]];
       }
    }
}

export default LabelGenerator;