# Aesthetic Planner

The Aesthetic Planner is meant to be a super customizable planner. At the moment, not all features have been implemented. Currently built out features include Lists & the Journal, as well as the calendar widget used for navigation.

## Installation

The Aesthetic Planner uses Foreman to manage its Procfile, and start up the server and application simultaneously, on ports 3000 and 3001. However, author of the Foreman gem suggests against adding it to the gemfile, so it needs to be installed separately from the root folder.
```bash
gem install foreman
```

The front end is located inside the client folder, so you will need to be in that directory to run npm install.
``` bash
cd client
npm install
```

Navigate back to the root folder and run bundle install and migrate + seed the database
```bash
cd ..
bundle install
rails db:migrate
rails db:seed
```

You can then start up the application and server with the following command:
```bash
foreman start -p 3000
```


## Usage

Once the server starts, the local host will start in your browser and redirect to the current day in the Day Planner. (This feature is not built out, and there won't be much there.) From there you can navigate to the list & journal pages to see fully functioning features.

Create Lists! - In the list page there will already be several lists there that were seeded. You can edit these existing lists, or ad your own. 

The Journal! - There will not be an entry for the current day, and when you nav to the Journal page, you will just see an input form so that you can create one. You can also use the calendar to navigate to other pages that have entries, or use the recent entry list.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)