import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class DataTablaLoading extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div style={{height:'50vh',position:'relative'}}>
                <AppBar
                    title={this.props.title}
                    iconElementLeft={<div></div>}
                    className="app-bar no-element-left"
                />
                <div style={{left:'50%',position:'absolute',top:'50%',transform:'translateY(-50%)',width:'100%'}}>
                    <RefreshIndicator
                        size={40}
                        left={10}
                        top={0}
                        status="loading"
                    />
                </div>
            </div>
        );
    }
}

export default DataTablaLoading;
