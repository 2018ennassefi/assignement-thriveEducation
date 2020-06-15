FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y python3-pip python3.5
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
COPY requirements.txt requirements.txt
RUN pip3 install flask_sqlalchemy
RUN pip3 install -r requirements.txt
COPY . .
CMD ["flask", "run"]