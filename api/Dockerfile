FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install openai pydantic python-dotenv uvicorn
COPY . .
EXPOSE 8000
CMD ["python", "server.py"]
