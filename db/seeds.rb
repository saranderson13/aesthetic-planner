# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
 
y = Year.create(year: 2020, leap: true, startDay: 3)
m = y.months.build(name: "February", number: 2, numDays: 29)
y.save
w = m.weeks.build(start_date: Date.new(2020, 2, 3), end_date: Date.new(2020, 2, 9))
m.save
d = w.days.build(date: Date.new(2020, 2, 3))
w.save
d.events.build(kind: "untimed", subkind: "task", name: "make seed data")
d.save

