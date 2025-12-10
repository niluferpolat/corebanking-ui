import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import authImage from "../../assets/authpage.svg";
import "./RegisterPage.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="register-container">
      <Card
        sx={{
          display: "flex",
          width: 750,
          borderRadius: 3,
          boxShadow: 5,
          overflow: "hidden",
        }}
      >
        <CardMedia
          sx={{ width: 350, display: { xs: "none", md: "block" } }}
          component="img"
          image={authImage}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "0 1 auto", padding: 4 }}>
            <Typography component="div" variant="h5" fontWeight={600}>
              Sign Up
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mb: 2 }}>
              Please provide your details to create an account
            </Typography>
            <form>
              <TextField label="Username" margin="normal" variant="outlined" fullWidth />
              <TextField label="Email" margin="normal" variant="outlined" fullWidth />
              <TextField
                label="Password"
                margin="normal"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                margin="normal"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button fullWidth variant="contained" size="large" sx={{ mt: 3, py: 1.2 }}>
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
}

export default RegisterPage;
