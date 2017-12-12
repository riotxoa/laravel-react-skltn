import React, { Component } from 'react';
import DataTabla from '../Interface/DataTabla';

class ListClients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        axios.get('/clients')
        .then(response => {
            var _data = [];
            if(response.data.length > 0) {
                _data = response.data;
            } else {
                _data = ['']
            }
            this.setState({
                data: _data,
            });
        })
        .catch(function (error) {
            (error);
        })
    }

    render() {

        const TABLE_COLUMNS = [
          {
            key: 'name',
            label: 'Nombre',
            sortable: true,
          }, {
            key: 'address',
            label: 'Dirección',
            sortable: true,
          }, {
            key: 'telephone',
            label: 'Teléfono',
            // toFixed: 2,
            // colspan: '2',
            // style: {
            //     textAlign:'right',
            // },
            sortable: true,
          }
        ];

        if (this.state.data.length == 0) return(<div></div>);

        return(
            <DataTabla
                singular={"cliente"}
                plural={"clientes"}
                route={"clientes"}
                api={"clients"}
                columns = {TABLE_COLUMNS}
                data={this.state.data}
                searchText={"Buscar"}
                multiSelectable={true}
                importCSV={true}
            />
        );
    }
}

export default ListClients;
