Rails.application.routes.draw do
  resources :months, only: [:index, :show]
  resources :years, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
