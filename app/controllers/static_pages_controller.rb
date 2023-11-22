class StaticPagesController < ApplicationController
  def index
    reference = params.slice(:id, :slug)
    reference_key = "[#{reference.keys.first}]"

    path = [params[:resource], reference_key, params[:others]].compact.join('/')
    file_path = File.join(Rails.root, 'public', path, 'index.html')

    if File.exist?(file_path)
      send_file file_path, type: 'text/html', disposition: 'inline'
    else
      render status: 404
    end
  end
end
