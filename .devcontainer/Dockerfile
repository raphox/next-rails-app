# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=3.3.7
FROM docker.io/library/ruby:$RUBY_VERSION

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        mariadb-client libmariadb-dev \
        postgresql-client postgresql-contrib libpq-dev \
        ffmpeg mupdf mupdf-tools libvips-dev poppler-utils \
        libxml2-dev sqlite3 imagemagick

# Download and install nvm, node and npm:
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install 18