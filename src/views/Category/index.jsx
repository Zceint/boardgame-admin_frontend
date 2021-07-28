import { useState, useEffect } from "react";
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
import { reqCategoryAdd, reqCategoryList, reqCategoryDelete } from "../../api";
import message from "../../util/message";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [addingCategory, setAddingCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [disable, setDisable] = useState(false);
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
    },
    {
      field: "action",
      headerName: "Action",
      width: 270,

      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
              const deletedCategoryName = params.row.categoryName;
              reqCategoryDelete({ name: deletedCategoryName }).then((res) => {
                if (res.data.status === 0) {
                  setCategoryList(categoryList.filter((category) => category.name !== deletedCategoryName));
                } else {
                  message.error(res.data.msg);
                }
              });
            }}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];
  useEffect(() => {
    let mounted = true;
    reqCategoryList().then((res) => {
      if (mounted) {
        res.data.status === 0 ? setCategoryList(res.data.data) : message.error(res.data.msg);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = () => {
    setOpen(false);
    setDisable(true);
    reqCategoryAdd({ name: addingCategory }).then((res) => {
      if (res.data.status === 0) {
        setCategoryList([...categoryList, { name: addingCategory }]);
        setDisable(false);
      } else {
        message.error(res.data.msg);
        setDisable(false);
      }
    });
  };
  const handleClickOpen = () => {
    setAddingCategory("");
    setOpen(true);
    setDisable(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = categoryList.map((category, index) => {
    return { id: index, categoryName: category.name };
  });

  return (
    <Box sx={{ height: 420, width: "100%", padding: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={3} mt={1}>
        <Typography variant="h5"> Categories</Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
            onChange={(e) => {
              setDisable(false);
              setAddingCategory(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd} disabled={disable}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid rows={rows} columns={columns} disableSelectionOnClick pageSize={5} />
      <Copyright mt={3} />
    </Box>
  );
}
