require 'faker'

# [x] Create 5 years.
# [x] Create all months for all years
# [x] Create all weeks for all months
# [x] Create all days for all weeks
# [x] Create 3 trackers for each month
# [x] Create 1 line for each tracker
# [x] Create appropriate number of day cells for each line
# [x] Create Holiday Events
# [x] Create starter tracker palettes
# [x] Journal seeds, just for example
# [x] List seeds, just for example
  
# ONLY seeded Holiday Events
# NO seeded Goals

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

palettes = [
    {
        name: "Classic Pastel",
        color_1: "#FBF6C7",
        color_2: "#FBE1CF",
        color_3: "#F2CFF5",
        color_4: "#CCC0F2",
        color_5: "#A0DCF5",
        color_6: "#A4EDCD",
        color_7: "#C1F2C7"
    },
    {
        name: "Moonlight",
        color_1: "#0F0B23",
        color_2: "#000C33",
        color_3: "#002C48",
        color_4: "#4546B5",
        color_5: "#E5DCFB",
        color_6: "#EFEEEA",
        color_7: "#FEFFF2"
    },
    {
        name: "Sunset",
        color_1: "#8C5755",
        color_2: "#B26662",
        color_3: "#F28262",
        color_4: "#FFA253",
        color_5: "#FEC66D",
        color_6: "#FFE284",
        color_7: "#FFEFA9"
    }
]

palettes.each do |p|
    TrackerPalette.create(p)
end

Day.find(60).build_journal(content: "Andromeda's a big wide open galaxy. Nothing in it for me, except a heart, that's lazy. Running from my own life now, I'm really turning some time, looking up to the sky for something I may never find.\n\nStop calling. It's time to let me be. If you think you can save me I dare you try.\n\nLift the heart from the depths it's fallen to. We all want something new, but can't seem to follow through. Something's better than nothing, or so that I thought. Now I know it's just one dream, all these other's gonna tear me apart.\n\nLove is calling. It's time to let it through. Find a love that will make you, I dare you to try.\n\nCrazy guy, think this is deep, think it's meant to be. More than anything I can think of, I'm ready to try.\n\nTreat my right, I'm still a good man's daughter. Let me in if I break and be quiet if I shatter. Gettin tired of looking, you know that I hate the game, don't wanna waste any more time, you know I've been holding out\n\nLove is calling. It's time to give to you, something you can hold onto. I dare you to try.").save

Day.find(62).build_journal(content: "John met me down on the boulevard. Cry on his shoulder cause life is hard. The waves came in over my head. What you been up to my baby? Haven't seen you round here lately. All of the guys tell me lies but you don't, you just crack another beer and pretend that you're still here.\n\nThis is how to disappear. This is how to disappear.\n\nJoe met me down at the training yard. Cuts on his face cause he fought to hard. I know he's in over his head. But I love that man, like nobody can. He moves mountains and pounds them to ground again. I watch the guys getting high as they fight for the things that they hold dear, to forget the things they fear.\n\nThis is how to disappear. This is how to disappear.\n\nNow it's been years since I left New York. I've got a kid and two cats in the yard. The California sun and the movie stars. I watch the skies getting light as I write as I think about those years, as I whisper in your ear... I'm always gon' to be right here. No one's goin anywhere.").save

Day.find(63).build_journal(content: "I miss long beach and I miss you babe. I miss dancin with you the most of all. I miss the bar where the beach boys would go - Dennis' last stop before Kokomo. Those nights were on fire, we couldn't get higher, we didn't know that we had it all, but nobody warns you before the fall.\n\nAnd I'm wasted. Don't leave I just need a wake up call. I'm facing the greatest - the greatest loss of them all. The culture is lit and I had a ball. I guess I'm signing off afterall.\n\nI miss New York and I miss the music. Me and my friends we miss rock and roll. I want you to feel just like you used to, when baby I was doing nothin the most of all.\n\nThe culture is lit and if this is it, I had a ball. I guess that I'm burned out afterall. I'm wasted. Don't leave I just need a wakeup call. I'm facing the greatest - the greatest loss of them all. The culture is lit and I had a ball. I guess that I'm burned out afterall. If this is it I'm signing off. Miss doing nothing the most of all.\n\nOh I just missed a fire ball.\n\nLA's in flames it's getting hot.\n\nKanye West is blonde and gone.\n\nLife on Mars ain't just a song.\n\nOh the life streams almost gone.").save

