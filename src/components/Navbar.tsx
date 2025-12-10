import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";


function Navbar() {
  return (
    <Box sx={{flexGrow:1}}>
          <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                      
                    </IconButton>
                    <Typography variant="h6" component="div"
                        sx={{ flexGrow: 1 }}>
                        Geeksforgeeks
                    </Typography>
                   
                </Toolbar>
            </AppBar>
    </Box>
  )
}

export default Navbar