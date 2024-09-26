import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DrawerAppBar from "../navbar/Navbar";
import { TextField } from "@mui/material";
import { useContext,  useState } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import AuthContext from "../../Context/AuthProvider";

const AddAdmin = ({city}) => {
  const { auth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    cityId: "",
    nameAr: "",
    nameEn: "",
    phoneNumber: "",
    clinicId: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://medical-clinic.serv00.net/api/actor",
        {
          username: user.username,
          password: user.password,
          city_id: user.cityId,
          role_id: 2, // تعيين الدور كـ Admin
          name_ar: user.nameAr,
          name_en: user.nameEn,
          phone_number: user.phoneNumber,
          clinic_id: user.clinicId,
          gender: "1",
          email: "",
          specialization_id: "1",
          description: "Description",
          birth_date: "2000-12-12",
        },
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      handleClose();
      alert("تمت إضافة الـ Admin بنجاح");
    } catch (error) {
      console.error("فشل إضافة الـ Admin:", error);
    }
  };
  return (
    <div style={{ margin: " 80px 20px 0 20px" }}>
      <DrawerAppBar />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {auth.roles.id === 1 ? (
          <Button onClick={handleOpen} variant="contained">
            Add Admin
          </Button>
        ) : (
          <Button variant="contained">لا يمكنك اضاقة </Button>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography>Add admin</Typography>
            <form onSubmit={handleSubmit}>
              <Box>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="username"
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin="normal"
                  required
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </Box>
              <Box>
                <TextField
                  type="password"
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin="normal"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="name ar"
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin="normal"
                  required
                  value={user.nameAr}
                  onChange={(e) => setUser({ ...user, nameAr: e.target.value })}
                />
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="name en"
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin="normal"
                  required
                  value={user.nameEn}
                  onChange={(e) => setUser({ ...user, nameEn: e.target.value })}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="clinic Id"
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin="normal"
                  required
                  value={user.clinicId}
                  onChange={(e) =>
                    setUser({ ...user, clinicId: e.target.value })
                  }
                />
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="phone Number"
                  variant="outlined"
                  style={{ width: "100%" }}
                  margin="normal"
                  required
                  value={user.phoneNumber}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
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
                  onChange={(e) => setUser({ ...user, cityId: e.target.value })}
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

      {/* view admin */}
    </div>
  );
};

export default AddAdmin;
