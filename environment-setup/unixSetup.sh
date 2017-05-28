# This will work on Git Bash if running on Windows. If you have hyperv disabled,
# remove the --vm-driver=hyperv flag.
# If using hyperv, this script must be run as admin
minikube start --vm-driver hyperv --memory 2048
export pg_host=$(minikube ip)

# Deploy postgres
kubectl apply -f kubernetes/postgres/deployment.yaml
kubectl apply -f kubernetes/postgres/service.yaml

# Deploy data service
envsubst < kubernetes/financeapp-data-service/deployment.yaml | kubectl apply -f -
kubectl apply -f kubernetes/financeapp-data-service/service.yaml
