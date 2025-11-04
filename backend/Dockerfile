FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Dependencias nativas mínimas (psycopg2/asyncpg)
RUN apt-get update \
 && apt-get install -y --no-install-recommends build-essential libpq-dev gcc \
 && rm -rf /var/lib/apt/lists/*

# Instala deps Python con cacheo
COPY backend/requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip \
 && pip install --no-cache-dir -r /app/requirements.txt

# Copia SOLO el código necesario del backend
COPY backend/ /app/backend
COPY main.py /app/main.py

# Asegura carpeta de uploads
RUN mkdir -p /app/uploads

EXPOSE 9000

# Uvicorn en 9000, sin --reload en prod
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]
