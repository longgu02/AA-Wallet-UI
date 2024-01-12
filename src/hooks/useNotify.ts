import { useSnackbar } from 'notistack'
import type { OptionsObject } from 'notistack'

export const ERR_TOP_CENTER: OptionsObject = {
  variant: 'error',
  anchorOrigin: { vertical: 'top', horizontal: 'center' }
}
export const WARNING_TOP_CENTER: OptionsObject = {
  variant: 'warning',
  anchorOrigin: { vertical: 'top', horizontal: 'center' }
}
export const INFO_TOP_CENTER: OptionsObject = {
  variant: 'info',
  anchorOrigin: { vertical: 'top', horizontal: 'center' }
}
export const SUCCESS_TOP_CENTER: OptionsObject = {
  variant: 'success',
  anchorOrigin: { vertical: 'top', horizontal: 'center' }
}

export default function useNotify() {
  const { enqueueSnackbar } = useSnackbar()

  const errorNotify = (message: string) => {
    enqueueSnackbar(message, ERR_TOP_CENTER)
  }

  const successNotify = (message: string) => {
    enqueueSnackbar(message, SUCCESS_TOP_CENTER)
  }

  const infoNotify = (message: string) => {
    enqueueSnackbar(message, INFO_TOP_CENTER)
  }

  const warnNotify = (message: string) => {
    enqueueSnackbar(message, WARNING_TOP_CENTER)
  }

  return { errorNotify, successNotify, infoNotify, warnNotify }
}
