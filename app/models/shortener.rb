class Shortener < ApplicationRecord
  include Dilutable

  validates_presence_of :target

  before_create :generate_token, :default_hit

  scope :shorten,-> (rec, skp){order(hits: :desc, id: :asc).limit(rec).offset(skp)}

  def make_it_count
    self.hits += 1
    self.save
  end

  private
    def default_hit
      self.hits = 0
    end

    def validate_target
      if !self.target.match(/^(http[s]?:\/\/)/)
        self.target = "http://#{self.target}"
      end
    end
end