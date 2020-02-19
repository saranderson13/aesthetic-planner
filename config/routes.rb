Rails.application.routes.draw do
  resources :journals
  resources :list_items
  resources :lists
  resources :tracker_days
  resources :tracker_lines
  resources :trackers
  resources :goals
  resources :events, only: [:index, :show]
  resources :days, only: [:index, :show]
  resources :weeks, only: [:index, :show]
  resources :months, only: [:index, :show]
  resources :years, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
