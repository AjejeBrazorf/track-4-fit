import Link from 'next/link'
import * as React from 'react'

import { siteConfig } from '@/config/siteConfig'
import { AuthButton } from '@/components/authButton'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ModeToggle } from '@/components/theme-toggle'
import Logo from '@/public/logo.svg'

import styles from './navbar.module.scss'

const menuItems = siteConfig.navMenuItems

export const Navbar = () => {
  return (
    <div className={styles.root}>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>
      <Logo className={styles.logo} />
      <div>
        <AuthButton />
      </div>
    </div>
  )
}
