"""
This script helps set up the Railway PostgreSQL database for Thor Signia.
It creates the necessary tables and migrates data from SQLite if needed.
"""

import os
import sys
import argparse
import logging
import sqlite3
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s]: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def get_database_url():
    """Get the PostgreSQL database URL from environment variables."""
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        logger.error("DATABASE_URL environment variable not set")
        sys.exit(1)
    
    # Convert postgres:// to postgresql:// for SQLAlchemy
    if db_url.startswith('postgres://'):
        db_url = db_url.replace('postgres://', 'postgresql://', 1)
    
    return db_url

def connect_to_postgres(db_url):
    """Connect to the PostgreSQL database."""
    try:
        # Extract connection parameters from the URL
        connection_params = {}
        
        # Parse the connection string
        if db_url.startswith('postgresql://'):
            # Remove the protocol part
            db_url = db_url.replace('postgresql://', '')
        
        # Split credentials and host information
        if '@' in db_url:
            credentials, host_info = db_url.split('@')
            if ':' in credentials:
                connection_params['user'], connection_params['password'] = credentials.split(':')
            else:
                connection_params['user'] = credentials
            
            # Parse host and database
            if '/' in host_info:
                host_port, database = host_info.split('/')
                connection_params['database'] = database
                
                if ':' in host_port:
                    connection_params['host'], connection_params['port'] = host_port.split(':')
                else:
                    connection_params['host'] = host_port
            else:
                connection_params['host'] = host_info
        
        # Connect to the database
        connection = psycopg2.connect(**connection_params)
        connection.autocommit = True
        
        logger.info(f"Successfully connected to PostgreSQL database at {connection_params.get('host')}")
        return connection
    
    except Exception as e:
        logger.error(f"Failed to connect to PostgreSQL database: {e}")
        sys.exit(1)

def create_contacts_table(conn):
    """Create the contacts table in PostgreSQL."""
    try:
        with conn.cursor() as cursor:
            # Check if the table already exists
            cursor.execute("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'contact'
                );
            """)
            table_exists = cursor.fetchone()[0]
            
            if table_exists:
                logger.info("Contacts table already exists in PostgreSQL")
            else:
                # Create the contacts table
                cursor.execute("""
                    CREATE TABLE contact (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        email VARCHAR(120) NOT NULL,
                        phone VARCHAR(20),
                        company VARCHAR(100) NOT NULL,
                        message TEXT NOT NULL,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                """)
                logger.info("Successfully created contacts table in PostgreSQL")
            
            return True
    
    except Exception as e:
        logger.error(f"Failed to create contacts table: {e}")
        return False

def migrate_data_from_sqlite(pg_conn):
    """Migrate data from SQLite to PostgreSQL."""
    sqlite_db_path = os.path.join('app', 'contacts.db')
    
    if not os.path.exists(sqlite_db_path):
        logger.info("No SQLite database found, skipping migration")
        return True
    
    try:
        # Connect to SQLite database
        sqlite_conn = sqlite3.connect(sqlite_db_path)
        sqlite_conn.row_factory = sqlite3.Row
        
        # Get data from SQLite
        sqlite_cursor = sqlite_conn.cursor()
        sqlite_cursor.execute("SELECT name, email, phone, company, message, created_at FROM contact")
        contacts = sqlite_cursor.fetchall()
        
        if not contacts:
            logger.info("No data to migrate from SQLite")
            sqlite_conn.close()
            return True
        
        # Insert data into PostgreSQL
        with pg_conn.cursor() as pg_cursor:
            for contact in contacts:
                pg_cursor.execute(
                    """
                    INSERT INTO contact (name, email, phone, company, message, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                    """,
                    (
                        contact['name'],
                        contact['email'],
                        contact['phone'],
                        contact['company'],
                        contact['message'],
                        contact['created_at'] or None
                    )
                )
        
        logger.info(f"Successfully migrated {len(contacts)} contacts from SQLite to PostgreSQL")
        sqlite_conn.close()
        return True
    
    except Exception as e:
        logger.error(f"Failed to migrate data from SQLite: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Set up Railway PostgreSQL database for Thor Signia')
    parser.add_argument('--database-url', help='PostgreSQL database URL')
    parser.add_argument('--migrate', action='store_true', help='Migrate data from SQLite to PostgreSQL')
    
    args = parser.parse_args()
    
    # Get database URL from arguments or environment
    db_url = args.database_url or get_database_url()
    
    # Connect to PostgreSQL
    conn = connect_to_postgres(db_url)
    
    # Create tables
    if create_contacts_table(conn):
        logger.info("Database setup completed successfully")
    
    # Migrate data if requested
    if args.migrate:
        if migrate_data_from_sqlite(conn):
            logger.info("Data migration completed successfully")
    
    # Close connection
    conn.close()
    logger.info("Database connection closed")

if __name__ == "__main__":
    main() 