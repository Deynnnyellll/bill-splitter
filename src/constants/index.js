import { PiSquaresFourFill, PiReceiptFill } from "react-icons/pi";
import { TiUser } from "react-icons/ti";

const navIcons = [PiSquaresFourFill, PiReceiptFill, TiUser]

export const navLinkContent = [
  {
    id: 'home',
    path: '/',
    logo: navIcons[0],
    title: 'Home'
  },
  {
    id: 'history',
    path: '/history',
    logo: navIcons[1],
    title: 'History'
  },
  {
    id: 'friends',
    path: '/friends',
    logo: navIcons[2],
    title: 'Friends'
  }
]