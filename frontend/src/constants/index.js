import { PiSquaresFourFill, PiReceiptFill } from "react-icons/pi";
import { TiUser } from "react-icons/ti";
import { HiUser, HiLockClosed } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";


const navIcons = [PiSquaresFourFill, PiReceiptFill, TiUser]
const loginIcons = [HiUser, IoMdMail, HiLockClosed]

export const navLinkContent = [
  {
    id: 'home',
    path: '/home',
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

export const loginDetails = [
  {
    id: 1,
    icon: loginIcons[0],
    inputType: 'text',
    text: 'Username'
  },
  {
    id: 2,
    icon: loginIcons[1],
    inputType: 'email',
    text: 'Email'
  },{
    id: 3,
    icon: loginIcons[2],
    inputType: 'password',
    text: 'Password'
  },
]

export const friends = [
  {
    id: 1,
    name: 'Carl',
    added: false
  },
  {
    id: 2,
    name: 'James',
    added: false
  },
  {
    id: 3,
    name: 'Matthew',
    added: false
  },
]
