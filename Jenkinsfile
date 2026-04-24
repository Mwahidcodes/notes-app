pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/YOUR_USERNAME/notes-app.git'
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend Install & Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd backend
                    echo "MONGO_URI=mongodb://localhost:27017/notesapp" > .env
                    echo "PORT=5000" >> .env
                    pm2 delete notes-backend || true
                    pm2 start server.js --name notes-backend

                    cd ../frontend
                    pm2 delete notes-frontend || true
                    pm2 serve build 3000 --name notes-frontend --spa
                    pm2 save
                '''
            }
        }
    }
}
