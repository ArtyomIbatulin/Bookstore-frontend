import { BsPostcard } from "react-icons/bs"
import { NavButton } from "../nav-button"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"
import { Fa6 } from "react-icons/fa6"

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Главная
          </NavButton>
          <NavButton href="/order" icon={<FiUsers />}>
            Корзина
          </NavButton>
          <NavButton href="/wishlist" icon={<FaUsers />}>
            Лайки
          </NavButton>
          <NavButton href="/profile" icon={<Fa6 />}>
            Профиль
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
