import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DrawerAppBar from "../navbar/Navbar";
import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthProvider";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Clinic from "../clinic/Clinic";


export const AddClinic = ({ city }) => {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [clinics,setClinics] = useState([])
  const [clinic, setclinic] = useState({
    clinicNameAr: "",
    clinicNameEn: "",
    cityId: "",
    addressAr: "",
    addressEn: "",
    urlName: "",
    color: "",
    files:null
    
  });

  const getDataClinic = async () => {
    try {
      const response = await axios.get(
        "https://medical-clinic.serv00.net/api/clinic",
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setClinics(response.data.data)
      console.log(response.data.data);
      
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  }
  useEffect(() => {
      getDataClinic()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clinic.files) {
      alert('يرجى اختيار ملف قبل التحميل');
      return;
    }

    const formData = new FormData();
    formData.append('image',clinic.files ); // إضافة الملف إلى FormData


    try {
      const response = await axios.post(
        "https://medical-clinic.serv00.net/api/clinic",
        {
          name_ar: clinic.clinicNameAr,
          name_en: clinic.clinicNameEn,
          city_id: clinic.cityId,
          address_ar: clinic.addressAr,
          address_en: clinic.addressEn,
          url_name: clinic.urlName,
          color: clinic.color,
          logo:formData,
          // requirements[0]: "1",
        },
        {
          'Content-Type': 'multipart/form-data',
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      console.log(response);
      alert("تمت إضافة العيادة بنجاح");
    } catch (error) {
      console.error("فشل إضافة العيادة:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setclinic({...clinic,files:event.target.files[0]}); // تخزين الملف المختار في الحالة
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
                <input type="file" onChange={handleFileChange} />


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
                  add
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  close
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
        <Box>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">address</TableCell>
            <TableCell align="left">color</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clinics.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <Clinic row={row} city={city}/>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    </div>
  );
};
