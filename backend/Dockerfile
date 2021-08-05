FROM python:3.8-slim-buster

RUN mkdir /mental_health_app
COPY requirements.txt /mental_health_app
WORKDIR /mental_health_app
RUN pip3 install -r requirements.txt

COPY . /mental_health_app

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
