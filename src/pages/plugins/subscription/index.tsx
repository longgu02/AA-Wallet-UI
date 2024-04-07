import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { Contract, JsonRpcProvider } from 'ethers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { accountAbi } from 'src/constant/abis/accountAbi'
import { subscriptionPluginAbi, subscriptionPluginBytecode } from 'src/constant/abis/plugins/subscriptionPluginAbi'
import { SUBPLUGIN_ADDRESS } from 'src/constant/address'
import { getJsonRpcProvider } from 'src/constant/chain'
import { client } from 'src/services/client'
import { installPlugin } from 'src/utils/plugin'
import ServiceCard from 'src/views/subscription/ServiceCard'

const SubscriptionPage = () => {
  const [services, setServices] = useState([])
  const { accounts } = useSelector(state => state.account)
  const [isInstalled, setInstalled] = useState<boolean | undefined>()
  const [isInstallLoading, setInstallLoading] = useState<boolean>(false)

  const handleInstall = async () => {
    setInstallLoading(true)
    await installPlugin(
      accounts.find(acc => acc.isSelected)?.address,
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      SUBPLUGIN_ADDRESS,
      subscriptionPluginAbi
    )
      .then(res => {
        console.log(res)
        setInstalled(true)
      })
      .catch(err => {
        console.log(err)
      })
    setInstallLoading(false)
  }

  useEffect(() => {
    const provider = getJsonRpcProvider()
    if (accounts.length > 0) {
      client
        .get('/plugin/subscription/services')
        .then(res => {
          setServices(res)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })

      const account = new Contract(accounts.find(acc => acc.isSelected)?.address, accountAbi, provider)
      account
        .checkPluginInstalled(SUBPLUGIN_ADDRESS)
        .then(res => {
          console.log(res)
          setInstalled(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  return (
    <Box sx={{ position: 'relative', height: '80vh' }}>
      {isInstalled ? (
        <Box>
          <Typography variant='h4' sx={{ marginBottom: 3 }}>
            Subscription
          </Typography>
          <Box>
            <Grid container spacing={3}>
              {services.length > 0 &&
                services.map((service: any) => (
                  <Grid key={service._id} item xs={4}>
                    <ServiceCard data={service} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {isInstallLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Typography>
                {accounts.length > 0 ? 'Please install the plugin to your account!' : 'Connect your account first!'}
              </Typography>
              {accounts.length > 0 && (
                <Button variant='contained' sx={{ marginTop: 4 }} onClick={handleInstall}>
                  Install
                </Button>
              )}
            </Box>
          )}
          <Typography>
            {/* Subscription plugin allows users to “subscribe” to various services or other users, much like one would
            subscribe to a magazine or online service. This could include anything from subscribing to updates from a
            particular user, to subscribing to a recurring service provided by a smart contract */}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default SubscriptionPage
