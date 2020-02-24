class Activity < ApplicationRecord
  belongs_to :trip
  validates :title, :notes, :automatic_picture, :latitude, :longitude, :location, :category, presence: true
end
