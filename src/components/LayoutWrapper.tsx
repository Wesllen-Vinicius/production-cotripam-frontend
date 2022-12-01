import Footer from './Footer'
import { ReactNode } from 'react'
import { LogoHeader } from './LogoHeader'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { AnimatedDiv } from './animations/Transition'
import SectionContainer from './SectionContainer'
interface Props {
  children: ReactNode
}

const headerNavLinks = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Login',
    href: '/login',
  },
]

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <AnimatedDiv>
        <SectionContainer>
          <div className="flex h-screen w-auto flex-col justify-between ">
            <header className="flex items-center justify-between py-2">
              <div>
                <Link href="/" aria-label="">
                  <div className="flex items-center justify-between">
                    <div className="mr-3">
                      <LogoHeader />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex items-center text-base leading-5">
                <div className="hidden sm:block">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <ThemeSwitch />
                <MobileNav />
              </div>
            </header>
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
        </SectionContainer>
      </AnimatedDiv>
    </>
  )
}

export default LayoutWrapper
