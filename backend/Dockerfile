# backend/Dockerfile
FROM python:3.11

WORKDIR /app
COPY backend/ /app
RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]