json.array! @activities do |restaurant|
  json.extract! restaurant, :id, :title, :notes, :automatic_picture, :latitude, :longitude, :location, :category
end
