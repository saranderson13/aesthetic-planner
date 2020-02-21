# [x] Create 5 years.
# [x] Create all months for all years
# [x] Create all weeks for all months
# [x] Create all days for all weeks
# [x] Create 3 trackers for each month
# [x] Create 1 line for each tracker
# [ ] Create appropriate number of day cells for each line
  
# NO seeded Events
# NO seeded Goals
# NO seeded Lists
# NO seeded Journals

Event.destroy_all
Goal.destroy_all
Tracker.destroy_all
List.destroy_all
Year.destroy_all

MONTHS = {
    1 => {
        name: "January",
        numDays: 31
      },
    2 => {
        name: "February",
        numDays: "dependent"
      },
    3 => {
        name: "March",
        numDays: 31
      },
    4 => {
        name: "April",
        numDays: 30
      },
    5 => {
        name: "May",
        numDays: 31
      }, 
    6 => {
        name: "June",
        numDays: 30
      },
    7 => {
        name: "July",
        numDays: 31
      },
    8 => {
        name: "August",
        numDays: 31
      },
    9 => {
        name: "September",
        numDays: 30
      },
    10 => {
        name: "October",
        numDays: 31
      },
    11 => {
        name: "November",
        numDays: 30
      },
    12 => {
        name: "December",
        numDays: 31
      }
  }  
  


# CREATE YEARS
year = Year.create([
    { year: 2020, leap: true, startDay: 3 },
    { year: 2021, leap: false, startDay: 5 },
    { year: 2022, leap: false, startDay: 6 },
    { year: 2023, leap: false, startDay: 0 },
    { year: 2024, leap: true, startDay: 1 },
])

# CREATE MONTHS & WEEKS
year.each do |y|

    #  CREATE MONTHS
    MONTHS.each do |num, info|
        if num != 2
            y.months.build(name: info[:name], number: num, numDays: info[:numDays])
        elsif y.leap == true
            y.months.build(name: info[:name], number: num, numDays: 29)
        else
            y.months.build(name: info[:name], number: num, numDays: 28)
        end
        y.save
    end

    # CREATE WEEKS
    n = 0
    first_of_year = Date.new(y.year, 1, 1)
    while n < 53 
        masterMonday = y.startDay != 1 ? first_of_year - (y.startDay - 1) : first_of_year
        monday = n == 0 ? masterMonday : masterMonday + (n * 7)
        Week.create(year_id: y.id, start_date: monday, end_date: monday + 6)
        n += 1
    end

end

# CREATE DAYS
weeks = Week.all
weeks.each do |w|

    n = w.start_date
    while n <= w.end_date
        Day.create(week: w, date: n)
        n += 1
    end

end

# CREATE TRACKERS & ASSOCIATED RESOURCES
months = Month.all
months.each do |mo|
    h = Tracker.create(month_id: mo.id, kind: "habit")
    htl = TrackerLine.create(tracker: h, name: "Example Line")

    m = Tracker.create(month_id: mo.id, kind: "mood")
    mtl = TrackerLine.create(tracker: m, name: "mood line")

    s = Tracker.create(month_id: mo.id, kind: "sleep")
    stl = TrackerLine.create(tracker: s, name: "sleep line")

    days = mo.get_days()
    days.each do |d|
        TrackerDay.create(tracker_line: htl, day: d)
        TrackerDay.create(tracker_line: mtl, day: d)
        TrackerDay.create(tracker_line: stl, day: d)
    end
end