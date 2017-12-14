import React, { Component } from 'react';
import DataTabla from '../Interface/DataTabla';
import DataTablaLoading from '../Interface/DataTablaLoading';

class ListRoles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount(){
        axios.get('/roles')
        .then(response => {
            this.setState({
                data: response.data,
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
            label: 'Nombre del Perfil',
            sortable: true,
          }, {
            key: 'description',
            label: 'Descripción',
            sortable: true,
          },
        ];

        if (this.state.data.length == 0)
            return(
                <DataTablaLoading title={"perfiles"} />
            );

        return(
            <DataTabla
                singular={"perfil"}
                plural={"perfiles"}
                route={"perfiles"}
                api={"roles"}
                columns = {TABLE_COLUMNS}
                data={this.state.data}
                searchText={"Buscar"}
                multiSelectable={false}
                importCSV={false}
            />
        );
    }
}

export default ListRoles;
