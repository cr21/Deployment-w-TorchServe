# Deployment-w-TorchServe
Deploy Pytorch  Model on Torch Serve

## Prerequisites
- Pytorch Model
- TorchServe
- Docker

## Steps

```bash
torch-model-archiver --model-name sd3 --version 1.0 --handler sd3_handler.py --extra-files sd3-model.zip -r requirements.txt --archive-format zip-store

mkdir models
mv sd3.mar models/
```

```bash
torchserve --start --model-store models --models sd3=sd3.mar
```

```bash
docker run --rm --shm-size=1g         --ulimit memlock=-1         --ulimit stack=67108864         -p8080:8080         -p8081:8081         -p8082:8082         -p7070:7070         -p7071:7071 --gpus all -v /home/ubuntu/Deployment-w-TorchServe/config.properties:/home/model-server/config.properties         --mount type=bind,source=/home/ubuntu/Deployment-w-TorchServe/models,target=/tmp/models pytorch/torchserve:0.12.0-gpu torchserve --model-store=/tmp/models
```