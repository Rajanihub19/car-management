import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "categoryName", headerName: "Category Name", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "createdAt",
    headerName: "Date of creation",
    type: "string",
    width: 200,
    valueFormatter: (params) => new Date(params?.value).toLocaleDateString(),
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      return (
        <Link to={`/category/add?id=${params?.id}`}>
          <EditIcon />
        </Link>
      );
    },
  },
];

export default function DataTable({ rows }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableMultipleSelection={true}
      />
    </div>
  );
}
