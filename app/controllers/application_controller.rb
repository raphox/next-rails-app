class ApplicationController < ActionController::API
  include ActionController::Helpers
  include ActionController::Cookies
  include Authentication

  allow_unauthenticated_access
end
