Rails.application.routes.draw do
  
  # :index, :show, :new, :create, :edit, :update, :destroy
  resources :years, only: [:index, :show]
  resources :months, only: [:index, :show]
  resources :weeks, only: [:index, :show]
  resources :days, only: [:index, :show]
  
  resources :events, except: [:new, :edit]
  resources :goals, except: [:new, :edit]

  resources :lists, except: [:new, :edit]
  resources :list_items, only: [:create, :update, :destroy]

  resources :trackers, only: [:index, :update]
  resources :tracker_lines, only: [:create, :update, :destroy]
  resources :tracker_days, only: [:update]

  resources :journals, except: [:new, :edit]

end
