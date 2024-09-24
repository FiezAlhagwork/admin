import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DrawerAppBar from "../navbar/Navbar";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
export const AddClinic = () => {
  const [open, setOpen] = useState(false);
  const [clinic , setclinic] = useState({name:"",addrees:""})



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("", {
        name:clinic.name,
        password:clinic.addrees,
      });
    } catch (error) {}

  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div style={{ margin: " 80px 20px 0 20px" }}>
      <DrawerAppBar />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleOpen} variant="contained">
          Add Clinic
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography>Add clinic</Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ margin: "30px 0" }}>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  style={{ width: "100%" }}
                  required
                  value={clinic.name}
                  onChange={(e) => setclinic({...clinic,name:e.target.value})}
                />
              </Box>
              <Box>
                <TextField
                  type="password"
                  id="outlined-basic"
                  label="addrees"
                  variant="outlined"
                  style={{ width: "100%" }}
                  required
                  value={clinic.addrees}
                  onChange={(e) => setclinic({...clinic,addrees:e.target.value})}
                />
              </Box>
              <Box sx={{ margin: "20px 0 0 0" }}>
                <Button sx={{ margin: "0 10px 0 0" }} variant="contained" type='submit'>
                  add
                </Button>
                <Button variant="contained" onClick={handleClose} >
                  close
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>

      {/* view clinic */}
    </div>
  )
}
