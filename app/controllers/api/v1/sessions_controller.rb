class Api::V1::SessionsController < Api::V1::BaseController

  def is_logged_in
    @user = current_user || {email: nil, token: nil}
  end
end
