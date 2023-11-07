import { Container, Group, Title } from "@mantine/core"
import Link from "next/link"

import { ROUTE_PATHS } from "@/consts/route-paths"

import { container, wrapper } from "./Header.css"

const Header: React.FC = () => {
  return (
    <Container className={container}>
      <Group className={wrapper} justify="space-between" align="center">
        <Link href={ROUTE_PATHS.HOME}>
          <Title c="primary-green" order={2}>SeaTheMoss</Title>
        </Link>
      </Group>
    </Container>
  )
}

export default Header