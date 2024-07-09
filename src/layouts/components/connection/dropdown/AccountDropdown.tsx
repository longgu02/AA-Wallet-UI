// ** React Imports
import { useState, Fragment, ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icons Imports

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import ConnectWalletButton from '../ConnectWalletButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccount } from 'src/redux/connection/accountSlice'

// ** Styled Menu component
// const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
//   '& .MuiMenu-paper': {
//     width: 380,
//     overflow: 'hidden',
//     marginTop: theme.spacing(4),
//     [theme.breakpoints.down('sm')]: {
//       width: '100%'
//     }
//   },
//   '& .MuiMenu-list': {
//     padding: 0
//   }
// }))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
// const Avatar = styled(MuiAvatar)<AvatarProps>({
//   width: '2.375rem',
//   height: '2.375rem',
//   fontSize: '1.125rem'
// })

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = () => {
  // ** States
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const { accounts } = useSelector((state: any) => state.account)
  const dispatch = useDispatch()

  // const handleDropdownOpen = (event: SyntheticEvent) => {
  //   setAnchorEl(event.currentTarget)
  // }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const ScrollWrapper = ({ children }: { children: ReactNode }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  console.log({ accounts })

  return (
    <>
      {accounts.length > 0 && (
        <MenuItem disableRipple onClick={handleDropdownClose} disabled>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            {/* <Avatar alt='Flora' src='/images/avatars/4.png' /> */}
            <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
              <MenuItemTitle>
                {accounts.find((acc: any) => acc.isSelected)?.logger == 'eoa'
                  ? 'Metamask'
                  : `Email: ${accounts.find((acc: any) => acc.isSelected)?.logger}`}{' '}
                <Chip
                  size='small'
                  label='Current'
                  color='primary'
                  sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
                />
              </MenuItemTitle>
              <MenuItemSubtitle variant='body2'>
                Currently Selected |{' '}
                {accounts.find((acc: any) => acc.isSelected)?.logger == 'eoa' ? 'Metamask' : `Email/password`}{' '}
              </MenuItemSubtitle>
            </Box>
          </Box>
        </MenuItem>
      )}
      {accounts.length > 0 &&
        accounts.map(
          (acc: any) =>
            !acc.isSelected && (
              <ScrollWrapper>
                <MenuItem onClick={handleDropdownClose}>
                  <Box
                    sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
                    onClick={() => dispatch(selectAccount(acc.publicKey))}
                  >
                    {/* <Avatar alt='Flora' src='/images/avatars/4.png' /> */}
                    <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{acc.logger}</MenuItemTitle>
                      <MenuItemSubtitle variant='body2'>
                        {acc.logger != 'eoa' ? `Email/password` : 'Metamask'}
                      </MenuItemSubtitle>
                    </Box>
                  </Box>
                </MenuItem>
              </ScrollWrapper>
            )
        )}
      <MenuItem
        disableRipple
        sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
      >
        {/* <Button fullWidth variant='contained' onClick={handleDropdownClose}>
          Read All Notifications
        </Button> */}
        <ConnectWalletButton />
      </MenuItem>
    </>
  )
}

export default NotificationDropdown
