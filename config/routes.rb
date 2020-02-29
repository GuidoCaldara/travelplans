Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :trips

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :trips do
        resources :activities, only: [:create, :index]
      end
        resources :activities, only: [:update]
      get 'is_logged_in', to: 'sessions#is_logged_in'
      resources :activities, only: [:show, :destroy]
    end
  end

end
