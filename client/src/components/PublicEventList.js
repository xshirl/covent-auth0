import React, { Component } from "react";
import api from "../api";
import ReactTable from "react-table";
export default class PublicEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getEvents().then((events) => {
      this.setState({
        events: events.data.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { events, isLoading } = this.state;
    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true,
      },
      {
        Header: "Name",
        accessor: "event_name",
        filterable: true,
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: true,
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: true,
      },
      {
        Header: "Time",
        accessor: "startTime",
        Cell: (props) => <span>{props.value.join(" / ")}</span>,
      },
      {
        Header: "Creator",
        accessor: "creator",
        filterable: true,
      },
      {
        Header: "Attendees",
        accessor: "attendees",
        filterable: true,
      },
    ];

    let showTable = true;
    if (!events.length) {
      showTable = false;
    }

    return (
      <div>
        {showTable && (
          <ReactTable
            data={events}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </div>
    );
  }
}
