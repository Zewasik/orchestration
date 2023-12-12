#!/bin/bash

KUBECONFIG="./k3s/k3s.yaml"

if [[ $# -ne 1 ]]; then
    echo To use this program ./orchestrator.sh [OPTION]
    echo
    echo Option list:
    echo " - create | creates required folders and two nodes, populates k3s folder with config" 
    echo " - start  | start cluster using manifests folder" 
    echo " - info   | get info about everything in cluster" 
    echo " - stop   | remove cluster and two nodes" 
    exit 1
fi

case $1 in 
    "create")
        mkdir -p ./k3s
        vagrant up
        ;;
    "start")
        KUBECONFIG=${KUBECONFIG} kubectl apply -f ./manifests/
        ;;
    "info")
        KUBECONFIG=${KUBECONFIG} kubectl get all
        ;;
    "stop")
        vagrant destroy -f 
        ;;
    *)
        exit 1
        ;;
esac