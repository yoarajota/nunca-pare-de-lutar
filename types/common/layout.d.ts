export interface ChildProps {
  children: React.ReactNode
}

export interface LocaleProps {
  locale: string
}
export interface LayoutProps extends ChildProps {
  children: React.ReactNode
  params: LocaleProps
}

export interface NodeProps {
  children: React.ReactNode
}

export interface NavbarProps extends ChildProps, LocaleProps {}

export interface NavbarMobileContextProps {
  isOpen: boolean

  toggleNavbar: () => void
}
