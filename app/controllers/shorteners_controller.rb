class ShortenersController < ApplicationController

  before_action :find_shortener, only: [:destroy]

  def index
    @shorteners = Shortener.shorten(params[:pageSize], params[:pageSkip])
    respond_to do |format|
      format.html
      format.json {render json: @shorteners }
    end
  end

  def create
    @shortener = Shortener.where(target: shortener_params[:target]).first_or_initialize
    respond_to do |format|
      if @shortener.save
        format.json { render json: @shortener , status: :ok}
      else
        format.json { render json: @shortener.errors, status: :unprocessable_entity }
      end
    end
  end

  def deflect
    if params[:dilute]
      @shortner = Shortener.find_by(dilute: params[:dilute])
      if(redirect_to @shortner.target)
        @shortner.make_it_count
      end
    end
  end

  def find
    shorteners = Shortener.where("target ilike :target", target: "%#{params[:target]}%")
    respond_to do |format|
      format.json {render  json: shorteners}
    end
  end

  def destroy
    @shortener.destroy
    respond_to do |format|
      format.json {render  json: '', status: :ok}
    end
  end

  private
    def shortener_params
      params.require(:shortener).permit(:target)
    end

    def find_shortener
      @shortener = Shortener.find(params[:id])
    end
end
