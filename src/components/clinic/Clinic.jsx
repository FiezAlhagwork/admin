import React from "react";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Typography from "@mui/material/Typography";

import { TextField } from "@mui/material";
import { useState } from "react";

import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

const Clinic = ({ row, city }) => {
  const [open, setOpen] = useState(false);
  const [clinic, setclinic] = useState({
    clinicNameAr: row.name,
    clinicNameEn:row.name,
    cityId: row.cityId,
    addressAr:row.address,
    addressEn: row.address,
    urlName: row.urlName,
    color: row.color,
    files: null,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {};

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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Add clinic</Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <TextField
                type="text"
                id="outlined-basic"
                label="clinic name ar"
                variant="outlined"
                style={{ width: "48%" }}
                required
                margin="normal"
                value={clinic.clinicNameAr}
                onChange={(e) =>
                  setclinic({ ...clinic, clinicNameAr: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="clinic name en"
                variant="outlined"
                margin="normal"
                style={{ width: "48%" }}
                required
                value={clinic.clinicNameEn}
                onChange={(e) =>
                  setclinic({ ...clinic, clinicNameEn: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="address ar"
                variant="outlined"
                margin="normal"
                style={{ width: "48%" }}
                required
                value={clinic.addressAr}
                onChange={(e) =>
                  setclinic({ ...clinic, addressAr: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="address en"
                variant="outlined"
                margin="normal"
                style={{ width: "48%" }}
                required
                value={clinic.addressEn}
                onChange={(e) =>
                  setclinic({ ...clinic, addressEn: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="url name"
                variant="outlined"
                margin="normal"
                style={{ width: "48%" }}
                required
                value={clinic.urlName}
                onChange={(e) =>
                  setclinic({ ...clinic, urlName: e.target.value })
                }
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="color"
                variant="outlined"
                margin="normal"
                style={{ width: "48%" }}
                required
                value={clinic.color}
                onChange={(e) =>
                  setclinic({ ...clinic, color: e.target.value })
                }
              />
            </Box>
            <Box>
              <TextField
                id="outlined-select-currency"
                fullWidth
                select
                label="Select"
                margin="normal"
                defaultValue=""
                helperText="Please select your city"
                onChange={(e) =>
                  setclinic({ ...clinic, cityId: e.target.value })
                }
              >
                {city.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ margin: "20px 0 0 0" }}>
              <Button
                sx={{ margin: "0 10px 0 0" }}
                variant="contained"
                type="submit"
              >
                Edit
              </Button>
              <Button variant="contained" onClick={handleClose}>
                close
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <TableCell align="left">{row.id}</TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.address}</TableCell>
      <TableCell
        sx={{ background: row.color, width: 5, height: 5 }}
        align="left"
      ></TableCell>
      <TableCell align="right">
        {" "}
        <Button onClick={handleOpen} sx={{ margin: "0 10px 0 0" }} variant="contained" type="submit">
          Edit
        </Button>
      </TableCell>
    </>
  );
};

export default Clinic;
