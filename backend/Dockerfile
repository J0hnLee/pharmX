FROM python:3.8
ADD . /code 
WORKDIR /code 
RUN pip install -U setuptools
RUN pip install -U --pre locustio
RUN pip install -r requirements.txt
RUN pip uninstall bson
CMD ["python", "app.py"]


