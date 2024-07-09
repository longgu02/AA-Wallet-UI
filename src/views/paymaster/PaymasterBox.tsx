import * as React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Box, Divider, Tab, Tabs } from '@mui/material'

// import DialogContent from '@mui/material/DialogContent'
// import PaymasterOverview from './paymasterOptions/Overview'
// import PaymasterGasTank from './paymasterOptions/GasTank'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

// function CustomTabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role='tabpanel'
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   )
// }

export default function PaymasterBox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: '#24263D',
          padding: 3,
          borderRadius: 4,
          '&:hover': {
            backgroundColor: '#3c3f58',
            cursor: 'pointer' // Change this to the color you want when hovering
          }
        }}
        onClick={handleClickOpen}
      >
        <Box>
          <Typography>Name: Paymaster for my groceries Status</Typography>
          <Typography>Status: Active</Typography>
          <Divider />
          <Typography>Network: Sepolia</Typography>
          <Typography>Type: Pay-as-you-go </Typography>
        </Box>
      </Box>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open} fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Overview' />
              <Tab label='Gas Tank' />
              <Tab label='Item Three' />
            </Tabs>
          </Box>
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* <DialogContent>
          <CustomTabPanel value={value} index={0}>
            <PaymasterOverview />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PaymasterGasTank setOpenDialog={setOpen} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </DialogContent> */}
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Exit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
