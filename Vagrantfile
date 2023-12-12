# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "generic/alpine318"
  config.vm.synced_folder "./k3s", "/vagrant"

  config.vm.define "master", primary: true do |master|
    master.vm.network "private_network", ip: "192.168.56.10"
    master.vm.provider "virtualbox" do |v|
      v.memory = 2048
      v.cpus = 2
    end
    master.vm.provision "shell", inline: <<-SHELL
      export INSTALL_K3S_EXEC="--bind-address=192.168.56.10 \
        --node-external-ip=192.168.56.10"
      
      curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -
      sleep 5
      cp /var/lib/rancher/k3s/server/token /vagrant/
      cp /etc/rancher/k3s/k3s.yaml /vagrant
    SHELL
  end

  config.vm.define "agent" do |agent|
    agent.vm.network "private_network", ip: "192.168.56.20"
    agent.vm.provider "virtualbox" do |v|
      v.memory = 2048
      v.cpus = 2
    end
    agent.vm.provision "shell", inline: <<-SHELL
      mv /vagrant/token ./token
      curl -sfL https://get.k3s.io | K3S_URL="https://192.168.56.10:6443" K3S_TOKEN="$(cat token)" sh -
    SHELL
  end
end
