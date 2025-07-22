import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';

/** ホームのみのメニューリスト */
export const HOME_MENU = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    link: '/',
    devOnly: false,
  },
]

/** 一般ユーザー用のメニューリスト */
export const USER_MENU = [
  ...HOME_MENU,
  {
    text: 'Todo',
    icon: <TaskAltIcon />,
    link: '/todo',
    devOnly: false,
  },
  {
    text: 'Skill-Sheet',
    icon: <EditDocumentIcon />,
    link: '/skill-Sheet',
    devOnly: false,
  },
  {
    text: 'Page1',
    icon: <DescriptionIcon />,
    link: '/page1',
    devOnly: false,
  },
]

/** 開発者用のメニューリスト */
export const DEVELOPER_MENU = [
  ...USER_MENU,
  {
    text: 'TableViewer',
    icon: <StorageIcon />,
    link: '/TableViewer',
    devOnly: true,
  },
];
