import { BsPostcard } from "react-icons/bs"
import { NavButton } from "../nav-button"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"

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
        </li>
      </ul>
    </nav>
  )
}
