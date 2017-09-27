module Dilutable
  extend ActiveSupport::Concern

  included do
    before_create :generate_token
  end

  protected

  def generate_token
    self.dilute = loop do
      random_token = SecureRandom.urlsafe_base64(3, false)
      break random_token unless self.class.exists?(dilute: random_token)
    end
    self.source = "#{Rails.application.secrets.base_url}#{self.dilute}"
  end
end