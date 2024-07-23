import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { AuthButton } from '@/components/authButton'

const menuItems = siteConfig.navMenuItems

export const Navbar = () => {
  return (
    <div>
      <ul>
        {menuItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${item.label}-${index}`}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <AuthButton />
    </div>
  )
}
