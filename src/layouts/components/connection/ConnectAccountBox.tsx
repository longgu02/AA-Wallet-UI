/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/redux/hooks'
import { formatAddress } from 'src/utils'
import { SyntheticEvent, useState } from 'react'
import AccountDropdown from './dropdown/AccountDropdown'
import { styled, Theme } from '@mui/material/styles'
import MuiMenu, { MenuProps } from '@mui/material/Menu'

const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

const ConnectAccountBox = () => {
  const { accounts } = useAppSelector((state: any) => state.account)
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }
  const getCurSelectedAccount = () => {
    const selectedAccount = accounts.find((account: any) => account.isSelected == true)
    if (selectedAccount) {
      if (selectedAccount.logger != 'eoa') return selectedAccount.logger
      else return selectedAccount.publicKey
    }
  }

  // const handleDropdownClose = () => {
  //   setMenuOpen(false)
  // }

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#312D4B',
          padding: 2,
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#434343',
            cursor: 'pointer'
          },
          flexWrap: 'wrap',
          display: 'flex'
        }}
        onClick={handleDropdownOpen}
      >
        <Typography sx={{ color: 'white', marginTop: 'auto', marginBottom: 'auto' }}>
          {getCurSelectedAccount() ? formatAddress(getCurSelectedAccount(), 9) : 'Connect Wallet'}
        </Typography>
        {/* <Box sx={{ marginTop: 1 }}>
        <KeyboardArrowDownIcon sx={{ marginTop: 3 }} />
      </Box> */}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <AccountDropdown />
      </Menu>
    </Box>
  )
}

export default ConnectAccountBox
