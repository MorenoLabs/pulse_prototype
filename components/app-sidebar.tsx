"use client"

import type React from "react"
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, Divider } from "@mui/material"
import { Dashboard, People, BarChart, Settings, TrendingUp, FileText } from "@mui/icons-material"
import { Link } from "react-router-dom"

interface AppSidebarProps {
  open: boolean
  onClose: () => void
}

const AppSidebar: React.FC<AppSidebarProps> = ({ open, onClose }) => {
  const drawerWidth = 240

  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: Dashboard,
    },
    {
      title: "Users",
      url: "/users",
      icon: People,
    },
    {
      title: "COO Center",
      url: "/gm-center",
      icon: TrendingUp,
    },
    {
      title: "GM Reports",
      url: "/stress-action-report",
      icon: FileText,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {items.map((item) => (
            <ListItem button key={item.title} component={Link} to={item.url} onClick={onClose}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  )
}

export default AppSidebar
