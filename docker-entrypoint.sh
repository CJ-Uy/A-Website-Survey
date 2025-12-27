#!/bin/sh
set -e

echo "Starting A Website Survey..."

# Wait for database to be ready (simple retry loop)
echo "Waiting for database connection..."
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if node -e "
        const postgres = require('postgres');
        const sql = postgres(process.env.DATABASE_URL);
        sql\`SELECT 1\`.then(() => {
            console.log('Database connected!');
            sql.end();
            process.exit(0);
        }).catch(() => process.exit(1));
    " 2>/dev/null; then
        break
    fi

    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Waiting for database... attempt $RETRY_COUNT/$MAX_RETRIES"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "Warning: Could not verify database connection, proceeding anyway..."
fi

# Run database migrations/push
echo "Running database migrations..."
npx drizzle-kit push --force 2>/dev/null || {
    echo "Migration push failed or not needed, trying to continue..."
}

echo "Database setup complete!"

# Execute the main command
exec "$@"
