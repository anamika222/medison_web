FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# mysqlclient ও C compiler dependencies ইনস্টল
RUN apt-get update && apt-get install -y \
    gcc \
    pkg-config \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Dependencies install
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Source code copy
COPY . /app/

# Static files collect
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Gunicorn wsgi server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]