Day.find(65).build_journal(content: "What is it you think I need? Maybe it's too hard to see... I don't want it all. I've had enough. I don't want it all. I've had a love. Worst feeling I ever had is gone. It's gone. I know how it all comes back I know too well, now I'm done. I'm leaving once again, makin my own plans. I'm not looking for the answer. Or anything like that. I just wanna see some beauty. Try and understand. If we got to know each other, how rare is that? All that space in between, where we stand could be our chance. Could be our chance.\n\nI'm walking through the scene. I'm sayin all the lines. I wish I could unsee some things that gave me life. I wish I could unknow some things that told me so. I wish I could believe all that's been promised me.\n\nIt's hard to say forever love. Forever's just so far. It's hard to say forever love. Forever's just so far. It's hard to say forever love. Forever's just so far. Why don't you say you're with me now, with all of your heart. With all of your heart. With all of your heart.").save

Day.find(68).build_journal(content: "It's a godawful small affair, to the girl with the mousey hair. But her mummy is yelling no, and her daddy has told her to go. But her friend is nowhere to be seen, now she walks through her sunken dream to the seat with the clearest view and she's hooked to the silver screen, but the film is a saddening bore cause she's lived it 10 times or more. She could spit in the eyes of fools, as they ask her to focus on sailors fighting in the dance hall oh man, look at those cave men go. It's the freakiest show. Take a look at the law man beating up the wrong guy, oh man wonder if he'll ever know he's in the best selling show. Is there life on Mars?\n\nIts on America's tortured brow that Mickey Mouse has grown up a cow. Now the workers have struck for fame cause Lennon's on sale again. See the mice in their million hourdes, from Ibetha to the Norfolk Broads. Royal Brittania is out of bounds to my mother my dog and clowns. But the film is a saddening bore cause I wrote it 10 times or more. It's about to be writ again as I ask you to focus on sailors fighting in the dance hall, oh man, look at those cave men go, It's the freakiest show. Take a look at the law man beating up the wrong guy, oh man wonder if he'll ever know he's in the best selling show. Is there life on Mars?").save

Day.find(69).build_journal(content: "Is this the real life, is this just fantasy? Caught in a landslide no escape from reality. Open your eyes, look up to the skies and see. I'm just a poor boy, I need no sympathy. Because I'm easy come, easy go, little high, little low. Any way the wind blows doesn't really matter to me... to me.\n\nMama, just killed a man. Put a gun against his head, pulled my trigger now he's dead. Mama life had just begun. But now I've gone and thrown it all away. Mama, ooooo. Didn't mean to make you cry, if I'm not back again this time tomorrow carry on, carry on, because nothing really matters. Too late, my time has come. Sent shivers down my spine, body's aching all the time. Goodbye everybody, I've got to go. Got to leave you all behind and face the truth. Mama, ooooooo. I don't wanna die, I sometimes wish I'd never been born at all.").save

nums = *(3..15)

l1 = List.create(name: "Artists")
nums.sample.times { l1.list_items.build(name: Faker::Artist.name) }
l1.save

l2 = List.create(name: "Coffee Varieties")
nums.sample.times { l2.list_items.build(name: Faker::Coffee.variety) }
l2.save

l3 = List.create(name: "Ancient Heroes")
nums.sample.times { l3.list_items.build(name: Faker::Ancient.hero) }
l3.save

l4 = List.create(name: "Middle-earth")
nums.sample.times { l4.list_items.build(name: Faker::Movies::LordOfTheRings.location) }
l4.save

l5 = List.create(name: "Cat Breeds", checklist: true)
nums.sample.times { l5.list_items.build(name: Faker::Creature::Cat.breed) }
l5.save

l6 = List.create(name: "Groceries", checklist: true)
nums.sample.times { l6.list_items.build(name: Faker::Food.ingredient) }
l6.save

l7 = List.create(name: "Elder Scrolls Creatures")
nums.sample.times { l7.list_items.build(name: Faker::Games::ElderScrolls.creature) }
l7.save

l8 = List.create(name: "Pokemon", checklist: true)
nums.sample.times { l8.list_items.build(name: Faker::Games::Pokemon.name) }
l8.save

l9 = List.create(name: "Princess Bride Quotes")
nums.sample.times { l9.list_items.build(name: Faker::Movies::PrincessBride.quote) }
l9.save

l10 = List.create(name: "Twin Peaks Characters")
nums.sample.times { l10.list_items.build(name: Faker::TvShows::TwinPeaks.character) }
l10.save

l11 = List.create(name: "Quotes from the Hitchhiker's Guide to the Galaxy")
nums.sample.times { l11.list_items.build(name: Faker::Movies::HitchhikersGuideToTheGalaxy.quote) }
l11.save

l12 = List.create(name: "Spells of the Potterverse")
nums.sample.times { l12.list_items.build(name: Faker::Movies::HarryPotter.spell) }
l12.save