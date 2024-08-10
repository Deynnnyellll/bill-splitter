import { PiSquaresFourFill, PiReceiptFill } from "react-icons/pi";
import { TiUser } from "react-icons/ti";

const navIcons = [PiSquaresFourFill, PiReceiptFill, TiUser]

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

export const billLists = [
  {
    id: 1,
    color: '#e5d9ff',
    title: 'Lolita',
    date: '24 Sep, 2022',
    amount: 279.55,
    count: 6
  },
  {
    id: 2,
    color: '#d2eddd',
    title: 'Rooms bar',
    date: '15 Sep, 2022',
    amount: 120.00,
    count: 3
  },
  {
    id: 3,
    color: '#fff4be',
    title: 'Tsota shop',
    date: '27 Aug, 2022',
    amount: 176.40,
    count: 4
  },
  {
    id: 4,
    color: '#e7e7f5',
    title: 'Pull&Bear',
    date: '20 Aug, 2022',
    amount: 125.65,
    count: 1
  }
]
