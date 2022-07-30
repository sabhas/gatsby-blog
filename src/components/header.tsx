import React, { useState } from "react"

import {
  Collapse,
  FormGroup,
  Label,
  Input,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap"

type Props = {
  siteTitle: string
}

const Header = ({ siteTitle }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar fixed="top" expand="md" container>
      <NavbarBrand href="/">{siteTitle}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/tags">Tags</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/About">About</NavLink>
          </NavItem>
        </Nav>
        <Input
          name="search"
          placeholder="Search"
          type="search"
          style={{ width: "inherit" }}
        />
      </Collapse>
    </Navbar>
  )
}

export default Header
