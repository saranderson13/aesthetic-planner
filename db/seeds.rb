# [x] Create 5 years.
# [x] Create all months for all years
# [x] Create all weeks for all months
# [x] Create all days for all weeks
# [x] Create 3 trackers for each month
# [x] Create 1 line for each tracker
# [x] Create appropriate number of day cells for each line
# [x] Create Holiday Events
  
# ONLY seeded Holiday Events
# NO seeded Goals
# NO seeded Lists
# NO seeded Journals

Event.destroy_all
Goal.destroy_all
Tracker.destroy_all
List.destroy_all
Year.destroy_all


MONTHS = {
    1 => { name: "January", numDays: 31 },
    2 => { name: "February", numDays: "dependent" },
    3 => { name: "March", numDays: 31 },
    4 => { name: "April", numDays: 30 },
    5 => { name: "May", numDays: 31 }, 
    6 => { name: "June", numDays: 30 },
    7 => { name: "July", numDays: 31 },
    8 => { name: "August", numDays: 31 },
    9 => { name: "September", numDays: 30 },
    10 => { name: "October", numDays: 31 },
    11 => { name: "November", numDays: 30 },
    12 => { name: "December", numDays: 31 }
  }  
  

# CREATE YEARS
year = Year.create([
    { year: 2020, leap: true, startDay: 3 },
    # { year: 2021, leap: false, startDay: 5 },
    # { year: 2022, leap: false, startDay: 6 },
    # { year: 2023, leap: false, startDay: 0 },
    # { year: 2024, leap: true, startDay: 1 },
])


# CREATE MONTHS, WEEKS, & DAYS
year.each do |y|

    #  CREATE MONTHS & DAYS
    MONTHS.each do |num, info|
        if num != 2
            Month.create(year: y, name: info[:name], number: num, numDays: info[:numDays])
            n = 1
            while n <= info[:numDays]
                Day.create(year: y, date: Date.new(y.year, num, n))
                n += 1
            end

        elsif y.leap 
            Month.create(year: y, name: info[:name], number: num, numDays: 29)
            n = 1
            while n <= 29
                Day.create(year: y, date: Date.new(y.year, num, n))
                n += 1
            end
        else
            Month.create(year: y, name: info[:name], number: num, numDays: 28)
            n = 1
            while n <= 28
                Day.create(year: y, date: Date.new(y.year, num, n))
                n += 1
            end
        end
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


# CREATE TRACKERS & ASSOCIATED RESOURCES
months = Month.all
months.each do |mo|
    h = Tracker.create(month_id: mo.id, kind: "habit")
    htl = TrackerLine.create(tracker: h, name: "Example Line")

    m = Tracker.create(month_id: mo.id, kind: "mood")
    mtl = TrackerLine.create(tracker: m, name: "mood line")

    s = Tracker.create(month_id: mo.id, kind: "sleep")
    stl = TrackerLine.create(tracker: s, name: "sleep line")

    days = mo.days()
    days.each do |d|
        TrackerDay.create(tracker_line: htl, day: d)
        TrackerDay.create(tracker_line: mtl, day: d)
        TrackerDay.create(tracker_line: stl, day: d)
    end
end


HOLIDAYS_2020 = {
    Date.new(2020, 1, 1) => "New Years Day",
    Date.new(2020, 1, 20) => "Martin Luther King Jr. Day",
    Date.new(2020, 1, 25) => "Chinese New Year",
    Date.new(2020, 2, 2) => "Groundhog Day",
    Date.new(2020, 2, 3) => "Super Bowl Sunday",
    Date.new(2020, 2, 14) => "Valentine's Day",
    Date.new(2020, 2, 17) => "President's Day",
    Date.new(2020, 2, 25) => "Mardi Gras",
    Date.new(2020, 2, 26) => "Ash Wednesday",
    Date.new(2020, 3, 8) => "Daylight Savings Begins",
    Date.new(2020, 3, 17) => "St. Patrick's Day",
    Date.new(2020, 4, 12) => "Easter Sunday",
    Date.new(2020, 4, 13) => "Easter Monday",
    Date.new(2020, 4, 15) => "Tax Day",
    Date.new(2020, 5, 5) => "Cinco de Mayo",
    Date.new(2020, 5, 10) => "Mother's Day",
    Date.new(2020, 5, 25) => "Memorial Day",
    Date.new(2020, 6, 21) => "Father's Day",
    Date.new(2020, 7, 4) => "Independence Day",
    Date.new(2020, 9, 7) => "Labor Day",
    Date.new(2020, 9, 19) => "Rosh Hashana",
    Date.new(2020, 9, 28) => "Yom Kippur",
    Date.new(2020, 10, 31) => "Halloween",
    Date.new(2020, 11, 3) => "Election Day",
    Date.new(2020, 11, 11) => "Veterans Day",
    Date.new(2020, 11, 26) => "Thanksgiving",
    Date.new(2020, 12, 11) => "First Day of Hanukkah",
    Date.new(2020, 12, 24) => "Christmas Eve",
    Date.new(2020, 12, 25) => "Christmas",
    Date.new(2020, 12, 26) => "First Day of Kwanzaa",
    Date.new(2020, 12, 31) => "New Years Eve"
}

Day.all.each do |d|
    holidates = HOLIDAYS_2020.keys
    if holidates.include?(d.date)
        Event.create(day: d, kind: "untimed", subkind: "holiday", name: HOLIDAYS_2020[d.date])
    end
end