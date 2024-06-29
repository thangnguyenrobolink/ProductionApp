#!/bin/bash

# Update system
sudo apt update

# Install essential packages
sudo apt install git curl wget build-essential -y

# Update system
sudo apt update

# Install packages to allow apt to use a repository over HTTPS:
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Set up the stable repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update system
sudo apt update

# Install Docker Engine
sudo apt install docker-ce docker-ce-cli containerd.io -y

# Update system
sudo apt update

# Remove existing Docker Compose installation, if any
sudo rm /usr/local/bin/docker-compose

# Download Docker Compose version 1.28.6
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions
sudo chmod +x /usr/local/bin/docker-compose

# Update system
sudo apt update

# Install Python pip
sudo apt install python3-pip -y

# Build Docker containers 
docker compose build

# Start Docker containers in detached mode
docker compose up -d

# Update system
sudo apt update

# Run Django migrations
# docker exec -it productionmanagebe-web-1 python manage.py migrate
# docker exec -it productionmanagebe-web-1 python manage.py createsuperuser
