
# How to set sample data using MongoDB:

Run the following scripts:

-> curl  https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive

-> mongorestore --archive=sampledata.archive --port=<port-number>

