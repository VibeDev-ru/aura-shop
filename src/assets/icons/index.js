import { 
  FiShoppingCart,
  FiStar, 
  FiTruck, 
  FiRefreshCw,
  FiSun,
  FiMoon,
  FiSearch,
  FiMenu,
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowRight,
  FiArrowLeft,
  FiHome,
  FiGrid,
  FiTag,
  FiAward,
  FiShield,
  FiPackage,
  FiSend,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiHeart
} from 'react-icons/fi';

import { 
  FaTelegram, 
  FaInstagram, 
  FaPinterest, 
  FaYoutube 
} from 'react-icons/fa';

import { 
  IoMdMoon,
  IoMdSunny,
  IoMdCart,
  IoMdLeaf
} from 'react-icons/io';

import { 
  MdVerified, 
  MdEco,
  MdStars,
  MdLightbulb,
  MdLocalFlorist,
  MdShoppingBag
} from 'react-icons/md';

// Только те иконки, которые точно есть в react-icons/tb
import { 
  TbPlant,
  TbLamp,
  TbCandle,
  TbBrandTelegram,
  TbShoppingBag
} from 'react-icons/tb';

// Для категорий используем доступные иконки
export const CategoryIcons = {
  aromas: TbCandle,
  decor: MdLocalFlorist,  // Замена для TbVase
  accessories: TbShoppingBag,
  lighting: TbLamp,
  plants: TbPlant
};

// Премиальные иконки для преимуществ
export const AdvantageIcons = {
  quality: MdVerified,
  delivery: FiTruck,
  returns: FiRefreshCw,
  eco: MdEco
};

// Социальные сети
export const SocialIcons = {
  instagram: FaInstagram,
  telegram: FaTelegram,
  pinterest: FaPinterest,
  youtube: FaYoutube
};

// Базовые иконки
export const Icons = {
  cart: FiShoppingCart,
  heart: FiHeart,
  star: FiStar,
  search: FiSearch,
  menu: FiMenu,
  close: FiX,
  plus: FiPlus,
  minus: FiMinus,
  trash: FiTrash2,
  arrowRight: FiArrowRight,
  arrowLeft: FiArrowLeft,
  home: FiHome,
  grid: FiGrid,
  tag: FiTag,
  award: FiAward,
  shield: FiShield,
  package: FiPackage,
  send: FiSend,
  mail: FiMail,
  phone: FiPhone,
  mapPin: FiMapPin,
  clock: FiClock,
  sun: FiSun,
  moon: FiMoon,
  leaf: IoMdLeaf,
  moonIcon: IoMdMoon,
  sunIcon: IoMdSunny,
  cartIcon: IoMdCart,
  verified: MdVerified,
  eco: MdEco,
  stars: MdStars,
  lightbulb: MdLightbulb,
  flower: MdLocalFlorist,
  shoppingBag: MdShoppingBag,
  plant: TbPlant,
  lamp: TbLamp,
  candle: TbCandle,
  telegram: TbBrandTelegram
};

export default Icons;