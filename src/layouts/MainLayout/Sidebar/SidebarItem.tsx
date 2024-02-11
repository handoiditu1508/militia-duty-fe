import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { useState } from "react";
import { Link, To, useMatch, useResolvedPath } from "react-router-dom";

export type SidebarTab = {
  title: string;
  to: To;
  icon?: JSX.Element;
  childs?: SidebarTab[];
};
type SidebarItemProps = {
  sidebarTab: SidebarTab;
  level?: number;
  hideChilds?: boolean;
};

export default function SidebarItem({ sidebarTab, level = 0, hideChilds }: SidebarItemProps) {
  const theme = useTheme();
  const [leftPadding] = useState<number>(theme.constants.sidebarLeftPadding || 0);
  const resolved = useResolvedPath(sidebarTab.to);
  const fullyMatch = useMatch({ path: resolved.pathname, end: true });
  const partialMatch = useMatch({ path: resolved.pathname, end: false });
  const [open, setOpen] = useState<boolean>(!!partialMatch);

  const handleClickItem = () => {
    setOpen(!open);
  };

  const handleClickExpandIcon: React.MouseEventHandler<SVGSVGElement> = (event) => {
    // collapse child without open the link
    event.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <ListItem>
        <ListItemButton component={Link} selected={!!fullyMatch} onClick={handleClickItem} to={sidebarTab.to} style={{ paddingLeft: leftPadding + (level * theme.constants.scalingFactor) }}>
          {sidebarTab.icon && <ListItemIcon>
            {sidebarTab.icon}
          </ListItemIcon>}
          <ListItemText primary={sidebarTab.title} />
          {sidebarTab.childs && sidebarTab.childs.length !== 0 && <ExpandMoreIcon sx={{
            transform: open ? "rotate(180deg)" : undefined,
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.sharp,
            }),
            "&:hover": {
              color: theme.palette.error.main,
            },
          }} onClick={handleClickExpandIcon} />}
        </ListItemButton>
      </ListItem>
      {sidebarTab.childs && sidebarTab.childs.length !== 0 && <Collapse in={open && !hideChilds} unmountOnExit>
        <List disablePadding dense>
          {sidebarTab.childs.map(child => <SidebarItem key={child.title} sidebarTab={child} level={level + 1} hideChilds={hideChilds} />)}
        </List>
      </Collapse>}
    </>
  );
}
