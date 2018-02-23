import Component from '@glimmer/component';

export default class PhotoCollection extends Component {
  get today(): Date {
    return new Date()
  }

  get currentDayNumber() {
    let d = this.today,
        currentDate = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()),
        beginningOfYear = Date.UTC(d.getFullYear(), 0, 0)
    return (currentDate - beginningOfYear) / 24 / 60 / 60 / 1000
  }

  get dates(): Array<Date> {
    let d = this.today
    let dates = []
    let numDays = this.currentDayNumber
    let i = 1

    while (i <= numDays) {
      dates.push(new Date(d.getFullYear(), 0, i++))
    }
    return dates.reverse()
  }
}
