Rails.application.routes.draw do
  
  resources :users
  # :index, :show, :new, :create, :edit, :update, :destroy
  resources :years, only: [:index, :show]
  resources :months, only: [:index, :show]
    get 'monthTrackers/:id', to: 'months#monthTrackers'
  resources :weeks, only: [:index, :show]
  resources :days, only: [:index, :show]
  
  resources :events, except: [:new, :edit]
  resources :goals, except: [:new, :edit]
  
  resources :lists, except: [:new, :edit]
  resources :list_items, only: [:update]
  
  resources :trackers, only: [:index, :show, :create, :update] # Create & Update not used until users are created.
  resources :tracker_lines, only: [:create, :update, :destroy]
  resources :tracker_days, only: [:update]
  resources :tracker_palettes, only: [:index, :update]

  resources :journals, except: [:new, :edit]

end
