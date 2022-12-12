import React from 'react';

function Textbox(props) {

    return(
        <div className="four wide column">
            <div className="search-bar ui segment">
                <form onSubmit = {props.onSubmit} className="ui form">
                    <div className="field">
                        <label>{props.label}</label>
                        <input 
                            type = "text"
                            onChange = {props.onChange}
                            value = {props.value}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default Textbox;