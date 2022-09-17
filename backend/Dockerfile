FROM python:3.9.0

ENV PYTHONUNBUFFERED 1

RUN apt-get -y update
RUN api-get -y install vim

RUN mkdir /srv/docker-django
ADD . /srv/docker-django

WORKDIR /srv/docker-django

RUN pip install --upgrade pip
RUN pip insatll -r requirements.txt
