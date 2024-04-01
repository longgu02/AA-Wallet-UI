import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { useQRCode } from 'next-qrcode'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useSelector } from 'react-redux'
import { useState } from 'react'
// import { MoonPayBuyWidget } from '@moonpay/moonpay-react'

const Deposit = () => {
  const { Canvas } = useQRCode()
  const { accounts } = useSelector((state: any) => state.account)
  const [isCopied, setCopied] = useState<boolean>(false)
  const [isMoonpayVisible, setMoonpayVisible] = useState<boolean>(false)

  const handleCopyAddress = () => {
    const selectedAccount = accounts.find(acc => acc.isSelected)
    if (selectedAccount) {
      navigator.clipboard.writeText(selectedAccount.address)
      setCopied(true)
    }
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Deposit
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant='h6'>Direct Deposit</Typography>
            <Typography variant='body1'>You can directly deposit tokens into the account</Typography>
            <Box sx={{ margin: '20px auto 20px auto', display: 'flex', justifyContent: 'center' }}>
              <Canvas
                text={'https://github.com/bunlong/next-qrcode'}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 2,
                  scale: 4,
                  width: 200
                }}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: '#24263D',
                padding: 2,
                width: 'fit-content',
                margin: '20px auto 20px auto',
                display: 'flex',
                flexWrap: 'wrap',
                borderRadius: 20
              }}
            >
              <Typography sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                {accounts.length > 0 && accounts.find(acc => acc.isSelected).address}
              </Typography>
              <Tooltip title={isCopied ? 'Copied' : 'Copy Address'}>
                <IconButton onClick={handleCopyAddress} sx={{ marginLeft: 2 }}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant='h6'>Bank Transfer</Typography>
            <Typography variant='subtitle1'>
              Deposit to your account using Bank Transfer, Credit Card, or Debit
            </Typography>
            <Box
              sx={{
                backgroundColor: '#24263D',
                margin: '20px auto 20px auto',
                display: 'flex',
                flexWrap: 'wrap',
                borderRadius: 4,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#35374F' // Change this to the color you want on hover
                }
              }}
              onClick={() => setMoonpayVisible(true)}
            >
              <img
                src='https://coin101.tv/wp-content/uploads/2022/12/1664214447938.gif'
                style={{
                  width: 250,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20
                }}
                alt='MoonPay'
              />
              <Box>
                <Typography sx={{ marginLeft: 5, marginTop: 2 }}>MoonPay</Typography>
                <Typography sx={{ marginLeft: 5, marginTop: 2 }} variant='subtitle2'>
                  Accept Credit card/Debit <br />
                  Fees: from <strong>1%</strong>
                </Typography>
              </Box>
            </Box>
            {/* <MoonPayBuyWidget
              variant='overlay'
              baseCurrencyCode='usd'
              baseCurrencyAmount='100'
              defaultCurrencyCode='eth'
              visible={isMoonpayVisible}
            /> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Deposit
