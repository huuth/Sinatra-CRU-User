require 'rubygems'
require 'sinatra'


class WebApp < Sinatra::Base

	def initialize
		super()
		@data = []
	end

	
	enable :sessions

	before do 
		session[:err_new] = ""
	end

	get '/' do
	  @data
	  haml :index
	end

	get '/new' do
	  haml :new_user	
	end

	post '/new' do
		# File.open('uploads/' + @params['avatar'][:filename], "w") do |f|
	 #    f.write(@params['avatar'][:tempfile].read)
	 #  end

	 	@data.each do |user| 
		 	if user[:email] == @params[:email]
		 		session[:err_new] = 'Email is exists!'
		 		redirect to('/new')
		 	end
	 	end
	 	session[:err_new] = ""
	 	@data.push @params
		
		@filename = params[:avatar][:filename]
		file =	 params[:avatar][:tempfile]
		File.open("./public/uploads/#{@filename}", 'wb') do |f|
	    f.write(file.read)
		end
	  
	  redirect to('/show')
	end

	get '/show' do
		@data
		haml :show_user
	end

	get '/update' do
		@user_id = @params[:id]
		@user = @data[@params[:id].to_i]
		haml :update
	end

	post '/update' do
		id = @params[:id].to_i
		user = @data[id]

		user["first_name"] = @params[:first_name]
		user["last_name"] = @params[:last_name]
		user["email"] = @params[:email]
		user["password"] = @params[:password]
		user["about_me"] = @params[:about_me]

		@data[id] = user
		redirect to('/show')
	end

	post '/upload_image' do
		@filename = params[:file][:filename]
		file = params[:file][:tempfile]
		File.open("./public/uploads/#{@filename}", 'wb') do |f|
	    f.write(file.read)

		puts params[:id].to_s
		@data[params[:id].to_i][:avatar] = @params[:file]
		end
	end

	get '/delete' do
		@data.delete_at(@params[:id].to_i)
		"done"
	end
end

WebApp.run!