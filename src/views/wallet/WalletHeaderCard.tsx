import { Card, CardContent, Grid } from '@mui/material'
import { JsonRpcProvider, formatEther } from 'ethers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const WalletHeaderCard = () => {
  const { accounts } = useSelector((state: any) => state.account)
  const [balance, setBalance] = useState<bigint | undefined>(undefined)

  useEffect(() => {
    const provider = new JsonRpcProvider('http://localhost:8545')

    provider
      .getBalance(accounts.find((acc: any) => acc.isSelected == true).address)
      .then(balance => {
        setBalance(balance)
        console.log(balance)
      })
      .catch(err => console.error(err))
  }, [accounts])

  const options = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'pie',
      renderTo: 'atmospheric-composition',
      width: 440, // width of the chart
      height: 250, // height of the chart
      backgroundColor: '#312D4B'
    },
    title: {
      verticalAlign: 'middle',
      align: 'center',
      floating: true,
      text: `$${balance && formatEther(balance)}`,
      style: {
        color: '#ffffff',
        fontSize: '24px'
      },
      x: -54
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false
        },
        innerSize: '90%', // Makes the pie chart thinner
        showInLegend: true
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemStyle: {
        color: '#ffffff' // Change this to the color you want
      }
    },
    series: [
      {
        name: 'Balance',
        data: [
          {
            name: 'Ethereum',
            y: balance && Number(formatEther(balance)),
            color: '#3498db'
          }
        ]
      }
    ]
  }

  return (
    <Card sx={{ marginBottom: 4 }}>
      <Grid container spacing={6}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            paddingBottom: 0,
            marginLeft: 5
          }}
        >
          {/* <AccountBalanceWalletIcon sx={{ fontSize: 100, color: '#C3B1E1', marginTop: 'auto', marginBottom: 'auto' }} /> */}
          <HighchartsReact highcharts={Highcharts} options={options} />
        </CardContent>
        {/* <Grid
          item
          xs={12}
          md={7}
          sx={{
            paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
            paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
          }}
        >
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {accounts.length != 0 ? accounts.find(acc => acc.isSelected == true).address : 'Connect to your wallet!'}
            </Typography>
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
              Balance:{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {balance != undefined ? formatEther(balance) : 'X'} ETH
              </Box>
            </Typography>
          </CardContent>
        </Grid> */}
      </Grid>
    </Card>
  )
}

export default WalletHeaderCard
