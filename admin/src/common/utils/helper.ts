import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

interface TimeDifference {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface RGBColor {
  (opacity?: number): string;
}

const helpers = {
  cutText(text: string, length: number): string {
    if (text.split(' ').length > 1) {
      const string = text.substring(0, length)
      const splitText = string.split(' ')
      splitText.pop()
      return splitText.join(' ') + '...'
    } else {
      return text
    }
  },

  formatDate(date: string, format: string): string {
    return dayjs(date).format(format)
  },

  capitalizeFirstLetter(string: string): string {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    } else {
      return ''
    }
  },

  onlyNumber(string: string): string {
    if (string) {
      return string.replace(/\D/g, '')
    } else {
      return ''
    }
  },

  formatCurrency(number: number): string {
    if (number) {
      const formattedNumber = number.toString().replace(/\D/g, '')
      const rest = formattedNumber.length % 3
      let currency = formattedNumber.substr(0, rest)
      const thousand = formattedNumber.substr(rest).match(/\d{3}/g)
      let separator

      if (thousand) {
        separator = rest ? '.' : ''
        currency += separator + thousand.join('.')
      }

      return currency
    } else {
      return ''
    }
  },

  timeAgo(time: string): string | boolean {
    const date = new Date(
      (time || '').replace(/-/g, '/').replace(/[TZ]/g, ' '),
    )
    const diff = (new Date().getTime() - date.getTime()) / 1000
    const dayDiff = Math.floor(diff / 86400)

    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
      return dayjs(time).format('MMMM DD, YYYY')
    }

    return (
      (dayDiff === 0 &&
        ((diff < 60 && 'just now') ||
          (diff < 120 && '1 minute ago') ||
          (diff < 3600 && Math.floor(diff / 60) + ' minutes ago') ||
          (diff < 7200 && '1 hour ago') ||
          (diff < 86400 && Math.floor(diff / 3600) + ' hours ago'))) ||
      (dayDiff === 1 && 'Yesterday') ||
      (dayDiff < 7 && dayDiff + ' days ago') ||
      (dayDiff < 31 && Math.ceil(dayDiff / 7) + ' weeks ago')
    )
  },

  diffTimeByNow(time: string): TimeDifference {
    const startDate = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss').toString())
    const endDate = dayjs(dayjs(time).format('YYYY-MM-DD HH:mm:ss').toString())

    const duration = dayjs.duration(endDate.diff(startDate))
    const milliseconds = Math.floor(duration.asMilliseconds())

    const days = Math.round(milliseconds / 86400000)
    const hours = Math.round((milliseconds % 86400000) / 3600000)
    let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000)
    const seconds = Math.round(
      (((milliseconds % 86400000) % 3600000) % 60000) / 1000,
    )

    if (seconds < 30 && seconds >= 0) {
      minutes += 1
    }

    const padZero = (value: number): string =>
      value < 10 ? '0' + value : value.toString()

    return {
      days: padZero(days),
      hours: padZero(hours),
      minutes: padZero(minutes),
      seconds: padZero(seconds),
    }
  },

  isset(obj: any): boolean {
    if (obj !== null && obj !== undefined) {
      if (typeof obj === 'object' || Array.isArray(obj)) {
        return Object.keys(obj).length > 0
      } else {
        return obj.toString().length > 0
      }
    }
    return false
  },

  toRaw(obj: any): any {
    return JSON.parse(JSON.stringify(obj))
  },

  randomNumbers(from: number, to: number, length: number): number[] {
    const numbers: number[] = [0]
    for (let i = 1; i < length; i++) {
      numbers.push(Math.ceil(Math.random() * (from - to) + to))
    }
    return numbers
  },

  toRGB(colors: any): any {
    const tempColors: any = Object.assign({}, colors)
    const rgbColors = Object.entries(tempColors)

    for (const [key, value] of rgbColors) {
      if (typeof value === 'string') {
        if (value.replace('#', '').length == 6) {
          const aRgbHex: any = value.replace('#', '').match(/.{1,2}/g)
          tempColors[key] = (opacity = 1) =>
            `rgb(${parseInt(aRgbHex[0], 16)} ${parseInt(
              aRgbHex[1],
              16,
            )} ${parseInt(aRgbHex[2], 16)} / ${opacity})`
        }
      } else {
        tempColors[key] = helpers.toRGB(value)
      }
    }
    return tempColors
  },
}

const install = (app: any) => {
  app.config.globalProperties.$h = helpers
};

export { install as default, helpers as helper }
