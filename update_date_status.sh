# Check the current date and time
date

# Update package list and install ntpdate
sudo apt update
sudo apt install ntpdate

# Synchronize system time with network time servers
sudo ntpdate ntp.ubuntu.com

# Enable automatic time synchronization
sudo timedatectl set-ntp on

# Verify time synchronization status
timedatectl status