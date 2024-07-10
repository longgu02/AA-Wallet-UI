/* eslint-disable @typescript-eslint/ban-types */
import { Card, CardContent, CircularProgress, Grid } from '@mui/material'
import { formatEther } from 'ethers'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useImmer } from 'use-immer'
import { fetchAllBalance } from 'src/utils/connection'

// interface Data {
//   token: string
//   balance: string
//   price: string
// }

const WalletHeaderCard = () => {
  const { accounts } = useSelector((state: any) => state.account)
  const [balance, setBalance] = useState<BigInt>(BigInt(0))
  console.log({ accounts })
  const [rows, updateRows] = useImmer<Array<any>>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  function createData(token: string, balance: string, index: number) {
    const color = ['#3498db', '#e8e337', '#e8e337', '#e8e337', '#e8e337']

    return {
      name: token,
      y: balance && Number(balance),
      color: color[index]
    }
  }

  useEffect(() => {
    setLoading(true)
    if (accounts.length > 0) {
      fetchAllBalance(accounts.find((acc: any) => acc.isSelected == true)?.address[0])
        .then((res: any) => {
          let total = BigInt(0)
          updateRows([])
          res.map((token: any, index: any) => {
            total += BigInt(token.balance)
            updateRows(
              draft => void draft.push(createData(token.name.toUpperCase(), formatEther(token.balance), index))
            )
          })
          setBalance(total)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    setLoading(false)
  }, [accounts, updateRows])

  // useEffect(() => {
  //   const provider = getJsonRpcProvider()
  //   if (accounts.length > 0) {
  //     provider
  //       .getBalance(accounts.find((acc: any) => acc.isSelected == true)?.address[0])
  //       .then(balance => {
  //         setBalance(balance)
  //         console.log(balance)
  //       })
  //       .catch(err => console.error(err))
  //   }
  // }, [accounts])

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
      text: isLoading ? <CircularProgress /> : `$${balance && Number(formatEther(balance.toString())).toFixed(4)}`,
      style: {
        color: '#ffffff',
        fontSize: '24px'
      },
      x: -40
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
        name: 'Balance', // Separate series for ETH
        data: rows
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
              {accounts.length != 0 ? accounts.find((acc: any) => acc.isSelected == true).address : 'Connect to your wallet!'}
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
