class PagesController < ApplicationController
  def home
    @user = current_user
    if current_user
      render 'dashboard'
    else
      render 'home'
    end
  end

  def dashboard
    @user = current_user
  end
end
