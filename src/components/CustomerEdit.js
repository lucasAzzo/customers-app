import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import { accessControl } from '../helpers/accessControl';
import CustomersActions from './CustomersActions';
import { Prompt } from 'react-router-dom';
import { CUSTOMER_EDIT } from '../constants/permissions';


const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
)

const validate = values => {
    const error = {};

    if (!values.name) {
        error.name = "El campo nombre es requerido";
    }

    if (!values.dni) {
        error.dni = "El dni es un campo requerido";
    }

    return error;
}

const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) => (
    value && (!previousValue ? value : (value > previousValue ? value : previousValue))
)

class CustomerEdit extends Component {

    componentDidMount = () => {
        if (this.txt) {
            this.txt.focus();
        }
    }

    renderField = ({ input, meta, type, label, name, withFocus }) => (
        <div>
            <label htmlFor={name}>{label}</label>
            <input {...input} type={!type ? "text" : type} ref={withFocus && (txt => this.txt = txt)} />
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }
        </div>
    );

    render() {
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
        return (
            <div>
                <h2>Edición del cliente</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="name" component={this.renderField} type="text" label="Nombre" parse={toUpper} format={toLower} withFocus></Field>
                    <Field name="dni" component={this.renderField} type="text" label="Dni"></Field>
                    <Field name="age" component={this.renderField} type="number" validate={isNumber} label="Edad" parse={toNumber} normalize={onlyGrow}></Field>
                    <CustomersActions>
                        <button type="submit" disabled={pristine || submitting}>
                            Aceptar
                    </button>
                        <button type="button" onClick={onBack} disabled={submitting}>
                            Cancelar
                    </button>
                    </CustomersActions>
                    <Prompt when={!pristine && !submitSucceeded} message="Se perderán los datos si continua"></Prompt>
                </form>
            </div>
        );
    }
};

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func,
};

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(reduxForm({ form: 'CustomerEdit', validate })(CustomerEdit)));