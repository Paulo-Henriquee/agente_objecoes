# agente_objecoes/backend/Dockerfile
FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 1010

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "1010"]
