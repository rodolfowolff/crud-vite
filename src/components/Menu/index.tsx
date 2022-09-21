import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Diamond, Category } from "@mui/icons-material";
import CustomAppBar from "../AppBar";

function CustomMenu({ children }: any): JSX.Element {
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawer(open);
    };

  const ListItemMenu = [
    { label: "Inicio", to: "/", icon: <Home /> },
    { label: "Produtos", to: "/products", icon: <Diamond /> },
    { label: "Categorias", to: "/categories", icon: <Category /> },
  ];

  return (
    <>
      <div>
        <Drawer
          anchor="left"
          open={drawer}
          onClose={(): void => setDrawer(false)}
        >
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {ListItemMenu.map((text) => (
                <ListItem
                  component={NavLink}
                  to={text.to}
                  key={text.label}
                  disablePadding
                  sx={{ display: "block", color: "white" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 30,
                      justifyContent: "start",
                      px: 4.5,
                      marginTop: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 2,
                        justifyContent: "start",
                        color: "white",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.label}
                      sx={{ opacity: drawer ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </div>

      <CustomAppBar toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </>
  );
}

export default memo(CustomMenu);
