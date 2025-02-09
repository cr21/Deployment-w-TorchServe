FROM pytorch/torchserve:0.12.0-gpu

# Install specific versions of dependencies
RUN pip install --no-cache-dir \
    torch==2.1.0 \
    torchvision==0.16.0 \
    diffusers==0.25.0 \
    transformers==4.36.0 \
    accelerate==0.25.0

# Set environment variables
ENV TS_CONFIG_FILE=/home/model-server/config.properties
