import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";
import { useContext } from "react";

export default function AdminEvents() {
  const columns = [
    { field: "_id", headerName: "ID", flex: 1, sortable: true }, // Set sortable to true
    { field: "firstName", headerName: "Name", flex: 1 },
    { field: "lastName", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState("");

  useEffect(() => {
    async function fetchAllUsers() {
      const token = await currentUser.getIdToken();

      const response = await axios.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUsers(data);
    }
    fetchAllUsers();
  });

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-white ml-44 mt-10 mb-6">
          Users
        </h1>
        {users && users.length > 0 ? (
          <DataGrid
            getRowId={(row) => row._id}
            className="w-9/12 mx-auto"
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            pageSize={25}
            autoHeight
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
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
