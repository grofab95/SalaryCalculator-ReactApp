import React from 'react';

const calculatorSummary = (props) => {
    let monthNr = props.summaryFactors.workedMonth;
    return (
        <div>
            <center>
                <h1>Summary for the month {props.summaryFactors.monthName[monthNr - 1]}</h1>
                <br></br>
                Time dimension on this date: <b>{props.summaryFactors.monthsWorkingHours[monthNr - 1]}h</b>, working hours: <b>{props.summaryFactors.workedHours}h</b><br></br>
                Hourly rate (gross): <b>{props.summaryFactors.hourlyFee}zł</b><br></br>
                Number of overtime hours: <b>{props.summaryFactors.overHoursAmount}</b>, gross salary: <b>{props.summaryFactors.overHoursGrossIncome}zł</b><br></br>
                Number of overtime hours: <b>{props.summaryFactors.overHoursAmount}</b>, net salary: <b>{props.summaryFactors.overHoursNetIncome}zł</b><br></br>
                Total gross salary (base + overhours): <b>{props.summaryFactors.totalGrossIncome}zł</b><br></br>
                Total net salary (base + overhours): <b>{props.summaryFactors.totalNetIncome}zł</b><br></br>
            </center>
        </div>
    );
}

export default calculatorSummary;