Rails.application.routes.draw do
  devise_for :users,
    controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  get '/service-worker.js' => "service_worker#service_worker"
  get '/manifest.json' => "service_worker#manifest"
  root 'pages#home'
  resources :trips
  get '/dashboard', to: "pages#dashboard", as: :dashboard
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
