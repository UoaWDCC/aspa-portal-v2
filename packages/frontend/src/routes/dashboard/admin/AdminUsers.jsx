import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import usersData from "./usersData";

export default function AdminEvents() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
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
            className="w-9/12 mx-auto text-white"
            rows={usersData}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "white",
              color: "white",
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
