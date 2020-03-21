class TripsController < ApplicationController
  def index
  end

  def new
    @trip = Trip.new
    authorize @trip
    respond_to do |format|
      format.js
    end
  end

  def create
    @trip = Trip.new(trip_params)
    @trip.user = current_user
    authorize @trip
    @trip.save
    respond_to do |format|
      format.js
    end
  end

  def show
    @trip = Trip.find(params[:id])
    authorize @trip
  end

  def edit
  end

  def update
  end

private

  def trip_params
    params.require(:trip).permit(:title, :start_date, :end_date, :country, :description)
  end
end
