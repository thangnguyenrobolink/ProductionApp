# ProductionApp

# Kill WSL 
# wsl --unregister Ubuntu-22.04

# Run dos2unix (tool used to convert .sh file before running)
sudo apt update
sudo apt install dos2unix

# Move to resource folder
cd /mnt/f/total/Winner\'/Project/ProductionApp/

# Run update date status (Apply for WSL)
dos2unix update_date_status.sh
./update_date_status.sh

# Run to build Nginx-FE-BE-DB 
dos2unix setup_docker_django.sh
./setup_docker_django.sh

# Run BE migrations
docker exec -it productionapp-web-1 python manage.py migrate
docker exec -it productionapp-web-1 python manage.py createsuperuser

# Run dependencyTrack service
cd DependencyTrack
docker-compose up -d

# Run SonarQube service
cd ../SonarQube
docker-compose up -d