Rails.application.routes.draw do

  root "shorteners#index"

  resources :shorteners, only: [:index, :create, :destroy] do
    collection do
      get :find
    end
  end

  resources :index, only: [:index] do
    collection do
      get :pages
    end
  end

  get "/:dilute", to: "shorteners#deflect"
end
