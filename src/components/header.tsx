import React, { useState, useEffect, useDeferredValue } from "react"
import { navigate } from "gatsby"

import {
  Collapse,
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
  const search = location.search
  const searchQueryParam = new URLSearchParams(search).get("search")
  const [searchQuery, setSearchQuery] = useState(searchQueryParam ?? "")
  const deferredSearchQuery = useDeferredValue(searchQuery)

  useEffect(() => {
    if (deferredSearchQuery) {
      navigate(`/?search=${deferredSearchQuery}`)
    } else {
      navigate("/")
    }
  }, [deferredSearchQuery])

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
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </Nav>
        <Input
          name="search"
          placeholder="Search"
          type="search"
          style={{ width: "inherit" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </Collapse>
    </Navbar>
  )
}

export default Header
