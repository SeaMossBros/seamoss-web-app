'use client'

import { Button, useMantineTheme } from '@mantine/core'
import axios from 'axios'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { AuthUser } from '@/types/Auth'

const LogoutBtn: React.FC<{ user: AuthUser | null }> = ({ user }) => {
  const { colors, defaultRadius } = useMantineTheme()

  const handleLogout = async () => {
    try {
      await axios('/api/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      window.location.replace(ROUTE_PATHS.PRODUCT.INDEX)
    } catch (err) {
      console.log(err)
    }
  }

  if (!user || !user.id) return <></>

  return (
    <Button
      onClick={handleLogout}
      style={{
        borderRadius: defaultRadius,
        border: `1px solid ${colors.red[6]}`,
        transition: '0.3s ease-in-out',
        cursor: 'pointer',
        minWidth: 'fit-content',
      }}
      variant="outline"
      c={colors.red[6]}
    >
      Logout
    </Button>
  )
}

export default LogoutBtn
