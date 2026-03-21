#!/bin/sh
set -e

echo "Starting A Website Survey..."

# Run database migrations/push
echo "Running database migrations..."
npx drizzle-kit push --force 2>/dev/null || {
    echo "Migration push failed or not needed, trying to continue..."
}

echo "Database setup complete!"

# Execute the main command
exec "$@"
