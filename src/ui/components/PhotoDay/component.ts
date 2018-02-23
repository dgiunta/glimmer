import Component from '@glimmer/component';

const DAY_NAMES = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
const MONTH_NAMES = "January February March April May June July August September October November December".split(" ")

export default class PhotoDay extends Component {
  get currentDayNumber(): Number {
    let d = this.args.date,
        currentDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()),
        beginningOfYear = Date.UTC(d.getFullYear(), 0, 0)
    return (currentDate - beginningOfYear) / 24 / 60 / 60 / 1000
  }

  get formattedDate(): String {
    let date = this.args.date,
        dayName = DAY_NAMES[date.getDay()],
        monthName = MONTH_NAMES[date.getMonth()],
        day = date.getDate(),
        year = date.getFullYear()
    return `${dayName}, ${monthName} ${this.ordinalizedDayNum}, ${year}`
  }

  get ordinalizedDayNum(): String {
    let date = this.args.date.getDate().toString(),
        lastChar = date[date.length - 1],
        altOrd = {
          '1': 'st',
          '2': 'nd',
          '3': 'rd'
        }[lastChar] || 'th'

    let ord = (date < 10 || date > 19) ? altOrd : 'th'
    return `${date}${ord}`
  }
}
