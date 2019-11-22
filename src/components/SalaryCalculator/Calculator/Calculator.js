import React, { Component } from 'react';
import axios from '../../../axios-order';
import { isNullOrUndefined } from 'util';
import { Spinner } from 'reactstrap';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import './Calculator.css';
import CalculatorForm from '.././CalculatorForm/CalculatorForm';
import CalculatorSummary from '../CalculatorSummary/CalculatorSummary';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import InfoModal from '../../UI/InfoModal/InfoModal';


class Calculator extends Component {
    state = {
        summary: {
            workingHoursInMonth: 0,
            workedHours: 0,
            hourlyFee: 0,
            overHoursAmount: 0,
            overHoursGrossIncome: 0,
            overHoursNetIncome: 0,
            totalGrossIncome: 0,
            totalNetIncome: 0,
            monthName: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            workedMonth: 1,
            monthsWorkingHours: [],
        },
        errorMessage: '',
        isSummaryVisible: false,
        workedMonth: 1,
        isLoading: true
    }

    componentDidMount = () => {
        axios.get('/SalaryCalculator')
            .then(response => {
                this.setState(prevState => ({
                    summary: {
                        ...prevState.summary,
                        monthsWorkingHours: response.data
                    }
                }))
                this.setState({ isLoading: false });
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleSelectChange = (selectedValue) => {
        this.setState({
            workedMonth: parseInt(selectedValue) + 1
        });
    }

    handleSubmitForm = (formFields) => {
        this.setState({
            errorMessage: '',
        });
        formFields.workedHours = parseInt(formFields.workedHoursInput);
        formFields.hourlyFee = parseInt(formFields.hourlyFeeInput);
        axios.post('/salarycalculator', formFields)
            .then(response => {
                this.setState(prevState => ({
                    summary: {
                        ...prevState.summary,
                        workedMonth: formFields.workedMonth,
                        workedHours: formFields.workedHoursInput,
                        hourlyFee: formFields.hourlyFeeInput,
                        overHoursAmount: response.data.overHoursAmount,
                        overHoursGrossIncome: response.data.overHoursGrossIncome,
                        overHoursNetIncome: response.data.overHoursNetIncome,
                        totalGrossIncome: response.data.totalGrossIncome,
                        totalNetIncome: response.data.totalNetIncome
                    }
                }))
                this.setState({ isSummaryVisible: true })
            })
            .catch(error => {
                if (!isNullOrUndefined(error.response.data.message)) {
                    this.setState({ errorMessage: error.response.data.message })
                }
            })
    }

    handleReset = () => {
        this.setState({
            errorMessage: '',
            isSummaryVisible: false
        });
    }

    render() {
        let calculatorContent = null;
        if (this.state.isLoading) {
            calculatorContent = (
                <Spinner animation="border" variant="primary" className="spinner" />
            )
        } else {
            calculatorContent = (
                <Aux>
                    <CalculatorForm
                        monthName={this.state.summary.monthName}
                        errorMessage={this.state.errorMessage}
                        monthsWorkingHours={this.state.summary.monthsWorkingHours}
                        handleSubmitForm={this.handleSubmitForm}
                        handleReset={this.handleReset}
                    />
                    <InfoModal
                        showModal={this.state.isSummaryVisible}
                        modalClosed={this.handleReset}
                        title="Summary"
                        buttonName="Ok"
                    >
                        <CalculatorSummary
                            summaryFactors={this.state.summary}
                        />
                    </InfoModal>
                </Aux>
            );
        }
        return (
            <div>
                <h1>Salary Calculator</h1>
                {calculatorContent}
            </div>
        )
    }
}

//export default withErrorHandler(Calculator, axios);
export default Calculator;