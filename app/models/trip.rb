class Trip < ApplicationRecord
  belongs_to :user
  has_many :activities
  validates :title, :country, presence: true
  before_save :set_background_image
  geocoded_by :country_name
  after_validation :geocode, if: :will_save_change_to_country?

  def formatted_start_date
    start_date.strftime("%A, %b %d")
  end
  
  def formatted_end_date
    end_date.strftime("%A, %b %d")
  end

  def country_name
    ISO3166::Country[self.country].name
  end

  def set_background_image
    country = ISO3166::Country[self.country].name
    self.picture = Unsplash::Photo.search(country, page = 1, per_page = 10, 'landscape').sample.urls.small.split("&utm_source")[0]
  end


end
