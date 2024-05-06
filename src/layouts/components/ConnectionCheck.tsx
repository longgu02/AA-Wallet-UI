import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

const ConnectionCheck = (props: { children: ReactNode }) => {
  const { accounts } = useSelector((state: any) => state.account)

  return (
    <Box>
      {accounts.length <= 0 ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography>Please connect to your account first (Email/EOA)</Typography>
        </Box>
      ) : (
        props.children
      )}
    </Box>
  )
}

export default ConnectionCheck
