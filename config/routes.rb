Rails.application.routes.draw do
  
  # :index, :show, :new, :create, :edit, :update, :destroy
  
  resources :years, only: [:index, :show] do
    resources :holidays, only: :index
  end

  resources :weeks, only: [:index, :show] do
    resources :holidays, only: :index
  end

  resources :months, only: [:index, :show] do
    resources :holidays, only: :index
  end

  resources :days, only: [:index, :show] do
    resources :holidays, only: :index
  end

  resources :users, only: [:index, :show, :create, :update, :destroy] do
    resources :events, except: [:new, :edit]
    resources :lists, except: [:new, :edit]
    resources :goals, except: [:new, :edit]
    resources :trackers, only: [:index, :show, :create, :update]
    resources :journal, only: [:index, :create, :destroy]
    resources :tracker_palettes, only: [:index, :update]

    # To get the user's trackers within a specific month.
    get 'monthTrackers/:month_id', to: 'months#monthTrackers'

  end

  resources :list_items, only: [:update]
  resources :tracker_lines, only: [:create, :update, :destroy]
  resources :tracker_days, only: [:update]
  resources :tracker_palettes, only: [:index]
  resources :journal_entries, only: [:create, :update, :destroy]

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  # NON-NAMESPACED ROUTES - OLD

  # resources :holidays
  # resources :journal_entries
  # resources :users
  # resources :years, only: [:index, :show]
  # resources :months, only: [:index, :show]
    # get 'monthTrackers/:id', to: 'months#monthTrackers'
  # resources :weeks, only: [:index, :show]
  # resources :days, only: [:index, :show]
  
  # resources :events, except: [:new, :edit]
  # resources :goals, except: [:new, :edit]
  
  # resources :lists, except: [:new, :edit]
  # resources :trackers, only: [:index, :show, :create, :update] # Create & Update not used until users are created.
  # resources :journals, except: [:new, :edit]

  # resources :list_items, only: [:update]
  # resources :tracker_lines, only: [:create, :update, :destroy]
  # resources :tracker_days, only: [:update]
  # resources :tracker_palettes, only: [:index]


end
