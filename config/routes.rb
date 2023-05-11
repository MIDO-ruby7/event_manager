Rails.application.routes.draw do
  root to: 'site#index'

  namespace :api, format: 'json' do
    namespace :v1 do
      resources :events, only: %i[index show create destroy update]
    end
  end
end