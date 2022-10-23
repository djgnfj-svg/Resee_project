FROM python:3.9.0

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN apt-get -y install vim

WORKDIR /usr/src/app
ADD . /usr/src/app

WORKDIR /usr/src/app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt