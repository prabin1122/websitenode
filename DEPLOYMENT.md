# Deployment Guide

## Docker Compose deployment

1. Build images:
   - `docker-compose build`
2. Start services:
   - `docker-compose up -d`
3. Verify health check:
   - `curl http://localhost:4000/api/health`

## Kubernetes deployment

1. Create namespace:
   - `kubectl apply -f infra/k8s/namespace.yaml`
2. Apply secrets, PVC, services, and deployments:
   - `kubectl apply -f infra/k8s/secrets.yaml`
   - `kubectl apply -f infra/k8s/pvc.yaml`
   - `kubectl apply -f infra/k8s/postgres.yaml`
   - `kubectl apply -f infra/k8s/redis.yaml`
   - `kubectl apply -f infra/k8s/backend.yaml`
   - `kubectl apply -f infra/k8s/frontend.yaml`
   - `kubectl apply -f infra/k8s/nginx.yaml`

## AWS-ready architecture

- Use RDS for PostgreSQL and ElastiCache Redis.
- Store static assets and product images in S3.
- Use CloudFront for CDN distribution.
- Deploy backend on ECS/EKS or EC2 with autoscaling.
- Use AWS Secrets Manager for credentials.

## Production checklist

- Replace all placeholder secrets.
- Enable HTTPS with TLS on Nginx or cloud load balancer.
- Configure database backups and monitoring.
- Set `NODE_ENV=production`.
- Enable health probes and readiness checks.
