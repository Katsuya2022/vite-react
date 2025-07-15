import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';

const SideMenuDatas = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    link: '/',
    devOnly: false,
  },
  {
    text: 'Todo',
    icon: <TaskAltIcon />,
    link: '/todo',
    devOnly: false,
  },
  {
    text: 'Page1',
    icon: <DescriptionIcon />,
    link: '/page1',
    devOnly: false,
  },
  {
    text: 'TableViewer',
    icon: <StorageIcon />,
    link: '/TableViewer',
    devOnly: true,
  },
];

export default SideMenuDatas;
