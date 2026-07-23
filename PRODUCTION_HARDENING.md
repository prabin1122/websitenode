# Production Hardening Checklist

## Security

- Use strong secrets for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.
- Move secrets into environment management or secret manager.
- Enforce HTTPS and HSTS at the edge.
- Sanitize inputs with validation libraries.
- Use `helmet` and CORS allowlists.
- Audit logs for user and admin actions.

## Database

- Run Prisma migrations in CI/CD.
- Index frequently filtered columns.
- Enable PostgreSQL connection pooling.
- Use database roles and least privilege.

## Infrastructure

- Deploy with auto-scaling and health checks.
- Use Redis for session caching and rate limiting.
- Serve static assets from CDN.
- Run app behind Nginx or cloud load balancer.

## Monitoring

- Enable structured logs with Winston.
- Export metrics to Prometheus.
- Set up Grafana dashboards and alerts.
- Configure uptime checks.

## Testing

- Add unit, integration, and end-to-end tests.
- Maintain coverage above 90% for critical modules.
- Run security scans in CI.
