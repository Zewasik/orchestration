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

    inventory_vm.vm.hostname = "inventory-vm"
    inventory_vm.vm.network "private_network", type: "static", ip: "192.168.56.10"

    inventory_vm.vm.provision "file", source: ".env", destination: "/home/vagrant/.env"
    inventory_vm.vm.provision "shell", path: "scripts/initialize-inventory-db.sh"
    
    inventory_vm.vm.provision "shell", path: "scripts/install-node.sh"
    
    inventory_vm.vm.provision "file", source: "srcs/inventory-app", destination: "/home/vagrant/"
    inventory_vm.vm.provision "shell", inline: <<-SHELL
    #!/bin/bash
      cd inventory-app
      cp /home/vagrant/.env .
      npm install
      nohup npm start > /dev/null 2>&1 &
    SHELL

    inventory_vm.vm.synced_folder ".", "/vagrant", disabled: true
  end

  config.vm.define "billing_vm" do |billing_vm|
    billing_vm.vm.box = "generic/ubuntu2204"

    billing_vm.vm.hostname = "billing-vm"
    billing_vm.vm.network "private_network", type: "static", ip: "192.168.56.20"

    billing_vm.vm.provision "file", source: ".env", destination: "/home/vagrant/.env"
    billing_vm.vm.provision "shell", path: "scripts/initialize-billing-db.sh"
    
    billing_vm.vm.provision "shell", path: "scripts/install-node.sh"
    
    billing_vm.vm.provision "file", source: "srcs/billing-app", destination: "/home/vagrant/"

    billing_vm.vm.provision "docker" do |d|
      d.post_install_provision "shell", path: "scripts/start-rabbitmq.sh"
    end

    billing_vm.vm.provision "shell", inline: <<-SHELL
    #!/bin/bash
      cd billing-app
      cp /home/vagrant/.env .
      npm install
      nohup npm start > /dev/null 2>&1 &
    SHELL

    billing_vm.vm.synced_folder ".", "/vagrant", disabled: true
  end

  config.vm.define "gateway_vm" do |gateway_vm|
    gateway_vm.vm.box = "generic/ubuntu2204"

    gateway_vm.vm.provision "shell", inline: <<-SHELL
      echo "192.168.56.10   inventory-vm" | sudo tee -a /etc/hosts
      echo "192.168.56.20   billing-vm" | sudo tee -a /etc/hosts
    SHELL

    gateway_vm.vm.provision "file", source: ".env", destination: "/home/vagrant/.env"
    gateway_vm.vm.provision "shell", path: "scripts/install-node.sh"
    
    gateway_vm.vm.provision "file", source: "srcs/api-gateway", destination: "/home/vagrant/"
    gateway_vm.vm.provision "file", source: "srcs/inventory-app/app/routes", destination: "/home/vagrant/inventory-app/app/routes"

    gateway_vm.vm.provision "shell", inline: <<-SHELL
    #!/bin/bash
      cd api-gateway
      cp /home/vagrant/.env .
      npm install
      nohup npm start > /dev/null 2>&1 &
    SHELL

    gateway_vm.vm.synced_folder ".", "/vagrant", disabled: true
    gateway_vm.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
  end
end
