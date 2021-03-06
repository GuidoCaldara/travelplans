class Api::V1::ActivitiesController < ApplicationController
  acts_as_token_authentication_handler_for User
  skip_before_action :verify_authenticity_token


  def index
    @trip = Trip.find(params[:trip_id])
    @activities = @trip.activities
  end

  def create
    @trip = Trip.find(params[:trip_id])
    @user = current_user
    @activity = Activity.new(activity_params)
    # @activity.automatic_picture = "https://picsum.photos/200/300"
    @activity.trip = @trip
    authorize @activity
    if @activity.save
      render :show, status: :created
    else
      render_error
    end
  end

  def update
    @activity = Activity.find(params[:id])
    @activity.done = params[:activity][:done]
    authorize @activity
    if @activity.save
      render :update, status: :ok
    else
      render_error
    end
  end

  def destroy
    @activity = Activity.find(params[:id])
    authorize @activity
    @activity.destroy
    head :no_content
  end

  private


  def activity_params
    params.require(:activity).permit(:title, :notes, :automatic_picture, :latitude, :longitude, :location, :category)
  end

  def set_activity
    @activity = Activity.find(params[:id])
    authorize @activity  # For Pundit
  end

  def render_error
    render json: { errors: @activity.errors.full_messages },
      status: :unprocessable_entity
  end

end
