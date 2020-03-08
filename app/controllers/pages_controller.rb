class PagesController < ApplicationController
  def home
    test = "Test"
  end

  def dashboard
    @user = current_user
  end
end
