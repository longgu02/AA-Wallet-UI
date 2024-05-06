// ** Icon imports
// import Login from 'mdi-material-ui/Login'
// import Table from 'mdi-material-ui/Table'
// import CubeOutline from 'mdi-material-ui/CubeOutline'
// import HomeOutline from 'mdi-material-ui/HomeOutline'
// import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'

import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
// import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import ReplyIcon from '@mui/icons-material/Reply'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import CardMembershipIcon from '@mui/icons-material/CardMembership'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { CreditCardOutlined } from '@mui/icons-material'

const navigation = (): VerticalNavItemsType => {
  return [
    // {
    //   title: 'Dashboard',
    //   icon: HomeOutline,
    //   path: '/'
    // },

    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    {
      sectionTitle: 'Wallet'
    },

    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login'

    //   // openInNewTab: true
    // },
    {
      title: 'Wallet',
      icon: AccountBalanceWalletOutlinedIcon,
      path: '/wallet'
    },

    {
      title: 'Deposit',
      icon: CreditCardOutlined,
      path: '/wallet/deposit'
    },
    {
      title: 'Transfer',
      icon: ReplyIcon,
      path: '/wallet/transfer'
    },
    {
      title: 'Transactions History',
      icon: ReceiptLongIcon,
      path: '/wallet/transactions'
    },
    {
      title: 'Paymaster',
      icon: AlertCircleOutline,
      path: '/paymaster'
    },
    {
      sectionTitle: 'Security'
    },
    {
      title: 'Manage Account',
      icon: AccountCogOutline,
      path: '/security/account'
    },
    {
      title: 'Manage Sessions',
      path: '/security/sessions',
      icon: GoogleCirclesExtended
    },

    // {
    //   title: 'Address Book',
    //   path: '/security/address-book',
    //   icon: GoogleCirclesExtended
    // },
    {
      sectionTitle: 'Plugins'
    },
    {
      title: 'Subscription',
      icon: CardMembershipIcon,
      path: '/plugins/subscription'
    }

    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
