import React, { Component } from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import { Form, Field, Formik } from 'formik';
import './CalculatorForm.css';
import DynamicSelect from '../../UI/DynamicSelect/DynamicSelect';

class CalculatorForm extends Component {
    state = {
        workedMonth: 1
    }

    validateWorkedHoursInput(inputValue) {
        let error;
        if (!inputValue) {
            error = 'Worked hours is required';
        } else if (isNaN(inputValue)) {
            error = 'Invalid input format';
        } else if (inputValue < 1 || inputValue > 300) {
            error = 'Invalid worked hours'
        }
        return error;
    }

    validateHourlyFeeInput(inputValue) {
        let error;
        if (!inputValue) {
            error = 'Hourly fee is required';
        } else if (isNaN(inputValue)) {
            error = 'Invalid input format';
        } else if (inputValue < 1 || inputValue > 1000) {
            error = 'Invalid hourly fee'
        }
        return error;
    }

    handleSelectChange = (selectedValue) => {
        this.setState({
            workedMonth: parseInt(selectedValue) + 1
        });
    }

    render() {
        return (
            <Formik
                initialValues={{
                    workedHoursInput: '',
                    hourlyFeeInput: '',
                }}

                onSubmit={formFields => {
                    let workedMonth = this.state.workedMonth;
                    formFields = {
                        ...formFields,
                        workedMonth
                    }
                    this.props.handleSubmitForm(formFields);
                }}

                onReset={() => {
                    this.props.handleReset();
                }}
            >
                {({ errors, touched }) => (
                    <Form className="form">
                        <FormGroup>
                            <Label className="label" for="workedHoursInput">Worked Hours:</Label>
                            <Field validate={this.validateWorkedHoursInput} name="workedHoursInput" type="name"
                                className={'form-control' + (errors.workedHoursInput && errors.workedHoursInput ? ' is-invalid' : '')} />
                            {errors.workedHoursInput && touched.workedHoursInput && <div className="error-message">{errors.workedHoursInput}</div>}
                        </FormGroup>
                        <FormGroup>
                            <Label className="label">Month:</Label>
                            <DynamicSelect
                                monthName={this.props.monthName}
                                monthsWorkingHours={this.props.monthsWorkingHours}
                                onSelectChange={this.handleSelectChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label className="label" for="hourlyFeeInput">Hourly Fee:</Label>
                            <Field validate={this.validateHourlyFeeInput} name="hourlyFeeInput" type="name"
                                className={'form-control' + (errors.hourlyFeeInput && errors.hourlyFeeInput ? ' is-invalid' : '')} />
                            {errors.hourlyFeeInput && touched.hourlyFeeInput && <div className="error-message">{errors.hourlyFeeInput}</div>}
                        </FormGroup>
                        <FormGroup>
                            <Button className="button" type="submit" color="secondary">Calculate!</Button>
                            <Button className="button" type="reset" color="secondary">Reset</Button>
                        </FormGroup>
                        <div className="error-message">
                            {this.props.errorMessage}
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}

export default CalculatorForm;