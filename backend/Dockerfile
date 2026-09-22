FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Dependencies install
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Source code copy
COPY . /app/

# Static files collect kora (Production-er jonno)
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Gunicorn wsgi server die run kora
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]