class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.all

    # if you need to paginate the results and need to include other especific posts
    if params[:include_ids].present?
      others = Post.where(id: params[:include_ids])
      @posts = Post.from("(#{@posts.to_sql} UNION #{others.to_sql}) as posts")
    end

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.expect(post: [ :title, :body ])
    end
end
