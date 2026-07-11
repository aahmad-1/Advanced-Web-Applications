// import React from 'react'
import {Link} from "react-router-dom"
// import { useTranslation } from 'react-i18next'
// import { Suspense } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Joke Generator
                    </Typography>
                    <Button color="inherit" component={Link} to="/"> {/* should work according to https://mui.com/material-ui/integrations/routing/#button*/}
                        home
                    </Button>
                    <Button color="inherit" component={Link} to="/saved">
                        saved
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;