# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  config.vm.define "inventory_vm" do |inventory_vm|
    inventory_vm.vm.box = "generic/ubuntu2204"

    inventory_vm.vm.provision "file", source: ".env", destination: "/home/vagrant/.env"
    inventory_vm.vm.provision "shell", path: "scripts/initialize-inventory-db.sh"
    
    inventory_vm.vm.provision "shell", inline: <<-SHELL
    #!/bin/bash
      sudo apt-get update
      sudo apt-get install -y ca-certificates curl gnupg
      sudo mkdir -p /etc/apt/keyrings
      curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

      NODE_MAJOR=18
      echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

      sudo apt-get update
      sudo apt-get install -y nodejs
    SHELL
    
    inventory_vm.vm.provision "file", source: "srcs/inventory-app", destination: "/home/vagrant/"
    inventory_vm.vm.provision "shell", inline: <<-SHELL
    #!/bin/bash
      cd inventory-app
      cp /home/vagrant/.env .
      npm install
      nohup npm start > /dev/null 2>&1 &
    SHELL

    inventory_vm.vm.synced_folder ".", "/vagrant", disabled: true
    inventory_vm.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"
  end

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Disable the default share of the current code directory. Doing this
  # provides improved isolation between the vagrant box and your host
  # by making sure your Vagrantfile isn't accessable to the vagrant box.
  # If you use this you may want to enable additional shared subfolders as
  # shown above.
  # config.vm.synced_folder ".", "/vagrant", disabled: true
end
