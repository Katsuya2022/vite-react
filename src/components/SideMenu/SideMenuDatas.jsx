import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';

const SideMenuDatas = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    link: '/'
  },
  {
    text: 'Todo',
    icon: <TaskAltIcon />,
    link: '/todo'
  },
  {
    text: 'Page1',
    icon: <DescriptionIcon />,
    link: '/page1'
  },
  {
    text: 'TableViewer',
    icon: <StorageIcon />,
    link: '/TableViewer'
  },
];

export default SideMenuDatas;
