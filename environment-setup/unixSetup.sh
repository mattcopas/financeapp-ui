# This will work on Git Bash if running on Windows
minikube start --memory 2048 --iso-url="https://storage.googleapis.com/minikube/minikube-0.5.iso"
dockerRegistry="cloud.canister.io:5000"
export pg_host=$(minikube ip)

# Get credentials for canister cloud
echo "Please enter your canister.io username:"
read username
echo "Please enter your canister.io password:"
read -s password
echo "Please enter your canister.io email:"
read  email

# Create secret for pulling images from canister cloud
kubectl create secret docker-registry regsecret --docker-server=$dockerRegistry --docker-username=$username --docker-password=$password --docker-email=$email

# Deploy postgres
kubectl apply -f kubernetes/postgres/deployment.yaml
kubectl apply -f kubernetes/postgres/service.yaml

# Deploy data service
envsubst < kubernetes/financeapp-data-service/deployment.yaml | kubectl apply -f -
kubectl apply -f kubernetes/financeapp-data-service/service.yaml
