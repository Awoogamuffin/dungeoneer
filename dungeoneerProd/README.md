# PRODUCTION STUFF

This folder holds the elements that are used on the aws ec2 instance. It contains:

## the production docker-compose file

This uses images built by the dungeoneerClient and dungeoneerServer projects (see their "upload.sh" files)

## An upload script (upload.sh)

Just sends said docker-compose file up to the server. This (and the following script) require the dungeoneer.pem certificate file to be present in the dungeoneerProd directory, but for obvious reasons it is not included the git repository. You should have both this certificate and the docker hub credentials in the email I sent you

## An access script (aws.sh)

Just ssh into the aws instance, using the dungeoneer.pem certificate again.

## Updating on the server

Right now, the server is a free-tier ubuntu ec2 instance on aws. Use the aws.sh to access it, and you'll see it has docker and docker-compose already installed.

To update, the quickest way is to run:

```
sudo docker-compose pull
sudo docker-compose stop
sudo docker-compose up -d
```

This pulls all of the services (so automatically updates dgraph too) but you can run those three commands specifically for dungeoneer-server or dungeoneer-client.