class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :set_current_ip

  @user = User.new

  def current_user
     if session[:user_id]
       @current_user ||= User.find(session[:user_id])
     else
       false
     end
   end


  protected
  def set_current_ip
    @user = User.where(current_ip: request.remote_ip).first_or_create
    @user = User.find_or_initialize_by({current_ip: request.remote_ip})
    user = User.find_by({current_ip: request.remote_ip})
    session[:user_id] = user.id
  end

end
