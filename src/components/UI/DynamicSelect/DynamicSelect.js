import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from 'reactstrap';
import './DynamicSelect.css';

class DynamicSelect extends Component {
    handleChange = (event) => {
        let selectedValue = event.target.value;
        this.props.onSelectChange(selectedValue);
    }

    render() {
        let options = this.props.monthName.map((data, index) =>
            <option
                key={index}
                value={index}>
                {`${data}  [${this.props.monthsWorkingHours[index]}h in month]`}
            </option>
        );

        return (
            <div>                
                <Input className="select" onChange={this.handleChange} type="select" name="monthName">
                    {options}
                </Input>
            </div>
        )
    }
}

export default DynamicSelect;