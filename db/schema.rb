# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_19_193735) do

  create_table "days", force: :cascade do |t|
    t.integer "week_id", null: false
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["week_id"], name: "index_days_on_week_id"
  end

  create_table "events", force: :cascade do |t|
    t.integer "day_id", null: false
    t.string "kind"
    t.string "subkind"
    t.time "start"
    t.time "end"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.index ["day_id"], name: "index_events_on_day_id"
  end

  create_table "goals", force: :cascade do |t|
    t.string "goalable_type"
    t.integer "goalable_id"
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["goalable_type", "goalable_id"], name: "index_goals_on_goalable_type_and_goalable_id"
  end

  create_table "journals", force: :cascade do |t|
    t.integer "day_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_id"], name: "index_journals_on_day_id"
  end

  create_table "list_items", force: :cascade do |t|
    t.integer "list_id", null: false
    t.string "name"
    t.boolean "completed", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["list_id"], name: "index_list_items_on_list_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "name"
    t.boolean "checklist", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "months", force: :cascade do |t|
    t.integer "year_id", null: false
    t.string "name"
    t.integer "number"
    t.integer "numDays"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["year_id"], name: "index_months_on_year_id"
  end

  create_table "tracker_days", force: :cascade do |t|
    t.integer "tracker_line_id", null: false
    t.integer "day_id", null: false
    t.boolean "complete", default: false
    t.string "color"
    t.integer "duration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_id"], name: "index_tracker_days_on_day_id"
    t.index ["tracker_line_id"], name: "index_tracker_days_on_tracker_line_id"
  end

  create_table "tracker_lines", force: :cascade do |t|
    t.integer "tracker_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tracker_id"], name: "index_tracker_lines_on_tracker_id"
  end

  create_table "trackers", force: :cascade do |t|
    t.integer "month_id", null: false
    t.string "kind"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["month_id"], name: "index_trackers_on_month_id"
  end

  create_table "weeks", force: :cascade do |t|
    t.integer "month_id", null: false
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["month_id"], name: "index_weeks_on_month_id"
  end

  create_table "years", force: :cascade do |t|
    t.integer "year"
    t.boolean "leap", default: false
    t.integer "startDay"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "days", "weeks"
  add_foreign_key "events", "days"
  add_foreign_key "journals", "days"
  add_foreign_key "list_items", "lists"
  add_foreign_key "months", "years"
  add_foreign_key "tracker_days", "days"
  add_foreign_key "tracker_days", "tracker_lines"
  add_foreign_key "tracker_lines", "trackers"
  add_foreign_key "trackers", "months"
  add_foreign_key "weeks", "months"
end
