# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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

# Create 5 years.
# Create all months for all years
# Create all weeks for all months
# Create all days for all weeks
# Create 3 trackers for each month
# Create 1 line for each tracker
# Create appropriate number of day cells for each line

# NO seeded Events
# NO seeded Goals
# NO seeded Lists
# NO seeded Journals


year = Year.create([
    { year: 2020, leap: true, startDay: 3 },
    { year: 2021, leap: false, startDay: 5 },
    { year: 2022, leap: false, startDay: 6 },
    { year: 2023, leap: false, startDay: 0 },
    { year: 2024, leap: true, startDay: 1 },
])

year.each do |y|
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
end
