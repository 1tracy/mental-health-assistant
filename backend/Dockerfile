FROM python:3.8-slim-buster

RUN mkdir /backend
COPY requirements.txt /backend
WORKDIR /backend
RUN pip3 install -r requirements.txt

COPY . .

RUN chmod u+x entrypoint.sh
ENTRYPOINT ["sh", "entrypoint.sh"]
