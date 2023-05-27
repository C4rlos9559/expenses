import { toast } from 'react-toastify'

export const notify = (type, id, msg) => {
  const toastType = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  }
  return toast(msg, {
    toastId: id,
    type: toastType[type] || 'info',
  })
}
