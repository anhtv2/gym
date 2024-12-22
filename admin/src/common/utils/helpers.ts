import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
export const showMessage = (message: string, success: boolean): void => {
  let messageTxt = ''

  if (Array.isArray(message)) {
    message.forEach(function (item) {
      const input = Object.values(item);

      input.forEach(function (i) {
        messageTxt += Object.values(i).join('<br>')
      });

      messageTxt += '<br>'
    });
  } else {
    messageTxt = message
  }
  if (!success) {
    createToast(
      {
        title: 'Error',
        description: messageTxt,
      },
      {
        showIcon: true,
        type: 'danger',
        timeout: 3000,
        transition: 'slide',
      },
    )
  } else {
    createToast(
      {
        title: 'Success',
        description: messageTxt,
      },
      {
        showIcon: true,
        type: 'success',
        timeout: 3000,
        transition: 'slide',
      },
    )
  }
}

export const upperCaseValue = (value: string) => {
  return value.toUpperCase()
};

export function getMinuteEvery(step: number) {
  const minutes = []
  let label: string = ''

  for (let i = 0; i < 60; i += step) {
    if (i < 10) {
      label = '0' + i
    } else {
      label = '' + i
    }
    minutes.push({ label: label, id: label })
  }

  return minutes
}

export function getHour() {
  const hours = []
  let label: string = ''

  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      label = '0' + i
    } else {
      label = '' + i
    }
    hours.push({ label: label, id: label })
  }

  return hours
}

export function toNearestEveryMinutes(value: number, every: number) {
  return Math.floor(value / every) * every
}

export function numberLabel(value: number) {
  return value < 10 ? '0' + value : value.toString()
}
