import React, { Component } from "react";
import PropTypes from "prop-types";

// Big thanks to https://codepen.io/nhackley/pen/QbGoLN for this nifty Table :)

const Table = ({ columns, rows }) => [
  <table className="responsive-table" key="table">
    <thead>
      <tr>
        {Object.keys(columns).map(col => <th key={col}>{columns[col]}</th>)}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
          {Object.keys(columns).map(column => (
            <td data-label={columns[column]} key={column}>
              {row[column]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>,
  <style key="style">
    {`.responsive-table {
          width: 100%;
          margin: 0;
          padding: 0;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .responsive-table thead {
          display: none;
          background: #fafafa;
        }
        @media screen and (min-width: 700px) {
          .responsive-table thead {
            display: table-header-group;
          }
        }
        .responsive-table tr {
          border: 1px solid #ddd;
          border-bottom: 2px solid #ddd;
          padding: 5px;
          margin-bottom: 10px;
          display: block;
        }
        @media screen and (min-width: 700px) {
          .responsive-table tr {
            display: table-row;
            border-bottom-width: 1px;
            margin-bottom: 0;
          }
          .responsive-table tr:nth-child(even) {
            background: #fafafa;
          }
        }
        .responsive-table th,
        .responsive-table td {
          padding: 10px;
          text-align: left;
        }
        .responsive-table td {
          display: block;
          text-align: right;
          border-bottom: 1px dotted #ff0080;
        }
        .responsive-table td:last-child {
          border-bottom: none;
        }
        @media screen and (min-width: 700px) {
          .responsive-table td {
            display: table-cell;
            text-align: left;
            border-bottom: none;
          }
        }
        .responsive-table td:before {
          content: attr(data-label);
          float: left;
          font-weight: bold;
        }
        @media screen and (min-width: 700px) {
          .responsive-table td:before {
            content: "";
            display: none;
          }
        }
        `}
  </style>
];

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Table;
