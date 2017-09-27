require 'test_helper'

class ShortenerTest < ActiveSupport::TestCase
  test "should not save shortener without target" do
    shortener = Shortener.new
    assert_not shortener.save
  end

  test "should have dilute " do
    shortener = Shortener.create(target: 'www.google.co.in')
    assert shortener.dilute.present?
  end
end
