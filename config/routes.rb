SurveySite::Application.routes.draw do
 root to: 'welcome#index'

 resources :user
 resources :survey

 get '/sign_out', to: "user#sign_out", as: "sign_out"

 # get '/survey/:id', to: "survey#index", as: "something"

end
