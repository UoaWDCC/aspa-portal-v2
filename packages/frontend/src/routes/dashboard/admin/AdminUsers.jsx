import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import usersData from "./usersData";

export default function AdminEvents() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1, sortable: true }, // Set sortable to true
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-white ml-44 mt-10 mb-6">
          Users
        </h1>
        {usersData && usersData.length > 0 ? (
          <DataGrid
            className="w-9/12 mx-auto"
            rows={usersData}
            columns={columns}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
            rowsPerPageOptions={[5, 10, 20, 50]}
            pageSize={10}
            pagination
            autoHeight
            disableColumnMenu
            disableSelectionOnClick
            headerHeight={40}
            density="compact"
            disableExtendRowFullWidth={true}
            sx={{
              "& .MuiDataGrid-root": {
                backgroundColor: "transparent",
              },
              "& .MuiDataGrid-cell": {
                color: "white",
              },
              "& .MuiTablePagination-root": {
                color: "white",
              },
              "& .MuiDataGrid-toolbar": {
                backgroundColor: "#333",
              },
              "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
                borderBottom: "none",
                color: "white",
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

const CustomLoadingOverlay = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      background: "rgba(0, 0, 0, 0.3)",
      color: "white",
    }}
  >
    Loading...
  </div>
);
