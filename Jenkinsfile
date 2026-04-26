node {
    def appDir = '/var/www/notes-app'

    stage('Clean Workspace'){
        echo '🧹 Cleaning Jenkins Workspace'
        deleteDir()
    }

    stage('Clone Repo'){
        echo '📥 Cloning notes-app repo cleanly'
        git branch: 'main',
            url: 'https://github.com/Mwahidcodes/notes-app.git'
    }

    stage('Deploy Backend & Frontend'){
        echo '🚀 Deploying full notes-app to EC2'

        sh """
            echo "📁 Ensuring app directory exists..."
            mkdir -p ${appDir}

            echo "🔄 Syncing project using rsync..."
            rsync -av --delete --exclude='node_modules' --exclude='.git' . ${appDir}
            echo "📂 Checking deployed frontend..."
            ls -la ${appDir}/frontend

            echo "📂 Checking package.json..."
            cat ${appDir}/frontend/package.json || echo "❌ package.json missing"

            cd ${appDir}

            echo "📂 DEBUG: Checking deployed files"
            ls -la frontend
            ls -la backend

            echo "📦 Installing backend dependencies..."
            cd backend
            npm install

            echo "⚙️ Setting up backend env..."
            echo "MONGO_URI=mongodb://localhost:27017/notesapp" > .env
            echo "PORT=5000" >> .env

            echo "📦 Installing frontend dependencies..."
            cd ../frontend
            npm install

            echo "🏗️ Building frontend..."
            npm run build

            echo "🛑 Restarting backend with PM2..."
            cd ../backend
            pm2 delete notes-backend || true
            pm2 start server.js --name notes-backend

            echo "🛑 Restarting frontend with PM2..."
            cd ../frontend
            pm2 delete notes-frontend || true
            pm2 start npm --name notes-frontend -- start

            pm2 save

            echo "🎉 Notes App deployed successfully!"
        """
    }
}