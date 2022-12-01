import Swal from 'sweetalert2'

export const Notification = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (notification) => {
    notification.addEventListener('mouseenter', Swal.stopTimer)
    notification.addEventListener('mouseleave', Swal.resumeTimer)
  },
})
