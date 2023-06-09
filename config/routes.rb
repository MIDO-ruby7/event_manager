Rails.application.routes.draw do
  root to: redirect('/events')

  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/edit', to: 'site#index'

  namespace :api, format: 'json' do
    namespace :v1 do
      resources :events, only: %i[index show create destroy update]
    end
  end
end