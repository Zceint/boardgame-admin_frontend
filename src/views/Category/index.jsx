import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import Copyright from "../../components/Copyright";
import { reqCategoryAdd } from "../../api";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "categoryName",
    headerName: "Category name",
    width: 600,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    width: 270,
    editable: true,
    renderCell: (params) => (
      <strong>
        <Button variant="contained" color="primary" size="small" style={{ marginLeft: 16 }} onClick={() => {}}>
          Open
        </Button>
        <Button variant="contained" color="primary" size="small" style={{ marginLeft: 16 }}>
          Open
        </Button>
      </strong>
    ),
  },
];

const rows = [
  { id: 1, categoryName: "Snow", action: "" },
  { id: 2, categoryName: "Lannister", action: "" },
  { id: 3, categoryName: "Lannister", action: "" },
  { id: 4, categoryName: "Stark", action: "" },
  { id: 5, categoryName: "Targaryen", action: "" },
  { id: 6, categoryName: "Melisandre", action: "" },
];

export default function Category() {
  const [open, setOpen] = useState(false);
  const [addingCategory, setAddingCategory] = useState("");

  const handleAdd = () => {
    reqCategoryAdd({ name: addingCategory });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddingCategory = (e) => {
    setAddingCategory(e.target.value);
  };

  return (
    <Box sx={{ height: 420, width: "100%", padding: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={3} mt={1}>
        <Typography variant="h5"> Categories</Typography>
        <Button variant="filled" onClick={handleClickOpen}>
          Add
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            onChange={handleAddingCategory}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
      <DataGrid rows={rows} columns={columns} disableSelectionOnClick pageSize={5} />
      <Copyright mt={3} />
    </Box>
  );
}
